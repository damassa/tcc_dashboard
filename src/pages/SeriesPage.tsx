import { useEffect, useState } from "react";
import { getSeries } from "../services/seriesService";
import { Pagination } from "../components/Pagination";
import SeriesCard from "../components/SeriesCard";

export default function SeriesPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const { data, total } = await getSeries(currentPage, limit);
        setSeries(data);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.error("Erro ao buscar séries:", error);
      }
    };
    fetchSeries();
  }, [currentPage]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Séries</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {series.map((serie) => (
          <SeriesCard key={serie.id} serie={serie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
