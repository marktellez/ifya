import Button from "./";

export default function SmallButton({ children, ...rest }) {
  return (
    <Button
      className="cursor-pointer w-full font-thin  border px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md drop-shadow-sm"
      {...rest}>
      {children}
    </Button>
  );
}
