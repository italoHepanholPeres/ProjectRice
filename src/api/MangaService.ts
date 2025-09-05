import axios from "axios";
import Mapper from "../mappers/MangaMapper";
import type { Manga } from "../interfaces/Manga";
import type { MangaTag } from "../interfaces/MangaTag";

const mangaUrl: string = "https://api.mangadex.org/manga";
const coverUrl: string = "https://api.mangadex.org/cover/";

//mapeia o json
async function mapMangas(mangas: Manga[]) {
  const mapped: Manga[] = await Promise.all(
    mangas.map((manga: any) => Mapper(manga)),
  );

  return mapped;
}

//Nao ta sendo usado
/*export async function SearchMangas(title: string) {
  const response = await axios.get(`${baseUrl}manga`);
  console.log("${baseUrl}manga");

  return response.data;
}*/

export async function getMangas() {
  try {
    const response = await axios.get(`${mangaUrl}`, {
      params: {
        limit: 15,
        "order[updatedAt]": "desc",
        "contentRating[]": ["safe"],
      },
    });

    const mapped: Manga[] = await mapMangas(response.data.data);

    return mapped;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMangaByTitle(title: string): Promise<Manga[]> {
  try {
    const response = await axios.get(`${mangaUrl}`, {
      params: {
        limit: 15,
        title: title,
        "order[updatedAt]": "desc",
        "contentRating[]": ["safe"],
      },
    });
    const mapped: Manga[] = await mapMangas(response.data.data);

    return mapped;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCoverData(id: string) {
  try {
    const response = await axios.get(`${coverUrl}${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMangaByTags(
  includedTagsNames: string[] = [],
  excludedTagsNames: string[] = [],
) {
  const apiTags = await axios(`${mangaUrl}/tag`);

  const includedTagIDs = apiTags.data.data
    .filter((tag: MangaTag) =>
      includedTagsNames.includes(tag.attributes.name.en),
    )
    .map((tag: MangaTag) => tag.id);

  const excludedTagIDs = apiTags.data.data
    .filter((tag: MangaTag) =>
      excludedTagsNames.includes(tag.attributes.name.en),
    )
    .map((tag: MangaTag) => tag.id);

  const response = axios.get(`${mangaUrl}`, {
    params: {
      includedTags: includedTagIDs,
      excludedTags: excludedTagIDs,
    },
  });

  const mapped = mapMangas((await response).data.data);
  return mapped;
}
