# BillForge

A responsive invoice management application built with React and Vite. The app allows users to create, edit, filter, and manage invoices with persistent state, form validation, and a theme system.

---

## 🚀 Links

[View Live](https://billsforge.netlify.app/) | [Repository](https://github.com/KingsleyUdegbunam/HNG-1b-profile-card)

---

## ✨ Features

- Create, edit, and delete invoices
- Mark invoices as Paid, Pending, Draft, or Overdue
- Filter invoices by status (multi-select)
- View detailed invoice pages
- Responsive layout (mobile → tablet → desktop)
- Slide-in form overlays on tablet and desktop
- Form validation with inline error feedback
- Theme toggle (light/dark) with localStorage persistence
- Dynamic invoice dates (relative to current date)
- Empty state UI for no or filtered invoices

---

## 🛠️ Tech Stack

- React 18
- Vite
- React Router v6
- React Icons
- CSS (custom properties for theming)

---

## 📁 Project Structure

```bash
src/
├── assets/
├── components/
│   ├── navigation/
│   └── ui/
├── pages/
├── hooks/
├── utils/
├── data/
├── App.jsx
├── Header.jsx
└── main.jsx

````

## ⚙️ Setup Instructions

```bash
git clone https://github.com/KingsleyUdegbunam/billforge.git
cd billforge
npm install
npm run dev
```

## 🧠 Architecture

### Routing

React Router v6 is used to manage application routes:

- `/` → Invoice list  
- `/invoice/:id` → Invoice details  
- `/invoice/:id/edit` → Edit invoice  
- `/invoice/create` → Create invoice  

---

### State Management

- Global invoice state is managed in `App.jsx`  
- State is passed down via props to pages and components  
- A custom hook (`useInvoiceForm`) encapsulates form state, validation, and item logic  

---

### Overlay System

On tablet and desktop (≥768px), create and edit forms render as a fixed slide-in panel instead of navigating away:

- Uses `position: fixed` to avoid layout issues  
- Backdrop handles dismissal  
- Sticky footer keeps actions visible  
- On mobile, forms use standard route navigation  

---

### Theme System

- Theme is stored as `"light"` or `"dark"` in React state  
- Applied via a `data-theme` attribute on the `<html>` element  
- CSS variables define all colors  
- Persisted using `localStorage`  

---

### Data Persistence

- Invoice data is stored in `localStorage`  
- State initializes from storage on load  
- Updates automatically sync to storage  

---

## ⚖️ Trade-offs

### No External State Management

The app uses React state instead of Redux or Zustand:

- Simpler implementation  
- Easier to understand for small applications  
- Can become harder to scale in larger projects  

---

### CSS Custom Properties vs Frameworks

CSS variables were used instead of a utility framework like Tailwind:

- Full control over theming  
- Clean design token system  
- Slower initial styling compared to utility-first frameworks  

---

### Overlay vs Navigation

Overlay is used for tablet and desktop instead of full page navigation:

- Maintains user context  
- Improves editing workflow  
- Adds complexity to layout and positioning  

---

## ♿ Accessibility

- Keyboard navigable interface  
- Inline validation feedback for form errors  
- Confirmation required for destructive actions (delete)  
- Status uses both text and color for clarity  
- Theme preference persists across sessions  

---

## 🚧 Improvements Beyond Requirements

- Added an Overdue status beyond the default states  
- Implemented multi-select filtering for better control  
- Automatic item total calculation to prevent user error  
- Persistent theme system using `localStorage`  
- Reusable form logic via custom hook (`useInvoiceForm`)  