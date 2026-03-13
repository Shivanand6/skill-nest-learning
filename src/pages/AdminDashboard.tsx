import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navigate } from "react-router-dom";
import { Users, BookOpen, DollarSign, MessageSquare, Star } from "lucide-react";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [stats, setStats] = useState({ users: 0, enrollments: 0, revenue: 0, feedbackCount: 0 });
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [enrollmentList, setEnrollmentList] = useState<any[]>([]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    const [profilesRes, enrollmentsRes, feedbackRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("enrollments").select("*"),
      supabase.from("feedback").select("*").order("created_at", { ascending: false }),
    ]);

    const enrollments = enrollmentsRes.data || [];
    const paidEnrollments = enrollments.filter(e => {
      const course = courses.find(c => c.id === e.course_id);
      return course && course.price > 0;
    });

    setStats({
      users: profilesRes.count || 0,
      enrollments: enrollments.length,
      revenue: paidEnrollments.length * 49,
      feedbackCount: feedbackRes.data?.length || 0,
    });
    setFeedbackList(feedbackRes.data || []);
    setEnrollmentList(enrollments);
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const statCards = [
    { icon: Users, label: "Total Users", value: stats.users, color: "text-primary" },
    { icon: BookOpen, label: "Enrollments", value: stats.enrollments, color: "text-secondary" },
    { icon: DollarSign, label: "Revenue", value: `₹${stats.revenue}`, color: "text-accent" },
    { icon: MessageSquare, label: "Feedback", value: stats.feedbackCount, color: "text-destructive" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Platform overview and management</p>

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

      {/* Recent Enrollments */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recent Enrollments</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Progress</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Certified</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollmentList.slice(0, 10).map(e => {
                  const course = courses.find(c => c.id === e.course_id);
                  const progress = course ? Math.round(((e.completed_lessons?.length || 0) / course.lessons.length) * 100) : 0;
                  return (
                    <tr key={e.id} className="border-b border-border/30">
                      <td className="p-3 text-foreground">{course?.title || e.course_id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-1.5">
                            <div className="gradient-bg h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{progress}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-xs">{e.certificate_generated ? "✅" : "—"}</td>
                      <td className="p-3 text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
                {enrollmentList.length === 0 && (
                  <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No enrollments yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Feedback Messages</h2>
        <div className="space-y-3">
          {feedbackList.slice(0, 10).map(f => (
            <div key={f.id} className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-foreground text-sm">{f.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{f.email}</span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= f.rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{f.message}</p>
              <p className="text-xs text-muted-foreground mt-2">{new Date(f.created_at).toLocaleString()}</p>
            </div>
          ))}
          {feedbackList.length === 0 && (
            <p className="text-center text-muted-foreground py-6">No feedback yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
