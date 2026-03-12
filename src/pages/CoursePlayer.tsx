import { useParams, useNavigate } from "react-router-dom";
import { courses } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { useState, useEffect } from "react";
import { CheckCircle, Circle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const { isEnrolled, completeLesson, getCompletedLessons, getProgress } = useLearning();
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    if (course && !isEnrolled(course.id)) {
      navigate(`/course/${course?.id}`);
    }
  }, [course, isEnrolled, navigate]);

  if (!course) return <div className="p-10 text-center text-muted-foreground">Course not found.</div>;

  const completed = getCompletedLessons(course.id);
  const lesson = course.lessons[activeLesson];
  const progress = getProgress(course.id, course.lessons.length);

  const handleComplete = () => {
    completeLesson(course.id, lesson.id);
    toast.success("Lesson completed!");
    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button onClick={() => navigate(`/course/${course.id}`)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="w-4 h-4" /> Back to course
      </button>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div className="gradient-bg h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - lesson list */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <h3 className="font-display font-semibold text-foreground mb-3">Lessons</h3>
          <div className="space-y-1.5">
            {course.lessons.map((l, i) => {
              const done = completed.includes(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => setActiveLesson(i)}
                  className={`w-full text-left p-3 rounded-xl flex items-center gap-3 text-sm transition-colors ${
                    i === activeLesson ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {done ? (
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 shrink-0" />
                  )}
                  <span className="line-clamp-1">{l.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video player */}
        <div className="lg:col-span-3 order-1 lg:order-2 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-foreground/5 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${lesson.videoId}`}
              title={lesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">{lesson.title}</h2>
              <p className="text-sm text-muted-foreground">Duration: {lesson.duration}</p>
            </div>
            {!completed.includes(lesson.id) ? (
              <Button onClick={handleComplete} className="gradient-bg text-primary-foreground font-semibold">
                Mark Complete
              </Button>
            ) : (
              <span className="text-sm text-secondary font-medium flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Completed
              </span>
            )}
          </div>
          {progress === 100 && (
            <div className="glass-card rounded-2xl p-5 text-center">
              <p className="font-display font-bold text-foreground text-lg">🎉 Course Completed!</p>
              <p className="text-sm text-muted-foreground mt-1">Go to My Learning to generate your certificate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
