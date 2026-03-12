import { Link } from "react-router-dom";
import { Clock, Users, Star, Bookmark } from "lucide-react";
import { Course } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { motion } from "framer-motion";

const CourseCard = ({ course }: { course: Course }) => {
  const { isBookmarked, toggleBookmark, isEnrolled } = useLearning();
  const bookmarked = isBookmarked(course.id);
  const enrolled = isEnrolled(course.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl bg-card border border-border/60 overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <Link to={`/course/${course.id}`}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              course.price === 0
                ? "bg-secondary text-secondary-foreground"
                : "bg-accent text-accent-foreground"
            }`}>
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>
          </div>
          {enrolled && (
            <div className="absolute top-3 right-12">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                Enrolled
              </span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => { e.preventDefault(); toggleBookmark(course.id); }}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center transition-colors hover:bg-card"
      >
        <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-accent text-accent" : "text-muted-foreground"}`} />
      </button>

      <div className="p-4 space-y-3">
        <Link to={`/course/${course.id}`}>
          <p className="text-xs font-medium text-primary uppercase tracking-wider">{course.category}</p>
          <h3 className="font-display font-semibold text-card-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.enrolled.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-accent text-accent" />{course.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
