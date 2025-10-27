import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes";
import "./styles/global.css";

import { RouterProvider } from "react-router-dom";
import { SerieProvider } from "./context/SerieProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SerieProvider>
        <RouterProvider router={router} />
      </SerieProvider>
    </QueryClientProvider>
  );
}

export default App;
