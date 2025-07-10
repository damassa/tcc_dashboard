import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import { SerieProvider } from "./context/SerieProvider";
import { Toaster } from "sonner";
import { ModalProvider } from "./context/ModalContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SerieProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </SerieProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
