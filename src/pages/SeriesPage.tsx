// src/pages/SeriesPage.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSeries } from "../services/seriesService";
import { Pagination } from "../components/Pagination";
import SeriesCard from "../components/SeriesCard";
import SerieForm from "../components/SerieForm";
import type { Serie } from "../types/serie";

export default function SeriesPage() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState<Serie | null>(null);
  const limit = 6;

  useEffect(() => {
    fetchSeries();
  }, [currentPage]);

  const fetchSeries = async () => {
    try {
      const { data, total } = await getSeries(currentPage, limit);
      setSeries(data);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      toast.error("Erro ao buscar séries.");
    }
  };

  const handleEdit = (serie: Serie) => {
    setSelectedSerie(serie);
    setEditMode(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSerie(null);
    setEditMode(false);
    setShowModal(false);
    fetchSeries();
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Séries</h1>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
            onClick={() => {
              setSelectedSerie(null);
              setEditMode(false);
              setShowModal(true);
            }}
          >
            Nova Série
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {series.map((serie) => (
            <SeriesCard
              key={serie.id}
              serie={serie}
              onEdit={() => handleEdit(serie)}
              onDeleteSuccess={fetchSeries}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-800 w-full max-w-2xl rounded-xl shadow-xl p-6 space-y-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-white">
              {editMode ? "Editar Série" : "Nova Série"}
            </h2>
            <SerieForm
              onClose={handleCloseModal}
              initialData={selectedSerie}
              editMode={editMode}
            />
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-lg bg-zinc-600 hover:bg-zinc-500 text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
