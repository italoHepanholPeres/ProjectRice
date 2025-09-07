import { useRef } from "react";
import Card from "../card/Card";
import type { Manga } from "../../entities/Manga";

interface HorizontalListProps {
  mangas: Manga[];
  title?: string;
  onMangaClick: (id: string) => void;
}

export default function HorizontalList({
  mangas,
  title,
  onMangaClick,
}: HorizontalListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  if (!mangas || mangas.length === 0) {
    return (
      <div className="p-4">
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
        <p className="text-gray-500">Nenhum mangá disponível.</p>
      </div>
    );
  }
  //console.log(mangas[3].cover);
  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="hide-scrollbar flex overflow-x-auto"
      >
        <div className="flex space-x-4">
          {mangas.map((manga) => (
            <div key={manga.id} className="flex-none">
              <Card
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
    </div>
  );
}
