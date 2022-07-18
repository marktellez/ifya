import { useRef, useEffect } from "react";
export default function TextField({
  value,
  className,
  focused = false,
  onChange = () => {},
  ...rest
}) {
  const ref = useRef(undefined);

  useEffect(() => {
    if (!focused) return;
    ref.current.focus();
  }, [focused]);

  return (
    <>
      <input
        className={`w-full font-thin ${
          className ? className : "border border-gray-300 py-2 px-4"
        }`}
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </>
  );
}
