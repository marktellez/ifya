import NextLink from "next/link";
export default function Link({ children, target, ...rest }) {
  return (
    <NextLink {...rest}>
      <a {...{ target }} className="underline hover:text-blue-600">
        {children}
      </a>
    </NextLink>
  );
}
