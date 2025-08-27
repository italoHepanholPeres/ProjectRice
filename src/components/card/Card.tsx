//card onde os mangás estarão sendo guardados e usados
interface MangaCardProps {
  id: string | number;
  title: string;
  coverImage: string;
  additionalInfo?: string;
  onCardClick: (id: string | number) => void;
}

export default function Card({ id, title, coverImage, additionalInfo, onCardClick }: MangaCardProps) {
  const handleClick = () => {
    onCardClick(id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-48"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={coverImage} 
          alt={`Capa de ${title}`}
          className="w-full h-64 object-cover"
          onError={(e) => {
            // Fallback image in case of error
            e.currentTarget.src = 'https://via.placeholder.com/192x256/3B82F6/FFFFFF?text=Sem+Imagem';
          }}
        />
        {additionalInfo && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {additionalInfo}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 overflow-hidden">
          {title}
        </h3>
      </div>
    </div>
  );
}
