import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Users, Zap, TrendingUp, Trophy } from "lucide-react";
import { freeCourses, paidCourses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: BookOpen, label: "Courses", value: "20+" },
  { icon: Users, label: "Students", value: "10K+" },
  { icon: Award, label: "Certificates", value: "5K+" },
  { icon: Zap, label: "Hours of Content", value: "100+" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Learn • Build • Achieve</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Level Up Your <span className="gradient-text">Skills</span> with SkillNest
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Free & affordable courses in Web Dev, DSA, Python, Design and more. Learn at your pace, earn certificates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/courses">
                <Button size="lg" className="gradient-bg text-primary-foreground font-semibold px-6 hover:opacity-90">
                  Browse Courses <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/my-learning">
                <Button size="lg" variant="outline" className="font-semibold px-6">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Free Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Free Courses</h2>
              <p className="text-muted-foreground text-sm mt-0.5">Start learning without spending a penny</p>
            </div>
          </div>
          <Link to="/courses" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeCourses.slice(0, 3).map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Premium Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Premium Courses</h2>
              <p className="text-muted-foreground text-sm mt-0.5">In-depth courses at just ₹49</p>
            </div>
          </div>
          <Link to="/courses" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paidCourses.slice(0, 3).map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-sm text-muted-foreground">
          <p className="font-display font-semibold text-foreground mb-1">SkillNest</p>
          <p>Learn • Build • Achieve — © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
