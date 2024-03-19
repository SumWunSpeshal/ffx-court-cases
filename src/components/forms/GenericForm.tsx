import { PropsWithChildren } from "react";
import { Button } from "../Button";

export function GenericForm<T extends object>({
  children,
  onSubmit,
  buttonText,
}: PropsWithChildren<{ onSubmit: (data: T) => void; buttonText?: string }>) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit(Object.fromEntries(formData) as T);
      }}
    >
      <div className="grid gap-4">
        <div>{children}</div>
        <div className="flex justify-end">
          <Button type="submit">{buttonText || "Submit"}</Button>
        </div>
      </div>
    </form>
  );
}
