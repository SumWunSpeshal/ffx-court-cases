import { useState } from "react";
import { Error } from "../Error";
import { GenericForm } from "./GenericForm";

const INPUT_NAME = "startDate";
export type DateISOString = string;
export type StartDateFormPayload = Record<typeof INPUT_NAME, DateISOString>;

export function StartDateForm({
  onSubmit,
  value,
}: {
  onSubmit: (data: StartDateFormPayload) => void;
  value?: DateISOString;
}) {
  const [error, setError] = useState("");

  return (
    <GenericForm<StartDateFormPayload>
      onSubmit={({ startDate }) => {
        if (!startDate) {
          return setError("`Start Date` must not be empty");
        }

        setError("");
        onSubmit({
          startDate: new Date(startDate).toISOString(),
        });
      }}
      buttonText="Next"
    >
      <label>
        <span>Start Date</span>
        <br />
        <input
          type="date"
          name={INPUT_NAME}
          defaultValue={value?.split("T")?.[0]}
        />
      </label>
      {error && <Error>{error}</Error>}
    </GenericForm>
  );
}
