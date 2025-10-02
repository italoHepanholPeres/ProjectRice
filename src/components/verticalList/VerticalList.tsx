import type { Manga } from "../../interfaces/Manga";
import Card from "../card/Card";

interface VerticalListProps {
  mangas: Manga[];
  title?: string;
  onMangaClick: (id: string) => void;
}

export default function VerticalList({
  mangas,
  title,
  onMangaClick,
}: VerticalListProps) {
  if (!mangas || mangas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
        <p>Nenhum mangá disponível.</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      {title && <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>}
      <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 flex max-h-[80vh] flex-col gap-4 overflow-y-auto pr-2">
        {mangas.map((manga) => (
          <div key={manga.id} className="aspect-[2/3] w-32">
            <Card
              key={manga.id}
              id={manga.id}
              title={manga.title}
              coverUrl={manga.coverUrl}
              additionalInfo={manga.additionalInfo}
              onCardClick={onMangaClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
