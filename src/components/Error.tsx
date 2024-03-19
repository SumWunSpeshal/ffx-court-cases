import { PropsWithChildren } from "react";

export function Error({ children }: PropsWithChildren) {
  return <div className="text-red-500">{children}</div>;
}
