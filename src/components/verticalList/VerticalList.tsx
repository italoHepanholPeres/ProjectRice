import Card from "../card/Card";

interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  additionalInfo?: string;
}

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
      <div className="p-6 flex flex-col items-center justify-center text-gray-400">
        {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
        <p>Nenhum mangá disponível.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {title && <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {mangas.map((manga) => (
          <div key={manga.id} className="w-32 aspect-[2/3]">
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
