import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Eye, EyeOff, UserCircle, BookOpenCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Auth = () => {
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "instructor">("user");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

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
    <div className="min-h-screen flex items-center justify-center px-4 hero-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {mode === "login" ? "Welcome Back" : mode === "signup" ? "Create Account" : "Reset Password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to continue learning" : mode === "signup" ? "Start your learning journey" : "Enter your email to reset"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="John Doe" required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">I want to join as</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("user")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      role === "user"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <UserCircle className="w-6 h-6" />
                    <span className="text-sm font-medium">Student</span>
                    <span className="text-[10px] opacity-70">Learn & grow</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("instructor")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      role === "instructor"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <BookOpenCheck className="w-6 h-6" />
                    <span className="text-sm font-medium">Instructor</span>
                    <span className="text-[10px] opacity-70">Teach & inspire</span>
                  </button>
                </div>
              </div>
            </>
          )}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com" required
            />
          </div>
          {mode !== "reset" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
                  placeholder="••••••••" required minLength={6}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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

export default Auth;
