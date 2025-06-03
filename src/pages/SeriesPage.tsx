import { useEffect, useState } from "react";
import { getSeries } from "../services/seriesService";
import { Pagination } from "../components/Pagination";
import SeriesCard from "../components/SeriesCard";
import { api } from "../api";

export default function SeriesPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingSerie, setEditingSerie] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    plot: "",
    image: "",
    bigImage: "",
    openingVideo: "",
    year: 0,
  });
  const limit = 6;

  useEffect(() => {
    fetchSeries();
  }, [currentPage]);

  const fetchSeries = async () => {
    try {
      const { data, total } = await getSeries(currentPage, limit);
      console.log(data);
      setSeries(data);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
    }
  };

  const handleEditClick = (serie: any) => {
    setEditingSerie(serie);
    setFormData({
      name: serie.title || "",
      plot: serie.plot || "",
      image: serie.image || "",
      bigImage: serie.bigImage || "",
      openingVideo: serie.openingVideo || "",
      year: serie.year || 0,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!editingSerie) return;
    try {
      const res = await api.patch(`/api/v1/series/${editingSerie.id}`, {
        formData,
      });
      setSeries((prev) =>
        prev.map((s) => (s.id === editingSerie.id ? res.data : s))
      );
      setEditingSerie(null);
    } catch (error) {
      console.error("Erro ao editar série:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Séries</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {series.map((serie) => (
            <SeriesCard key={serie.id} serie={serie} onEdit={handleEditClick} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Modal de edição */}
        {editingSerie && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded shadow max-w-md w-full">
              <h2 className="text-xl text-white mb-4">Editar Série</h2>
              <input
                type="text"
                name="title"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Título"
                className="w-full p-2 rounded text-black"
              />

              <textarea
                name="plot"
                value={formData.plot}
                onChange={handleInputChange}
                placeholder="Sinopse"
                className="w-full p-2 rounded text-black"
                rows={3}
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="URL da imagem"
                className="w-full p-2 rounded text-black"
              />

              <input
                type="text"
                name="bigImage"
                value={formData.bigImage}
                onChange={handleInputChange}
                placeholder="URL do banner grande"
                className="w-full p-2 rounded text-black"
              />

              <input
                type="text"
                name="openingVideo"
                value={formData.openingVideo}
                onChange={handleInputChange}
                placeholder="URL do vídeo de abertura"
                className="w-full p-2 rounded text-black"
              />

              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Ano"
                className="w-full p-2 rounded text-black"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-500 rounded text-white"
                  onClick={() => setEditingSerie(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 rounded text-white"
                  onClick={handleSaveEdit}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
