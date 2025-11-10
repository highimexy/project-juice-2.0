// Twój plik main.tsx lub index.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx"; // Zakładam, że to Twoja strona główna (Home)
import Taste from "./pages/Taste.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./NotFoundPage.tsx";
import Contact from "./pages/Contact.tsx";
import RootLayout from "./RootLayout.tsx"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 2. Wszystkie Twoje strony stają się "dziećmi" (children)
    children: [
      {
        index: true, // <-- `index: true` oznacza, że to jest komponent dla ścieżki "/"
        element: <App />, // Twoja strona główna
      },
      {
        path: "taste",
        element: <Taste />,
      },
      {
        path: "contact",
        element: <Contact />,
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
