import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";
import { toast } from "react-toastify";

// Schema Zod
const serieSchema = z.object({
  name: z.string().min(1, "O nome da série é obrigatório.").max(100).trim(),
  year: z.number().min(1900).max(2100).int(),
  image: z.string().min(1).max(1000).trim(),
  bigImage: z.string().min(1).max(1000).trim(),
  opening_video: z.string().min(1).max(1000).trim(),
  plot: z.string().min(1).max(1000).trim(),
  categoryId: z.number().min(1, "A categoria é obrigatória.").int(),
});

type SerieFormData = z.infer<typeof serieSchema>;

interface Category {
  id: number;
  name: string;
}

const EditSerie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const serieId = id ? Number(id) : undefined;

  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SerieFormData>({
    resolver: zodResolver(serieSchema),
  });

  const navigate = useNavigate();

  // Buscar série e categorias
  useEffect(() => {
    const fetchSerie = async () => {
      if (!serieId) return;
      try {
        const response = await api.get(`/api/v1/series/${serieId}`);
        const serie = response.data;
        setValue("name", serie.name);
        setValue("year", serie.year);
        setValue("image", serie.image);
        setValue("bigImage", serie.bigImage);
        setValue("opening_video", serie.opening_video);
        setValue("plot", serie.plot);
        setValue("categoryId", serie.categoryId);
      } catch (error) {
        console.error("Erro ao buscar série:", error);
        toast.error("Não foi possível carregar a série.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Não foi possível carregar as categorias.");
      }
    };

    fetchSerie();
    fetchCategories();
  }, [serieId, setValue]);

  // Submissão do formulário
  const onSubmit = async (data: SerieFormData) => {
    if (!serieId) return;
    try {
      await api.patch(`/api/v1/series/${serieId}`, data);
      setTimeout(() => {
        toast.success("Série atualizada com sucesso!");
        navigate("/"); // Ajuste para a rota que lista as séries
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar série:", error);
      toast.error("Não foi possível atualizar a série.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">
          Edição de série
        </h1>

        <section className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Nome */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Ano */}
              <div>
                <label
                  htmlFor="year"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Ano
                </label>
                <input
                  type="number"
                  id="year"
                  {...register("year", { setValueAs: (v) => Number(v) })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year.message}</p>
                )}
              </div>

              {/* Imagem Card */}
              <div>
                <label
                  htmlFor="imageCard"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Imagem do card
                </label>
                <input
                  type="text"
                  id="imageCard"
                  {...register("image")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Imagem Banner */}
              <div>
                <label
                  htmlFor="imageBanner"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Imagem do banner
                </label>
                <input
                  type="text"
                  id="imageBanner"
                  {...register("bigImage")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
                {errors.bigImage && (
                  <p className="text-red-500 text-sm">
                    {errors.bigImage.message}
                  </p>
                )}
              </div>

              {/* Vídeo de abertura */}
              <div>
                <label
                  htmlFor="openingVideo"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Vídeo de abertura
                </label>
                <input
                  type="text"
                  id="openingVideo"
                  {...register("opening_video")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
                {errors.opening_video && (
                  <p className="text-red-500 text-sm">
                    {errors.opening_video.message}
                  </p>
                )}
              </div>

              {/* Categoria */}
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Categoria
                </label>
                <select
                  id="category"
                  {...register("categoryId", { setValueAs: (v) => Number(v) })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                >
                  <option value="">Selecione a categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Sinopse */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Sinopse
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("plot")}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
                {errors.plot && (
                  <p className="text-red-500 text-sm">{errors.plot.message}</p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                className="bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg px-6 py-2"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => navigate("/addSerie")}
                className="bg-purple-200 hover:bg-purple-300 transition-colors text-black rounded-lg px-6 py-2"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditSerie;
