export default function Button({
  title,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  iconLeft,
  iconRight
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-button ${className}`}
    >
      <div className="button-content">
        {iconLeft && iconLeft}
        {title && (
          <span className="button-buttonText">
            {title}
          </span>
        )}
        {iconRight && iconRight}
      </div>
    </button>
  );
}

// properties that can be added <Button title="" className="" onClick={} disabled={} iconRight={<UserPlus size={18} color="green"/>} iconLeft={<UserPlus size={18} color="green"/>} />