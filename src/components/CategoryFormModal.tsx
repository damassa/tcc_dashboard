import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createCategory, updateCategory } from "../api/CategoryService";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void; // para avisar ao pai que atualizou a lista
  categoryToEdit?: { id: number; name: string } | null;
};

const schema = z.object({
  name: z.string().min(2, "Nome da categoria obrigatório"),
});

type CategoryFormData = z.infer<typeof schema>;

const CategoryFormModal: React.FC<Props> = ({
  visible,
  onClose,
  onSuccess,
  categoryToEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (!visible) return;
    reset({ name: categoryToEdit?.name ?? "" });
  }, [visible, categoryToEdit, reset]);

  const handleForm = async (data: CategoryFormData) => {
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, data);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await createCategory(data);
        toast.success("Categoria criada com sucesso!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar categoria");
      console.error(error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 text-white rounded-xl border border-zinc-700 shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-purple-400 mb-4">
          {categoryToEdit ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Nome da categoria"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded"
            >
              {categoryToEdit ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
