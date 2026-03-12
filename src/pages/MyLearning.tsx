import { courses } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { Link } from "react-router-dom";
import { Play, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MyLearning = () => {
  const { enrolledCourses, getProgress, generateCertificate, hasCertificate, getCertificateId } = useLearning();
  const [studentName, setStudentName] = useState("");

  const enrolled = enrolledCourses
    .map(ec => ({ ...ec, course: courses.find(c => c.id === ec.courseId)! }))
    .filter(ec => ec.course);

  const handleGenerateCert = (courseId: string) => {
    if (!studentName.trim()) {
      toast.error("Please enter your name for the certificate");
      return;
    }
    const certId = generateCertificate(courseId);
    toast.success(`Certificate generated! ID: ${certId}`);
  };

  if (enrolled.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">My Learning</h1>
        <p className="text-muted-foreground mb-6">You haven't enrolled in any courses yet.</p>
        <Link to="/courses">
          <Button className="gradient-bg text-primary-foreground font-semibold">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Learning</h1>
      <p className="text-muted-foreground mb-8">{enrolled.length} course{enrolled.length > 1 ? "s" : ""} enrolled</p>

      {/* Name input for certificates */}
      <div className="glass-card rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center gap-3">
        <Award className="w-5 h-5 text-accent shrink-0" />
        <span className="text-sm text-foreground font-medium">Enter your name for certificates:</span>
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          placeholder="Your full name"
          className="flex-1 px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

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

                <div className="flex gap-2">
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
                  {hasCert && (
                    <Button size="sm" variant="outline" className="text-xs text-secondary border-secondary/30" disabled>
                      <Download className="w-3 h-3 mr-1" /> {certId}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLearning;
