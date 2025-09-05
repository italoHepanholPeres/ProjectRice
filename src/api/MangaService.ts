import axios from "axios";
import Mapper from "../mappers/MangaMapper";
import type { Manga } from "../interfaces/Manga";

const baseUrl: string = "https://api.mangadex.org/";
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
    const response = await axios.get(`${baseUrl}manga`, {
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
    const response = await axios.get(`${baseUrl}/manga`, {
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
