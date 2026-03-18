import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

const Dashboard = () => {
  const { user, loading, isAdmin, userRole } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  if (isAdmin) return <AdminDashboard />;
  if (userRole === "instructor") return <InstructorDashboard />;
  return <StudentDashboard />;
};

export default Dashboard;
