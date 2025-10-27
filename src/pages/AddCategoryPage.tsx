import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "O nome da categoria é obrigatório.")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .trim(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const AddCategoryPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // ← adicionado para resetar o formulário
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await toast.promise(api.post("/api/v1/categories", data), {
        pending: "Salvando categoria...",
        success: "Categoria adicionada com sucesso!",
        error: "Erro ao adicionar a categoria.",
      });

      reset(); // limpa o formulário
      setTimeout(() => navigate("/"), 1500); // redireciona após mostrar o toast
    } catch (err) {
      console.error("Erro ao adicionar a categoria:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <main className="text-2xl font-bold mb-4 text-white text-center">
          Adicionar nova categoria
        </main>

        <section className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`bg-gray-50 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5`}
                placeholder="Nome da categoria"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg px-6 py-2 w-full sm:w-auto disabled:opacity-50"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-purple-200 hover:bg-purple-300 transition-colors text-black rounded-lg px-6 py-2 w-full sm:w-auto"
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

export default AddCategoryPage;
