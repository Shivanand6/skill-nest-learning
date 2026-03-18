import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/courses";
import { BookOpen, Users, Award, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const InstructorDashboard = () => {
  const { profile } = useAuth();

  const statCards = [
    { icon: BookOpen, label: "Total Courses", value: courses.length, color: "text-primary" },
    { icon: Users, label: "Total Students", value: "—", color: "text-secondary" },
    { icon: Award, label: "Certificates Issued", value: "—", color: "text-accent" },
    { icon: BarChart3, label: "Avg Rating", value: "—", color: "text-primary" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
          Instructor Dashboard 🎓
        </h1>
        <p className="text-muted-foreground">
          Welcome, {profile?.display_name || "Instructor"}! Manage your courses and track student progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 text-center"
          >
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Courses List */}
      <h2 className="font-display text-xl font-semibold text-foreground mb-4">Platform Courses</h2>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Category</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Lessons</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id} className="border-b border-border/30">
                  <td className="p-3 text-foreground font-medium">{course.title}</td>
                  <td className="p-3 text-muted-foreground">{course.category}</td>
                  <td className="p-3 text-muted-foreground">{course.lessons.length}</td>
                  <td className="p-3 text-muted-foreground">{course.price === 0 ? "Free" : `₹${course.price}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coming soon note */}
      <div className="mt-10 glass-card rounded-2xl p-6 text-center">
        <p className="text-muted-foreground text-sm">
          🚧 Course creation & student analytics features coming soon!
        </p>
      </div>
    </div>
  );
};

export default InstructorDashboard;
