export function Dialog({
  children,
  open,
  onClose,
}: React.PropsWithChildren<{ open: boolean; onClose: () => void }>) {
  return (
    <dialog open={open} className="p-8">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0"
      >
        X
      </button>
      {children}
    </dialog>
  );
}
