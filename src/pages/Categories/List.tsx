import { useCrud } from "../../hooks/useCrud";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

interface Category {
  id: string;
  name: string;
}

export default function CategoryList() {
  const {
    items: categories,
    loading,
    error,
    remove,
  } = useCrud<Category>("/api/v1/categories");
  const [editing, setEditing] = useState<Category | null>(null);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <button
          onClick={() => setEditing({} as Category)}
          className="inline-flex	items-center gap-2 rounded-lg bg-primary-600 px-3 py-2 text-sm hover:bg-primary-500"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </header>

      {loading && <p>Carregando…</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <article key={c.id} className="rounded-xl bg-zinc-900 p-4 space-y-2">
            <h3 className="text-lg font-medium">{c.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(c)}
                className="rounded-md bg-primary-600 p-2 hover:bg-primary-500"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => remove(c.id)}
                className="rounded-md bg-red-600 p-2 hover:bg-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <CategoryForm initial={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
