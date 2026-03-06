import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.tsx";
import Info from "./pages/Info.tsx";
import RootLayout from "./RootLayout.tsx";
import Slot from "./pages/Slot.tsx";
import Smaki from "./pages/Smaki.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/smaki" replace />,
      },
      {
        path: "smaki",
        element: <Smaki />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "???",
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
