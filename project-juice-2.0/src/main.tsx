import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Taste from "./pages/Taste.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.tsx";
import Contact from "./pages/Info.tsx";
import RootLayout from "./RootLayout.tsx";
import Slot from "./pages/Slot.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/taste" replace />,
      },
      {
        path: "taste",
        element: <Taste />,
      },
      {
        path: "kontakt",
        element: <Contact />,
      },
      {
        path: "slot",
        element: <Slot />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
