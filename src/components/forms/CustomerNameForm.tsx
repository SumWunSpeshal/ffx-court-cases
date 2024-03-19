import { useState } from "react";
import { Error } from "../Error";
import { GenericForm } from "./GenericForm";

const INPUT_NAME = "customerName";
export type CustomerNameFormPayload = Record<typeof INPUT_NAME, string>;

export function CustomerNameForm({
  onSubmit,
  value,
}: {
  onSubmit: (data: CustomerNameFormPayload) => void;
  value?: string;
}) {
  const [error, setError] = useState("");

  return (
    <GenericForm<CustomerNameFormPayload>
      onSubmit={({ customerName }) => {
        if (!customerName) {
          return setError("`Customer Name` must not be empty");
        }

        setError("");
        onSubmit({ customerName });
      }}
      buttonText="Next"
    >
      <label>
        <span>Customer Name</span>
        <br />
        <input type="text" name={INPUT_NAME} defaultValue={value} />
      </label>
      {error && <Error>{error}</Error>}
    </GenericForm>
  );
}
