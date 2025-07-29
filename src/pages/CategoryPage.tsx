// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from "react";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/CategoryService";
import { CategoryResponse } from "../types/category";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CategoryFormModal from "../components/CategoryFormModal";
import DeleteModal from "../components/DeleteModal";
import Navbar from "../components/Navbar";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] =
    useState<CategoryResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { name: string }) => {
    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, data);
        toast.success("Categoria atualizada!");
      } else {
        await createCategory(data);
        toast.success("Categoria criada com sucesso!");
      }
      setModalVisible(false);
      setCategoryToEdit(null);
      fetchCategories();
    } catch (err) {
      toast.error("Erro ao salvar categoria");
    }
  };

  const handleDeleteConfirmed = async (id: number) => {
    try {
      await deleteCategory(id);
      toast.success("Categoria excluída");
      fetchCategories();
    } catch {
      toast.error("Erro ao excluir categoria");
    } finally {
      setCategoryToDelete(null);
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentItems = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-400">Categorias</h1>
        </div>

        {loading ? (
          <p>Carregando categorias...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-gray-400">Nenhuma categoria encontrada.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.map((cat) => (
              <div
                key={cat.id}
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between"
              >
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setCategoryToEdit(cat);
                      setModalVisible(true);
                    }}
                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-300">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 disabled:opacity-40"
          >
            Próxima
          </button>
        </div>

        <CategoryFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          initialValue={categoryToEdit?.name ?? null}
        />

        <DeleteModal
          serie={categoryToDelete as any} // reutilizando modal de série
          onConfirm={(id) =>
            handleDeleteConfirmed((categoryToDelete as any).id)
          }
          onCancel={() => setCategoryToDelete(null)}
        />
      </div>
    </>
  );
};

export default CategoryPage;
