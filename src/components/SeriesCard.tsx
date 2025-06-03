import { Pencil } from "lucide-react";

interface Props {
  serie: {
    id: number;
    title: string;
    bigImage?: string;
    openingVideo: string;
    image?: string;
    plot: string;
    year: number;
  };
  onEdit?: (serie: Props["serie"]) => void;
}

export default function SeriesCard({ serie, onEdit }: Props) {
  return (
    <article className="rounded-xl bg-zinc-900 p-4 space-y-2">
      {serie.image && (
        <img
          src={serie.image}
          alt={serie.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}
      <h3 className="text-lg font-medium text-white">{serie.title}</h3>

      {/* Botão Editar */}
      {onEdit && (
        <button
          onClick={() => onEdit(serie)}
          className="text-sm text-blue-400 hover:underline cursor-pointer"
        >
          <Pencil className="w-4 h-4 text-white" />
        </button>
      )}
    </article>
  );
}
