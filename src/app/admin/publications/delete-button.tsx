"use client";

import { deletePublicationAction } from "@/app/admin/actions";

type DeletePublicationButtonProps = {
  id: string;
};

export default function DeletePublicationButton({
  id,
}: DeletePublicationButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "¿Eliminar esta publicación? Esta acción no se puede deshacer.",
    );
    if (!confirmed) return;
    await deletePublicationAction(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-sm text-rose-300 transition hover:text-rose-200"
    >
      Eliminar
    </button>
  );
}
