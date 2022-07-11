import Button from "./";

export default function BuyButton({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>;
}
