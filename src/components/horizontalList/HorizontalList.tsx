import Card from '../card/Card'


interface Manga{
    id: string | number;
    title: string;
    cover: string;
    additionalInfo?: string;
}

interface HorizontalMangaListProps{
    mangas: Manga[];
    title?: string;
    onMangaClick: (id: string | number) => void;
}


export default function HorizontalMangaList({ 
  mangas, 
  title, 
  onMangaClick 
}: HorizontalMangaListProps) {
  if (!mangas || mangas.length === 0) {
    return (
      <div className="p-4">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="text-gray-500">Nenhum mangá disponível.</p>
      </div>
    );
  }

return (
    <div className="w-full p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      
      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-4">
          {mangas.map((manga) => (
            <div key={manga.id} className="flex-none">
              <Card
                id={manga.id}
                title={manga.title}
                coverImage={manga.cover}
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