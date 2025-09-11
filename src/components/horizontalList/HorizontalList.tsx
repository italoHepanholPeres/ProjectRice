import Card from "../card/Card";
import type { Manga } from "../../entities/Manga";
import { useCallback } from "react";

interface HorizontalListProps {
  mangas: Manga[];
  title?: string;
}

export default function HorizontalList({ mangas, title }: HorizontalListProps) {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    const scrollAmount = e.deltaY;

    container.scrollLeft += scrollAmount;

    e.preventDefault();
  };

  const handleMouseEnter = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleMouseLeave = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  if (!mangas || mangas.length === 0) {
    return (
      <div className="p-4">
        {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
        <p className="text-gray-500">Nenhum mangá disponível.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}
      <div
        onWheel={handleWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="hide-scrollbar flex overflow-x-auto overflow-y-hidden"
        style={{ touchAction: "pan-y", maxWidth: "1800px", margin: "0 auto" }}
      >
        <div className="flex space-x-4">
          {mangas.map((manga) => (
            <div key={manga.id} className="flex-none">
              <Card
                id={manga.id}
                title={manga.title}
                coverUrl={manga.coverUrl}
                additionalInfo={manga.additionalInfo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
