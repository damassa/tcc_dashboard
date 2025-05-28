interface Props {
  serie: {
    id: string;
    title: string;
    thumbUrl?: string;
  };
}

export default function SeriesCard({ serie }: Props) {
  return (
    <article className="rounded-xl bg-zinc-900 p-4 space-y-2">
      {serie.thumbUrl && (
        <img
          src={serie.thumbUrl}
          alt={serie.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}
      <h3 className="text-lg font-medium text-white">{serie.title}</h3>
    </article>
  );
}