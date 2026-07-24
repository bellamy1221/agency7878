import type { AnchorHTMLAttributes, ReactNode } from "react";

type MagneticProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/** Retains the shared CTA API without cursor-following behaviour. */
export function MagneticLink({ children, className, ...rest }: MagneticProps) {
  return (
    <a className={className} {...rest}>
      {children}
    </a>
  );
}
