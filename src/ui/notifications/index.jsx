import { useState, useEffect } from "react";

export default function Notification({ children, onHide = () => {} }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      onHide();
    }, 2000);
  }, []);
  return (
    <div
      className={`absolute z-40 top-6 right-0  text-white  bg-blue-500 py-3 px-5 transition duration-[1s] ${
        show ? "opacity-90" : "opacity-0"
      }`}>
      {children}
    </div>
  );
}
