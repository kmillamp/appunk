import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Agenda from "./pages/Agenda";
import Branding from "./pages/Branding";
import SelfCare from "./pages/SelfCare";
import Home from "./pages/Home";
import CentralAdmin from "./pages/admin/CentralAdmin";
import CadastroDJs from "./pages/admin/CadastroDJs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/selfcare" element={<SelfCare />} />
            
            {/* Rotas administrativas */}
            <Route path="/admin/central" element={<CentralAdmin />} />
            <Route path="/admin/cadastro-djs" element={<CadastroDJs />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
