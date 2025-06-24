import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
