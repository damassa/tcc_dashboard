import React, { useEffect, useState } from "react";
import type { SerieResponse } from "../types/serie";
import { CategoryResponse } from "../types/category";
import { getAllSeries, deleteSerie } from "../api/SerieService";
import Navbar from "../components/Navbar";
import DeleteModal from "../components/DeleteModal";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../api/CategoryService";

const Home: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [serieDelete, setSerieDelete] = useState<SerieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const arr = await getAllSeries();
        setSeries(arr);
      } catch (error) {
        console.error("Failed to fetch series", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const arr = await getAllCategories();
        setCategories(arr);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchSeries();
    fetchCategories();
  }, []);

  // const handleSubmit = async (
  //   data: Omit<SerieResponse, "id"> & { categoryName: string }
  // ) => {
  //   try {
  //     const category = categories.find((c) => c.name === data.categoryName);
  //     if (!category) {
  //       toast.error("Categoria não encontrada");
  //       return;
  //     }

  //     const payload = {
  //       name: data.name,
  //       plot: data.plot,
  //       year: data.year,
  //       image: data.image,
  //       bigImage: data.bigImage,
  //       opening_video: data.opening_video,
  //       categoryId: category.id,
  //     };

  //     if (editingSerie) {
  //       await updateSerie(editingSerie.id, payload);
  //       toast.success("Série atualizada com sucesso");
  //     } else {
  //       await createSerie(payload);
  //       toast.success("Série criada com sucesso");
  //     }

  //     const updated = await getAllSeries();
  //     setSeries(updated);
  //   } catch (e) {
  //     toast.error("Erro ao salvar série");
  //     console.error("Erro ao salvar série", e);
  //   } finally {
  //     closeModal();
  //   }
  // };

  // const handleCategorySubmit = async (data: { name: string }) => {
  //   try {
  //     if (editingCategory) {
  //       await updateCategory(editingCategory.id, data);
  //       toast.success("Categoria atualizada com sucesso");
  //     } else {
  //       await createCategory(data);
  //       toast.success("Categoria criada com sucesso");
  //     }
  //     const updated = await getAllCategories();
  //     setCategories(updated);

  //     closeModal();
  //   } catch (error) {
  //     toast.error("Erro ao salvar categoria");
  //     console.error(error);
  //   }
  // };

  const handleDeleteConfirmed = async (id: number) => {
    try {
      await deleteSerie(id);
      setSeries((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao excluir série", error);
    } finally {
      setSerieDelete(null);
    }
  };

  const totalPages = Math.ceil(series.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = series.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return <div className="text-white p-8">Carregando séries...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="px-4 py-8 text-white">
        <h1 className="text-2xl font-bold mb-6 text-purple-500">
          Séries Cadastradas
        </h1>

        {series.length === 0 ? (
          <p className="text-gray-400">Nenhuma série cadastrada.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((serie) => (
                <div
                  key={serie.id}
                  className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 hover:shadow-purple-500/20 transition duration-300"
                >
                  <img
                    src={serie.image}
                    alt={serie.name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">
                      {serie.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">{serie.year}</p>

                    <div className="flex justify-between text-sm">
                      <Link
                        to="/editSerie"
                        className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </Link>

                      <button
                        onClick={() => setSerieDelete(serie)}
                        className="flex items-center gap-1 text-red-400 hover:text-red-300 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 disabled:opacity-40 cursor-pointer"
              >
                Anterior
              </button>
              <span className="px-2 py-2 text-sm text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 disabled:opacity-40 cursor-pointer"
              >
                Próxima
              </button>
            </div>
          </>
        )}

        <h1 className="text-2xl font-bold mb-6 text-purple-500">
          Categorias cadastradas
        </h1>

        {categories.length === 0 ? (
          <p className="text-gray-400">Nenhuma caregoria cadastrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id}>
                <div className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 hover:shadow-purple-500/20 transition duration-300">
                  <div className="p-4">
                    <h2 className="text-lg font-semibold truncate">
                      {category.name}
                    </h2>
                  </div>
                  <div className="flex justify-end">
                    <button>Editar categoria</button>
                    <button>Excluir categoria</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DeleteModal
        serie={serieDelete}
        onConfirm={(id) => handleDeleteConfirmed(id)}
        onCancel={() => setSerieDelete(null)}
      />
    </>
  );
};

export default Home;
