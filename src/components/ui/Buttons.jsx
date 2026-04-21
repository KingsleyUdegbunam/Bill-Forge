import "./Buttons.css";

export function Button({
  children,
  variant = "primary",
  as: Component = "button",
  ...props
}) {
  return (
    <Component className={`button button--${variant}`} {...props}>
      {children}
    </Component>
  );
}
