import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Taste from "./pages/Taste.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./NotFoundPage.tsx";
import Contact from "./pages/Contact.tsx";
import RootLayout from "./RootLayout.tsx";
import Polecane from "./pages/Polecane.tsx";
import Slot from "./pages/Slot.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
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
        path: "polecane",
        element: <Polecane />,
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
  </StrictMode>
);
