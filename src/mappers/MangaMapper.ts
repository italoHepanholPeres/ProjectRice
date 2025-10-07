import { getCoverListData } from "../api/MangaService";
import type { Manga } from "../interfaces/Manga";
import type { MangaInfo } from "../interfaces/MangaInfo";

//Manga
export async function mapperToCard(manga: any): Promise<Manga> {
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
  const coverObject = await getCoverListData(coverId);
  const fileName = coverObject.attributes.fileName;

  const coverUrl = `https://uploads.mangadex.org/covers/${id}/${fileName}`;

  return {
    id,
    title,
    coverUrl,
  };
}

export async function mapperToMangaInfo(manga: any): Promise<MangaInfo> {
  const attrs = manga.attributes || {};
  const id = manga.id;

  const title =
    (attrs.title && (attrs.title["en"] || Object.values(attrs.title)[0])) ||
    "Título não disponível";

  // descrição (similar)
  const description =
    (attrs.description &&
      (attrs.description["pt-br"] ||
        attrs.description["en"] ||
        Object.values(attrs.description)[0])) ||
    "Sem descrição disponível.";

  // tags
  const tags =
    (attrs.tags &&
      attrs.tags.map(
        (t: any) =>
          t.attributes?.name?.en ||
          Object.values(t.attributes?.name || {})[0] ||
          "tag",
      )) ||
    [];

  const coverInManga = manga.relationships?.find(
    (rel: any) => rel.type === "cover_art",
  );

  const coverId = coverInManga.id;
  const coverObject = await getCoverListData(coverId);
  const fileName = coverObject.attributes.fileName;

  const coverUrl = `https://uploads.mangadex.org/covers/${id}/${fileName}`;
  return {
    id,
    title,
    description,
    coverUrl,
    tags,
  };
}
