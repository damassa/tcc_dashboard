import React from "react";
import { CategoryResponse } from "../types/category";

type Props = {
  category: CategoryResponse | null;
  onConfirm: (id: number) => void;
  onCancel: () => void;
};
const DeleteCategoryModal: React.FC<Props> = ({
  category,
  onConfirm,
  onCancel,
}) => {
  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-6 max-w-md w-full text-white">
        <h2 className="text-xl font-semibold mb-4 text-red-400">
          Confirmar exclusão
        </h2>
        <p className="mb-6">
          Tem certeza que deseja excluir a categoria{" "}
          <span className="text-red-300 font-bold">{category.name}</span>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(category.id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
