import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";

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

const AddSeriePage: React.FC = () => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SerieFormData>({
    resolver: zodResolver(serieSchema),
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        toast.error("Não foi possível carregar as categorias.");
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: SerieFormData) => {
    try {
      await toast.promise(api.post("/api/v1/series", data), {
        pending: "Salvando série...",
        success: "Série adicionada com sucesso!",
        error: "Erro ao adicionar a série.",
      });
      reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Erro ao adicionar a série:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <main className="text-2xl font-bold mb-4 text-white text-center">
          Adicionar uma nova série
        </main>

        <section className="w-full max-w-4xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Nome da série"
                  required
                  disabled={isSubmitting}
                  {...register("name")}
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
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
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  placeholder="Ano"
                  required
                  disabled={isSubmitting}
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
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  placeholder="URL da imagem"
                  required
                  disabled={isSubmitting}
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
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  disabled={isSubmitting}
                  placeholder="URL da imagem"
                  required
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
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  disabled={isSubmitting}
                  placeholder="URL do vídeo"
                  required
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
                  placeholder="Insira a sinopse da série"
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
                disabled={isSubmitting}
                className="bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg px-6 py-2"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
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

export default AddSeriePage;
