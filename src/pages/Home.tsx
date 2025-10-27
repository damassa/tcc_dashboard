import React, { useEffect, useState } from "react";
import type { SerieResponse } from "../types/serie";
import { CategoryResponse } from "../types/category";
import { getAllSeries, deleteSerie } from "../api/SerieService";
import Navbar from "../components/Navbar";
import DeleteSerieModal from "../components/DeleteSerieModal";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../api/CategoryService";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

const Home: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [serieDelete, setSerieDelete] = useState<SerieResponse | null>(null);
  const [categoryDelete, setCategoryDelete] = useState<CategoryResponse | null>(
    null
  );
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

  const handleSerieDeleteConfirmed = async (id: number) => {
    try {
      await deleteSerie(id);
      setSeries((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao excluir série", error);
    } finally {
      setSerieDelete(null);
    }
  };

  const handleCategoryDeleteConfirmed = async (id: number) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Erro ao excluir categoria", error);
    } finally {
      setCategoryDelete(null);
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
    return (
      <div className="px-4 py-8 text-white">
        <h1 className="text-2xl font-bold mb-6 text-purple-500">
          Séries Cadastradas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 p-4 animate-pulse"
            >
              <div className="w-full h-40 bg-zinc-800 rounded-lg mb-4"></div>
              <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
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
                  className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 hover:shadow-purple-500/20 transition duration-300 flex flex-col"
                >
                  <img
                    src={serie.image}
                    alt={serie.name}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold truncate">
                      {serie.name}
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">{serie.year}</p>

                    {/* Botões no canto direito */}
                    <div className="mt-auto flex justify-end gap-2">
                      <Link
                        to={`/editSerie/${serie.id}`}
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

            {loading && series.length > 0 && (
              <div className="flex justify-center items-center py-6">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

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
              <div
                key={category.id}
                className="bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 hover:shadow-purple-500/20 transition duration-300 flex flex-col"
              >
                <div className="p-4 flex-grow">
                  <h2 className="text-lg font-semibold truncate">
                    {category.name}
                  </h2>
                </div>

                {/* Botões no canto direito */}
                <div className="p-4 flex justify-end gap-2">
                  <Link
                    to={`/editCategory/${category.id}`}
                    className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </Link>

                  <button
                    onClick={() => setCategoryDelete(category)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DeleteSerieModal
        serie={serieDelete}
        onConfirm={(id) => handleSerieDeleteConfirmed(id)}
        onCancel={() => setSerieDelete(null)}
      />
      <DeleteCategoryModal
        category={categoryDelete}
        onConfirm={(id) => handleCategoryDeleteConfirmed(id)}
        onCancel={() => setCategoryDelete(null)}
      />
    </>
  );
};

export default Home;
