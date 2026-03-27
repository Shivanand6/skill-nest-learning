import { courses } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Play, Award, BookOpen, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import CertificateDownload from "@/components/CertificateDownload";

const StudentDashboard = () => {
  const { enrolledCourses, getProgress, generateCertificate, hasCertificate, getCertificateId } = useLearning();
  const { profile } = useAuth();
  const [studentName, setStudentName] = useState(profile?.display_name || "");

  const enrolled = enrolledCourses
    .map(ec => ({ ...ec, course: courses.find(c => c.id === ec.courseId)! }))
    .filter(ec => ec.course);

  const completedCount = enrolled.filter(e => getProgress(e.courseId, e.course.lessons.length) === 100).length;
  const certCount = enrolled.filter(e => hasCertificate(e.courseId)).length;
  const avgProgress = enrolled.length > 0
    ? Math.round(enrolled.reduce((sum, e) => sum + getProgress(e.courseId, e.course.lessons.length), 0) / enrolled.length)
    : 0;

  const handleGenerateCert = (courseId: string) => {
    if (!studentName.trim()) {
      toast.error("Please enter your name for the certificate");
      return;
    }
    const certId = generateCertificate(courseId);
    toast.success(`Certificate generated! ID: ${certId}`);
  };

  const statCards = [
    { icon: BookOpen, label: "Enrolled", value: enrolled.length, color: "text-primary" },
    { icon: Trophy, label: "Completed", value: completedCount, color: "text-secondary" },
    { icon: Award, label: "Certificates", value: certCount, color: "text-accent" },
    { icon: Target, label: "Avg Progress", value: `${avgProgress}%`, color: "text-primary" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
          Welcome back, {profile?.display_name || "Student"} 👋
        </h1>
        <p className="text-muted-foreground">Here's your learning progress</p>
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

      {/* Name for certificates */}
      <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center gap-3">
        <Award className="w-5 h-5 text-accent shrink-0" />
        <span className="text-sm text-foreground font-medium">Your name for certificates:</span>
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Your full name"
          className="flex-1 px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Enrolled Courses */}
      {enrolled.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">No courses enrolled yet</h2>
          <p className="text-muted-foreground mb-6">Start your learning journey by browsing our courses.</p>
          <Link to="/courses">
            <Button className="gradient-bg text-primary-foreground font-semibold">Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">My Courses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolled.map(({ course, courseId }) => {
              const progress = getProgress(courseId, course.lessons.length);
              const completed = progress === 100;
              const hasCert = hasCertificate(courseId);
              const certId = getCertificateId(courseId);

              return (
                <motion.div
                  key={courseId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-card border border-border/60 overflow-hidden"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover" />
                  <div className="p-4 space-y-3">
                    <h3 className="font-display font-semibold text-foreground">{course.title}</h3>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="gradient-bg h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">{progress}% complete</p>

                    <div className="flex gap-2 flex-wrap">
                      <Link to={`/player/${courseId}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Play className="w-3 h-3 mr-1" /> {completed ? "Review" : "Continue"}
                        </Button>
                      </Link>
                      {completed && !hasCert && (
                        <Button size="sm" onClick={() => handleGenerateCert(courseId)} className="gradient-bg text-primary-foreground text-xs">
                          <Award className="w-3 h-3 mr-1" /> Get Cert
                        </Button>
                      )}
                      {hasCert && certId && (
                        <CertificateDownload
                          courseName={course.title}
                          studentName={studentName || "Student"}
                          certId={certId}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
