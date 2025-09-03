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
      <div className="p-4">
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
        <p className="text-gray-500">Nenhum mangá disponível.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

      <div className="flex flex-col space-y-4 overflow-y-auto max-h-[600px] hide-scrollbar">
        {mangas.map((manga) => (
          <Card
            key={manga.id}
            id={manga.id}
            title={manga.title}
            coverUrl={manga.coverUrl}
            additionalInfo={manga.additionalInfo}
            onCardClick={onMangaClick}
          />
        ))}
      </div>
    </div>
  );
}
