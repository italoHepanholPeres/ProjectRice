import { getCoverData } from "../api/MangaService";
import type { Manga } from "../interfaces/Manga";

//Manga
export default async function Mapper(manga: any): Promise<Manga> {
  const id: string = manga.id;

  const title: string =
    manga.attributes?.title?.["pt-br"] ||
    manga.attributes?.title?.["en"] ||
    manga.attributes?.title?.["ja-ro"] ||
    manga.attributes?.title?.["ja"] ||
    manga.attributes?.altTitles?.find((t: any) => t["pt-br"])?.["pt-br"] ||
    manga.attributes?.altTitles?.find((t: any) => t["en"])?.["en"] ||
    manga.attributes?.altTitles?.find((t: any) => t["ja-ro"])?.["ja-ro"] ||
    "sem título";

  const coverInManga = manga.relationships?.find(
    (rel: any) => rel.type === "cover_art",
  );

  const coverId = coverInManga.id;
  const coverObject = await getCoverData(coverId);
  const fileName = coverObject.attributes.fileName;

  const coverUrl = `https://uploads.mangadex.org/covers/${id}/${fileName}`;

  return {
    id,
    title,
    coverUrl,
  };
}
