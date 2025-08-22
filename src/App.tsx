import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Legal from "./pages/Legal";
import HouseRules from "./pages/HouseRules";
import LegalSpanish from "./pages/LegalSpanish";
import HouseRulesSpanish from "./pages/HouseRulesSpanish";
import Spanish from "./pages/Spanish";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/house-rules" element={<HouseRules />} />
          <Route path="/spanish" element={<Spanish />} />
          <Route path="/spanish/legal" element={<LegalSpanish />} />
          <Route path="/spanish/house-rules" element={<HouseRulesSpanish />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
