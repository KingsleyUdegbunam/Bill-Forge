import { useState } from "react";

export const EMPTY_ITEM = { name: "", qty: 1, price: 0, total: 0 };

export const EMPTY_FORM = {
  billFrom: { streetAddress: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  billTo: { streetAddress: "", city: "", postCode: "", country: "" },
  invoiceDate: "",
  paymentTerms: "",
  projectDescription: "",
  items: [{ ...EMPTY_ITEM }],
};

/* Seed form state from an existing invoice object */
export function seedFromInvoice(invoice) {
  if (!invoice) return EMPTY_FORM;
  return {
    billFrom: {
      streetAddress: invoice.billFrom?.streetAddress ?? "",
      city: invoice.billFrom?.city ?? "",
      postCode: invoice.billFrom?.postCode ?? "",
      country: invoice.billFrom?.country ?? "",
    },
    clientName: invoice.clientName ?? "",
    clientEmail: invoice.clientEmail ?? "",
    billTo: {
      streetAddress: invoice.streetAddress ?? "",
      city: invoice.city ?? "",
      postCode: invoice.postCode ?? "",
      country: invoice.country ?? "",
    },
    invoiceDate: invoice.invoiceDate ?? "",
    paymentTerms: invoice.paymentTerms ?? "",
    projectDescription: invoice.projectDescription ?? "",
    items: invoice.items?.length
      ? invoice.items.map((i) => ({ ...EMPTY_ITEM, ...i }))
      : [{ ...EMPTY_ITEM }],
  };
}

/* ── Validation ──────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};

  // Bill From
  if (!form.billFrom.streetAddress.trim())
    errors["billFrom.streetAddress"] = "Required";
  if (!form.billFrom.city.trim()) errors["billFrom.city"] = "Required";
  if (!form.billFrom.postCode.trim()) errors["billFrom.postCode"] = "Required";
  if (!form.billFrom.country.trim()) errors["billFrom.country"] = "Required";

  // Bill To
  if (!form.clientName.trim()) {
    errors["clientName"] = "Required";
  }

  if (!form.clientEmail.trim()) {
    errors["clientEmail"] = "Required";
  } else if (!EMAIL_RE.test(form.clientEmail.trim())) {
    errors["clientEmail"] = "Must be a valid email";
  }

  if (!form.billTo.streetAddress.trim())
    errors["billTo.streetAddress"] = "Required";
  if (!form.billTo.city.trim()) errors["billTo.city"] = "Required";
  if (!form.billTo.postCode.trim()) errors["billTo.postCode"] = "Required";
  if (!form.billTo.country.trim()) errors["billTo.country"] = "Required";

  // Invoice info
  if (!form.invoiceDate) errors["invoiceDate"] = "Required";
  if (!form.paymentTerms.trim()) errors["paymentTerms"] = "Required";
  if (!form.projectDescription.trim())
    errors["projectDescription"] = "Required";

  // Items
  if (form.items.length === 0) {
    errors["items"] = "Add at least one item";
  } else {
    form.items.forEach((item, i) => {
      if (!item.name.trim()) errors[`items[${i}].name`] = "Required";
      if (!item.qty || item.qty < 1) errors[`items[${i}].qty`] = "Min 1";
      if (item.price < 0) errors[`items[${i}].price`] = "Invalid";
    });
  }

  return errors;
}

/* ── Hook ────────────────────────────────────────────────── */
export function useInvoiceForm(initialValues = EMPTY_FORM) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* dot-path setter: "billFrom.city", "items.0.qty" */
  const setField = (path, value) => {
    setForm((prev) => {
      const next = { ...prev };
      const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");

      let node = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        node[key] = Array.isArray(node[key])
          ? [...node[key]]
          : { ...node[key] };
        node = node[key];
      }
      node[parts[parts.length - 1]] = value;
      return next;
    });

    // Auto-recalculate item total when qty or price changes
    const itemMatch = path.match(/^items\.(\d+)\.(qty|price)$/);
    if (itemMatch) {
      const idx = Number(itemMatch[1]);
      setForm((prev) => {
        const items = prev.items.map((item, i) => {
          if (i !== idx) return item;
          const qty = itemMatch[2] === "qty" ? Number(value) : Number(item.qty);
          const price =
            itemMatch[2] === "price" ? Number(value) : Number(item.price);
          return { ...item, total: qty * price };
        });
        return { ...prev, items };
      });
    }

    // Clear error for this field as the user types
    setErrors((prev) => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  };

  const touchField = (path) =>
    setTouched((prev) => ({ ...prev, [path]: true }));

  const addItem = () =>
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...EMPTY_ITEM }] }));

  const removeItem = (index) =>
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));

  /* Run full validation, mark all fields touched, return true if clean */
  const validateForm = () => {
    const errs = validate(form);
    setErrors(errs);
    // Touch every errored field so messages show immediately
    const allTouched = Object.keys(errs).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched((prev) => ({ ...prev, ...allTouched }));
    return Object.keys(errs).length === 0;
  };

  /* Only show error after the field has been touched */
  const fieldError = (path) => (touched[path] ? errors[path] : undefined);

  return {
    form,
    setField,
    touchField,
    addItem,
    removeItem,
    validateForm,
    fieldError,
    errors,
  };
}
