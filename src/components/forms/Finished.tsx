import { GenericForm } from "./GenericForm";

const INPUT_NAME = "isFinished";
export type FinishedFormPayload = Record<typeof INPUT_NAME, boolean>;

export function FinishedForm({
  onSubmit,
  value,
}: {
  onSubmit: (data: FinishedFormPayload) => void;
  value?: boolean;
}) {
  return (
    <GenericForm<FinishedFormPayload>
      onSubmit={({ isFinished }) => onSubmit({ isFinished: !!isFinished })}
      buttonText="Finish"
    >
      <label>
        <span>isFinished</span>
        <br />
        <input type="checkbox" name={INPUT_NAME} defaultChecked={value} />
      </label>
    </GenericForm>
  );
}
