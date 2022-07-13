import { useState, useEffect, useRef } from "react";
import IntegerField from "../integer-field";

export default function MoneyField({ value, focused = false, ...rest }) {
  const [_focused, setFocused] = useState(focused);
  const ref = useRef(undefined);
  useEffect(() => {
    setFocused(focused);
  }, [focused]);

  useClickOutside(ref, () => setFocused(false));

  return (
    <div
      className="flex items-center gap-4"
      onClick={() => {
        setFocused(true);
      }}>
      <div
        ref={ref}
        className={`flex items-center  border border-gray-300 py-2 px-4`}>
        <span className="mr-2">$</span>

        <IntegerField
          className="outline-none"
          focused={_focused}
          value={value}
          decimals={2}
          {...rest}
        />
      </div>
    </div>
  );
}

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
