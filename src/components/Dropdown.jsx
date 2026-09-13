import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  label,
  placeholder = "Select",
  value,
  options = [],
  onSelect,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="dropdown-container">
      {label && (
        <label className="dropdown-label">
          {label}
        </label>
      )}

      <button
        type="button"
        className="dropdown"
        onClick={() => setVisible(!visible)}
      >
        <span className={value ? "dropdown-text" : "placeholder-text"}>
          {value || placeholder}
        </span>

        <ChevronDown
          size={20}
          className={visible ? "dropdown-icon open" : "dropdown-icon"}
        />
      </button>

      {visible && (
        <>
          {/* Overlay */}
          <div
            className="dropdown-overlay"
            onClick={() => setVisible(false)}
          />

          {/* Dropdown menu */}
          <div className="dropdown-menu">
            {options.map((item) => (
              <button
                type="button"
                key={item.value}
                className="dropdown-item"
                onClick={() => {
                  onSelect(item.value);
                  setVisible(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}