//card onde os mangás estarão sendo guardados e usados
import type { MangaCardProps } from "../../interfaces/MangaCardProps";

export default function Card({
  id,
  title,
  coverUrl,
  additionalInfo,
  onCardClick,
}: MangaCardProps) {
  const handleClick = () => {
    onCardClick(id);
  };

  //console.log(coverImage);

  return (
    <div
      className="m-3.5 w-48 transform cursor-pointer overflow-hidden rounded-lg bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={coverUrl}
          alt={`Capa de ${title}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback image in case of error
            e.currentTarget.src =
              "https://via.placeholder.com/192x256/3B82F6/FFFFFF?text=Sem+Imagem";
          }}
        />
        {additionalInfo && (
          <div className="absolute top-2 right-2 rounded bg-blue-500 px-2 py-1 text-xs font-bold text-white">
            {additionalInfo}
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 h-10 overflow-hidden text-sm font-semibold text-gray-800">
          {title}
        </h3>
      </div>
    </div>
  );
}
