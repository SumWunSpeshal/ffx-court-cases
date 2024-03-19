import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../components/Button";
import { Dialog } from "../components/Dialog";
import { DateISOString } from "../components/forms/StartDateForm";
import { usePersistedState } from "../hooks/persisted-state";
import { nastyDownload } from "../utils/nasty-download-hack";
import { Case } from "./index.lazy";

export const Route = createLazyFileRoute("/cases")({
  component: Index,
});

function formatGermanDate(isoString: DateISOString) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(isoString));
}

function thisIsGonnaBeTalkedAbout(content: string) {
  return content
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((keyValuePair) => keyValuePair.trim())
        .map((keyValuePair: string) =>
          keyValuePair
            .split(":")
            .map((kv) => kv.trim())
            .map((kv) => kv.replaceAll("'", ""))
            .map((kv) => {
              const regex = new RegExp(/\d{2}\.\d{2}\.\d{4}/);
              const matchArr = regex.exec(kv);
              if (matchArr) {
                const [d, m, y] = matchArr[0].split(".");
                return new Date(`${y}-${m}-${d}`).toISOString();
              }
              return kv;
            })
            .map((kv) => (kv === "true" ? true : kv === "false" ? false : kv))
        )
    )
    .map((item) => Object.fromEntries(item));
}

function Index() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cases, setCases] = usePersistedState<Case[]>([], "cases");

  function download() {
    const text = cases
      .map(
        ({ customerName, startDate, isFinished }) =>
          `customerName:'${customerName}', startDate: '${formatGermanDate(startDate)}', isFinished: ${isFinished ? "true" : "false"}`
      )
      .join("\n");

    nastyDownload(Date.now() + "_export.txt", text);
  }

  return (
    <div className="p-2">
      <h3>All cases!</h3>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <label>
          <span>Upload file</span>
          <br />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => {
              const file = e.target.files?.[0];
              const reader = new FileReader();

              reader.onload = function (event) {
                const content = event.target?.result as string;
                setCases(() => thisIsGonnaBeTalkedAbout(content));
                setDialogOpen(false);
              };

              if (file) {
                reader.readAsText(file);
              }
            }}
          />
        </label>
      </Dialog>

      <table className="mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4">Customer Name</th>
            <th className="py-2 px-4">Start Date</th>
            <th className="py-2 px-4">isFinished</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(({ customerName, startDate, isFinished }, i) => {
            return (
              <tr key={customerName + startDate + isFinished + i}>
                <td className="py-2 px-4">{customerName}</td>
                <td className="py-2 px-4">{formatGermanDate(startDate)}</td>
                <td className="py-2 px-4">{isFinished ? "true" : "false"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-2">
        <Button type="button" onClick={() => setCases([])}>
          Delete all
        </Button>
        <Button type="button" onClick={download}>
          Export
        </Button>
        <Button type="button" onClick={() => setDialogOpen(true)}>
          Import
        </Button>
      </div>
    </div>
  );
}
