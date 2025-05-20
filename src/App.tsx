
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BookingsList from "./pages/BookingsList";
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import BookingDetail from "./pages/BookingDetail";
import TripsPage from "./pages/TripsPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<BookingsList />} />
            <Route path="bookings/new" element={<AddBooking />} />
            <Route path="bookings/:id" element={<BookingDetail />} />
            <Route path="bookings/edit/:id" element={<EditBooking />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
