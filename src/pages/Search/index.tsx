import { useSearchParams } from "react-router-dom";
import { getMangaByTitle } from "../../api/MangaService";

function Search() {
  const [searchParam] = useSearchParams();
  const title = searchParam.get("title");
  if (title) {
    console.log(getMangaByTitle(title));
  }

  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

export default Search;
