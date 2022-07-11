export default function Button({ children, disabled = false, ...rest }) {
  const defaultClassNames = "bg-blue-500 hover:bg-blue-600 cursor-pointer";
  const disabledClassNames = "bg-blue-200 cursor-not-allowed";
  return (
    <button
      className={`px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white  transition ease-in-out duration-150 ${
        disabled ? disabledClassNames : defaultClassNames
      }`}
      {...rest}>
      {children}
    </button>
  );
}
