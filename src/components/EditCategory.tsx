import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api/api";
import { toast } from "react-toastify";

// Schema Zod
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "O nome da categoria é obrigatório.")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .trim(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  // Buscar categoria
  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        const response = await api.get(`/api/v1/categories/${categoryId}`);
        const category = response.data;
        setValue("name", category.name);
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        alert("Não foi possível carregar a categoria.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    if (!categoryId) return;

    try {
      await api.put(`/api/v1/categories/${categoryId}`, data);
      toast.success("Categoria atualizada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      toast.error("Não foi possível atualizar a categoria.");
    }
  };

  if (loading) return <p className="text-white p-7">Carregando...</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center p-7">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Edição de categoria
        </h1>

        <section className="w-full max-w-4xl bg-gray-900 p-6 rounded-2xl shadow-lg">
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
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="submit"
                className="bg-purple-900 hover:bg-purple-800 transition-colors text-white rounded-lg px-6 py-2 w-full sm:w-auto"
              >
                Salvar
              </button>
              <button
                type="button"
                className="bg-purple-200 hover:bg-purple-300 transition-colors text-black rounded-lg px-6 py-2 w-full sm:w-auto"
                onClick={() => navigate("/addCategory")}
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

export default EditCategory;
