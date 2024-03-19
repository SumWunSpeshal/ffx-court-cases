import { HTMLProps, PropsWithChildren } from "react";

export function Button(
  props: PropsWithChildren &
    HTMLProps<HTMLButtonElement> & { type: "submit" | "button" }
) {
  const { children, ...rest } = props;
  return (
    <button {...rest} className="border border-white">
      {children}
    </button>
  );
}
