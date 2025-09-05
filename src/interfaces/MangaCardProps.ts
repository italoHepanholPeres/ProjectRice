export interface MangaCardProps {
  id: string;
  title: string;
  coverUrl: string;
  additionalInfo?: string;
  onCardClick: (id: string) => void;
}
