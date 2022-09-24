import NextLink from "next/link";

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  target?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  target = "_self",
  ...props
}) => {
  return (
    <NextLink href={href} {...props}>
      <a target={target} className={props.className}>
        {children}
      </a>
    </NextLink>
  );
};
