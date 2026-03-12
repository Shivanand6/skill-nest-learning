import { useParams, useNavigate, Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { Clock, Users, Star, BookOpen, Lock, Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const { isEnrolled, enroll, addToCart, isInCart, getProgress } = useLearning();

  if (!course) return <div className="p-10 text-center text-muted-foreground">Course not found.</div>;

  const enrolled = isEnrolled(course.id);
  const progress = getProgress(course.id, course.lessons.length);

  const handleEnroll = () => {
    enroll(course.id);
    toast.success("Enrolled successfully!");
    navigate(`/player/${course.id}`);
  };

  const handleAddToCart = () => {
    addToCart(course.id);
    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full aspect-video object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">{course.category}</p>
            <h1 className="font-display text-3xl font-bold text-foreground mt-1">{course.title}</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">{course.description}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.lessons.length} lessons</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.duration}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.enrolled.toLocaleString()} students</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-accent text-accent" />{course.rating}</span>
          </div>

          {/* Lessons list */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, i) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm font-medium text-foreground">{lesson.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 glass-card rounded-2xl p-6 space-y-5">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-foreground">
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {course.price === 0 ? "No payment required" : "One-time payment"}
              </p>
            </div>

            {enrolled ? (
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="gradient-bg h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground text-center">{progress}% complete</p>
                <Link to={`/player/${course.id}`}>
                  <Button className="w-full gradient-bg text-primary-foreground font-semibold">
                    <Play className="w-4 h-4 mr-2" /> Continue Learning
                  </Button>
                </Link>
              </div>
            ) : course.price === 0 ? (
              <Button onClick={handleEnroll} className="w-full gradient-bg text-primary-foreground font-semibold">
                Enroll Now — Free
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <Lock className="w-4 h-4" /> Premium Course
                </div>
                {isInCart(course.id) ? (
                  <Link to="/cart">
                    <Button variant="outline" className="w-full font-semibold">View Cart</Button>
                  </Link>
                ) : (
                  <Button onClick={handleAddToCart} className="w-full gradient-bg text-primary-foreground font-semibold">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart — ₹{course.price}
                  </Button>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-border/50 text-sm text-muted-foreground space-y-2">
              <p><span className="font-medium text-foreground">Instructor:</span> {course.instructor}</p>
              <p><span className="font-medium text-foreground">Duration:</span> {course.duration}</p>
              <p><span className="font-medium text-foreground">Lessons:</span> {course.lessons.length}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
