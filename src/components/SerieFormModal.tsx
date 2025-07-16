import React, { useEffect } from "react";
import { SerieResponse, type SeriePayload } from "../types/serie";
import { CategoryResponse } from "../types/category";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: SeriePayload) => void;
  serie?: SerieResponse | null;
  categories: CategoryResponse[];
};

const serieSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  year: z.coerce.number().min(1900, "Ano inválido"),
  image: z.string().url("URL inválida"),
  bigImage: z.string().url("URL inválida"),
  opening_video: z.string().url("URL inválida"),
  plot: z.string().min(5, "Sinopse muito curta"),
  categoryId: z.coerce.number().min(1, "Categoria obrigatória"),
});

type SerieFormData = z.infer<typeof serieSchema>;

const SerieFormModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  serie,
  categories,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SerieFormData>({
    resolver: zodResolver(serieSchema),
    defaultValues: {
      name: "",
      year: new Date().getFullYear(),
      image: "",
      bigImage: "",
      opening_video: "",
      plot: "",
      categoryId: 0,
    },
  });

  // Resetar dados ao abrir o modal
  useEffect(() => {
    if (!visible) return;

    if (serie) {
      const { ...data } = serie;
      reset({ ...data, categoryId: Number(data.categoryId) }); // preenche todos os campos ao editar
    } else {
      reset({
        name: "",
        year: new Date().getFullYear(),
        image: "",
        bigImage: "",
        opening_video: "",
        plot: "",
        categoryId: 0,
      }); // limpa ao criar
    }
  }, [serie, reset, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-2xl border border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-purple-400">
          {serie ? "Editar Série" : "Nova Série"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-1 sm:col-span-2">
            <input
              {...register("name")}
              placeholder="Nome"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <input
            type="number"
            {...register("year", { valueAsNumber: true })}
            placeholder="Ano"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
          {errors.year && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.year.message}
            </p>
          )}

          <input
            {...register("image")}
            placeholder="URL da imagem"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
          {errors.image && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.image.message}
            </p>
          )}

          <input
            {...register("bigImage")}
            placeholder="URL da imagem grande"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
          {errors.bigImage && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.bigImage.message}
            </p>
          )}

          <input
            {...register("opening_video")}
            placeholder="URL da abertura"
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
          {errors.opening_video && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.opening_video.message}
            </p>
          )}

          <select
            {...register("categoryId")}
            className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 col-span-1 sm:col-span-2"
          >
            <option value="">Selecione a categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.categoryId.message}
            </p>
          )}

          <textarea
            {...register("plot")}
            placeholder="Sinopse"
            rows={4}
            className="col-span-1 sm:col-span-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
          {errors.plot && (
            <p className="text-red-400 text-sm col-span-2">
              {errors.plot.message}
            </p>
          )}

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
            >
              {serie ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SerieFormModal;
