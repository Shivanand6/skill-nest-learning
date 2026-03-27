import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import { Button } from "@/components/ui/button";
import { useLearning } from "@/context/LearningContext";
import { courses } from "@/data/courses";
import { ShoppingCart, Trash2, LogIn, LogOut, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";

const CartSection = () => {
  const { cart, removeFromCart, clearCart, enroll } = useLearning();
  const cartCourses = cart.map(c => courses.find(co => co.id === c.courseId)!).filter(Boolean);
  const total = cartCourses.reduce((sum, c) => sum + c.price, 0);

  const handleCheckout = () => {
    cartCourses.forEach(c => enroll(c.id));
    clearCart();
    toast.success("Payment successful! Courses unlocked.");
  };

  if (cartCourses.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary" /> Cart ({cartCourses.length})
      </h2>
      <div className="space-y-3 mb-4">
        {cartCourses.map(c => (
          <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60">
            <img src={c.thumbnail} alt={c.title} className="w-20 h-14 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-card-foreground text-sm">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.instructor}</p>
            </div>
            <p className="font-display font-bold text-card-foreground">₹{c.price}</p>
            <button onClick={() => removeFromCart(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-card border border-border/60 p-5 space-y-3">
        <div className="flex justify-between text-card-foreground font-display">
          <span className="font-medium">Total</span>
          <span className="text-2xl font-bold">₹{total}</span>
        </div>
        <Button onClick={handleCheckout} className="w-full gradient-bg text-primary-foreground font-semibold" size="lg">
          Checkout — Pay ₹{total}
        </Button>
      </div>
    </div>
  );
};

const AuthSection = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "instructor">("user");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (mode === "reset") {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast.success("Password reset email sent!");
        setMode("login");
      } else if (mode === "signup") {
        if (!name.trim()) { toast.error("Please enter your name"); setSubmitting(false); return; }
        const { error } = await signUp(email, password, name, role);
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border/60 p-8 space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-card-foreground">
            {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to access your dashboard" : mode === "signup" ? "Start your learning journey" : "Enter your email to reset"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-1 block">Full Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="John Doe" required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">I want to join as</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["user", "instructor"] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        role === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <span className="text-sm font-medium">{r === "user" ? "Student" : "Instructor"}</span>
                      <span className="text-[10px] opacity-70">{r === "user" ? "Learn & grow" : "Teach & inspire"}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-1 block">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com" required
            />
          </div>
          {mode !== "reset" && (
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1 block">Password</label>
              <input
                type={mode === "login" ? "password" : "text"}
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••" required minLength={6}
              />
            </div>
          )}
          <Button type="submit" disabled={submitting} className="w-full gradient-bg text-primary-foreground font-semibold">
            {submitting ? "Please wait..." : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center space-y-2 text-sm">
          {mode === "login" && (
            <>
              <button onClick={() => setMode("reset")} className="text-primary hover:underline block mx-auto">Forgot password?</button>
              <p className="text-muted-foreground">Don't have an account? <button onClick={() => setMode("signup")} className="text-primary hover:underline">Sign up</button></p>
            </>
          )}
          {mode === "signup" && (
            <p className="text-muted-foreground">Already have an account? <button onClick={() => setMode("login")} className="text-primary hover:underline">Sign in</button></p>
          )}
          {mode === "reset" && (
            <button onClick={() => setMode("login")} className="text-primary hover:underline">Back to sign in</button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const { user, loading, isAdmin, userRole, signOut, profile } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AuthSection />
      </div>
    );
  }

  const roleLabel = userRole === "admin" ? "Admin" : userRole === "instructor" ? "Instructor" : "Student";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* User bar */}
      <div className="flex items-center justify-between mb-8 rounded-2xl bg-card border border-border/60 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
            {(profile?.display_name || user.email || "U")[0].toUpperCase()}
          </div>
          <div>
            <p className="font-display font-semibold text-card-foreground">{profile?.display_name || user.email}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
          </Link>
          <button onClick={signOut} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      <CartSection />

      {isAdmin ? <AdminDashboard /> : userRole === "instructor" ? <InstructorDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;