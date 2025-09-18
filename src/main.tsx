import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./pages/Search";
import MangaInfoPage from "./pages/MangaInfo";
import ReaderPage from "./pages/ReaderPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/:id", element: <MangaInfoPage /> },
  { path: "/chapter/:chapterId", element: <ReaderPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
