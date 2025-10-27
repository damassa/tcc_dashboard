import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "../api/api";
import { SerieResponse } from "../types/serie"; // <-- aqui importa tua classe

// Schema de validação com Zod
const episodeSchema = z.object({
  name: z.string().min(1, "O título é obrigatório.").max(200),
  duration: z.string().min(1, "A duração é obrigatória."),
  link: z.string().url("Informe uma URL válida."),
  serieId: z.number().min(1, "Selecione a série."),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

const AddEpisodePage: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EpisodeFormData>({
    resolver: zodResolver(episodeSchema),
  });

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await api.get("/api/v1/series");
        setSeries(response.data);
      } catch (err) {
        console.error("Erro ao carregar séries:", err);
        toast.error("Não foi possível carregar as séries.");
      }
    };
    fetchSeries();
  }, []);

  const onSubmit = async (data: EpisodeFormData) => {
    try {
      await toast.promise(api.post("/api/v1/episodes", data), {
        pending: "Salvando episódio...",
        success: "Episódio adicionado com sucesso!",
        error: "Erro ao adicionar episódio.",
      });

      reset();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Erro ao adicionar episódio:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <main className="text-2xl font-bold mb-4 text-white text-center">
          Adicionar Episódio
        </main>

        <section className="w-full max-w-4xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Série */}
              <div className="md:col-span-2">
                <label
                  htmlFor="serieId"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Série
                </label>
                <select
                  id="serieId"
                  {...register("serieId", { setValueAs: (v) => Number(v) })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                >
                  <option value="">Selecione a série</option>
                  {series.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.serieId && (
                  <p className="text-red-500 text-sm">
                    {errors.serieId.message}
                  </p>
                )}
              </div>

              {/* Título */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Título do Episódio
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("name")}
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  placeholder="Ex: O Início da Jornada"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Duração */}
              <div>
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Duração
                </label>
                <input
                  type="number"
                  id="duration"
                  {...register("duration")}
                  className={`bg-gray-50 border ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  placeholder="Ex: 24min"
                  disabled={isSubmitting}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* URL do Vídeo */}
              <div className="md:col-span-2">
                <label
                  htmlFor="videoUrl"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  URL do Vídeo
                </label>
                <input
                  type="text"
                  id="link"
                  {...register("link")}
                  className={`bg-gray-50 border ${
                    errors.link ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                  placeholder="Ex: https://..."
                  disabled={isSubmitting}
                />
                {errors.link && (
                  <p className="text-red-500 text-sm">{errors.link.message}</p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
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

export default AddEpisodePage;
