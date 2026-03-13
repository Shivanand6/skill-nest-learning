import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LearningProvider } from "@/context/LearningContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CoursePlayer from "./pages/CoursePlayer";
import MyLearning from "./pages/MyLearning";
import Cart from "./pages/Cart";
import Notes from "./pages/Notes";
import Feedback from "./pages/Feedback";
import FAQ from "./pages/FAQ";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <LearningProvider>
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/player/:id" element={<CoursePlayer />} />
                <Route path="/my-learning" element={<MyLearning />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AIAssistant />
            </BrowserRouter>
          </LearningProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
