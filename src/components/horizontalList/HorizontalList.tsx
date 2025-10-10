import Card from "../card/Card";
import type { Manga } from "../../interfaces/Manga";
import { useCallback, useRef } from "react";

interface HorizontalListProps {
  mangas: Manga[];
  title?: string;
}

export default function HorizontalList({ mangas, title }: HorizontalListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

    // Scroll com a roda do mouse (horizontal)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
    e.preventDefault();
  };


  // Evitar scroll da página ao entrar na lista
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
        ref={scrollRef}
        //onWheel={handleWheel}
        //onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          handleMouseLeave();
          isDown = false;
          scrollRef.current?.classList.remove("cursor-grabbing");
        }}
        onMouseDown={(e) => {
          isDown = true;
          startX = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
          scrollLeft = scrollRef.current?.scrollLeft ?? 0;
          scrollRef.current?.classList.add("cursor-grabbing");
        }}
        onMouseUp={() => {
          isDown = false;
          scrollRef.current?.classList.remove("cursor-grabbing");
        }}
        onMouseMove={(e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
          const walk = (x - startX) * 2; // ajuste da velocidade do arraste
          if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
        }}
        className="hide-scrollbar flex overflow-x-auto overflow-y-hidden cursor-grab select-none scroll-smooth"
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
