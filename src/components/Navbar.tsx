import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, GraduationCap, Menu, X, LogIn, LogOut, LayoutDashboard, Brain } from "lucide-react";
import { useState } from "react";
import { useLearning } from "@/context/LearningContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/sentiment-analyzer", label: "Sentiment" },
  { to: "/notes", label: "Notes" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/faq", label: "FAQ" },
  { to: "/feedback", label: "Feedback" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { cart } = useLearning();
  const { user, signOut, profile, userRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleLabel = userRole === "admin" ? "Admin" : userRole === "instructor" ? "Instructor" : "Student";

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">SkillNest</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label === "Dashboard" && <LayoutDashboard className="w-4 h-4 inline mr-1" />}
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full gradient-bg text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-foreground font-medium max-w-[120px] truncate">
                    {profile?.display_name || user.email}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{roleLabel}</span>
                </div>
                <button onClick={signOut} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Sign out">
                  <LogOut className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="p-2 rounded-lg hover:bg-muted transition-colors" title="Sign in">
                <LogIn className="w-5 h-5 text-muted-foreground" />
              </Link>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
