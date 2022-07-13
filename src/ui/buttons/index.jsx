export default function Button({ children, disabled = false, ...rest }) {
  const defaultClassNames = "bg-blue-500 hover:bg-blue-600 cursor-pointer";
  const disabledClassNames = "bg-blue-200 cursor-not-allowed";
  return (
    <button
      className={`px-4 py-3 font-medium leading-6  text-xl shadow rounded-md text-white  transition ease-in-out duration-150 ${
        disabled ? disabledClassNames : defaultClassNames
      }`}
      {...rest}>
      {children}
    </button>
  );
}
