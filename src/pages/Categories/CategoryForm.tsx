import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCrud } from "../../hooks/useCrud";

interface Props {
  initial: any;
  onClose: () => void;
}

const schema = z.object({
  name: z.string().min(2),
});

type FormData = z.infer<typeof schema>;

export default function CategoryForm({ initial, onClose }: Props) {
  const isEdit = Boolean(initial.id);
  const { create, update } = useCrud<any>("/categories");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    reset(initial);
  }, [initial, reset]);

  const onSubmit = async (data: FormData) => {
    if (isEdit) {
      await update(initial.id, data);
    } else {
      await create(data);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4 rounded-xl bg-zinc-900 p-6"
        >
          <h2 className="text-lg font-semibold">
            {isEdit ? "Editar Categoria" : "Nova Categoria"}
          </h2>

          <div>
            <label className="text-sm">Nome</label>
            <input
              {...register("name")}
              className="mt-1 w-full rounded-md bg-zinc-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary-600 px-4 py-2 hover:bg-primary-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}