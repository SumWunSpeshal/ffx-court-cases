import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import {
  CustomerNameForm,
  CustomerNameFormPayload,
} from "../components/forms/CustomerNameForm";
import {
  FinishedForm,
  FinishedFormPayload,
} from "../components/forms/Finished";
import {
  StartDateForm,
  StartDateFormPayload,
} from "../components/forms/StartDateForm";
import { usePersistedState } from "../hooks/persisted-state";

type Form = Partial<
  CustomerNameFormPayload & StartDateFormPayload & FinishedFormPayload
>;

export type Case = Required<Form>;

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function validate(form: Form): form is Case {
  return Boolean(
    "isFinished" in form &&
      "customerName" in form &&
      form.customerName &&
      "startDate" in form &&
      form.startDate
  );
}

function Index() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = usePersistedState<Form>({}, "currentForm");
  const [, setCases] = usePersistedState<Case[]>([], "cases");

  function customerNameSubmit({ customerName }: CustomerNameFormPayload) {
    setForm((prev) => ({ ...prev, customerName }));
  }

  function startDateSubmit({ startDate }: StartDateFormPayload) {
    setForm((prev) => ({ ...prev, startDate }));
  }

  function isFinishedSubmit({ isFinished }: FinishedFormPayload) {
    setForm((prev) => ({ ...prev, isFinished }));
  }

  useEffect(() => {
    if (validate(form)) {
      setCases((prev) => [...prev, form]);
    }
  }, [form, setCases]);

  return (
    <>
      <div className="p-2">
        <h3>Create a new case!</h3>
      </div>
      <Button onClick={() => setDialogOpen(true)} type="button">
        Add new case
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        {(() => {
          if ("isFinished" in form) {
            return (
              <div className="grid gap-4">
                <div>Success! New case has been added!</div>
                <div className="flex justify-center">
                  <Button type="button" onClick={() => setForm({})}>
                    Add new
                  </Button>
                </div>
              </div>
            );
          }

          if ("startDate" in form) {
            return (
              <FinishedForm
                onSubmit={isFinishedSubmit}
                value={form.isFinished}
              />
            );
          }

          if ("customerName" in form) {
            return (
              <StartDateForm
                onSubmit={startDateSubmit}
                value={form.startDate}
              />
            );
          }

          return (
            <CustomerNameForm
              onSubmit={customerNameSubmit}
              value={form.customerName}
            />
          );
        })()}
      </Dialog>
    </>
  );
}
