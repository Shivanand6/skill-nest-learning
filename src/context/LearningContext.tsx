import React, { createContext, useContext, useState, useCallback } from "react";

interface EnrolledCourse {
  courseId: string;
  completedLessons: string[];
  certificateGenerated: boolean;
  certificateId?: string;
}

interface CartItem {
  courseId: string;
}

interface LearningContextType {
  enrolledCourses: EnrolledCourse[];
  cart: CartItem[];
  bookmarks: string[];
  isEnrolled: (courseId: string) => boolean;
  enroll: (courseId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  getProgress: (courseId: string, totalLessons: number) => number;
  getCompletedLessons: (courseId: string) => string[];
  addToCart: (courseId: string) => void;
  removeFromCart: (courseId: string) => void;
  isInCart: (courseId: string) => boolean;
  clearCart: () => void;
  toggleBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  generateCertificate: (courseId: string) => string;
  getCertificateId: (courseId: string) => string | undefined;
  hasCertificate: (courseId: string) => boolean;
}

const LearningContext = createContext<LearningContextType | null>(null);

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const isEnrolled = useCallback((courseId: string) => enrolledCourses.some(c => c.courseId === courseId), [enrolledCourses]);

  const enroll = useCallback((courseId: string) => {
    setEnrolledCourses(prev => {
      if (prev.some(c => c.courseId === courseId)) return prev;
      return [...prev, { courseId, completedLessons: [], certificateGenerated: false }];
    });
  }, []);

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setEnrolledCourses(prev => prev.map(c => {
      if (c.courseId !== courseId) return c;
      if (c.completedLessons.includes(lessonId)) return c;
      return { ...c, completedLessons: [...c.completedLessons, lessonId] };
    }));
  }, []);

  const getProgress = useCallback((courseId: string, totalLessons: number) => {
    const course = enrolledCourses.find(c => c.courseId === courseId);
    if (!course || totalLessons === 0) return 0;
    return Math.round((course.completedLessons.length / totalLessons) * 100);
  }, [enrolledCourses]);

  const getCompletedLessons = useCallback((courseId: string) => {
    return enrolledCourses.find(c => c.courseId === courseId)?.completedLessons ?? [];
  }, [enrolledCourses]);

  const addToCart = useCallback((courseId: string) => {
    setCart(prev => prev.some(c => c.courseId === courseId) ? prev : [...prev, { courseId }]);
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setCart(prev => prev.filter(c => c.courseId !== courseId));
  }, []);

  const isInCart = useCallback((courseId: string) => cart.some(c => c.courseId === courseId), [cart]);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleBookmark = useCallback((courseId: string) => {
    setBookmarks(prev => prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]);
  }, []);

  const isBookmarked = useCallback((courseId: string) => bookmarks.includes(courseId), [bookmarks]);

  const generateCertificate = useCallback((courseId: string) => {
    const certId = `SN-${Date.now().toString(36).toUpperCase()}-${courseId.slice(0, 4).toUpperCase()}`;
    setEnrolledCourses(prev => prev.map(c =>
      c.courseId === courseId ? { ...c, certificateGenerated: true, certificateId: certId } : c
    ));
    return certId;
  }, []);

  const getCertificateId = useCallback((courseId: string) => {
    return enrolledCourses.find(c => c.courseId === courseId)?.certificateId;
  }, [enrolledCourses]);

  const hasCertificate = useCallback((courseId: string) => {
    return enrolledCourses.find(c => c.courseId === courseId)?.certificateGenerated ?? false;
  }, [enrolledCourses]);

  return (
    <LearningContext.Provider value={{
      enrolledCourses, cart, bookmarks,
      isEnrolled, enroll, completeLesson, getProgress, getCompletedLessons,
      addToCart, removeFromCart, isInCart, clearCart,
      toggleBookmark, isBookmarked,
      generateCertificate, getCertificateId, hasCertificate,
    }}>
      {children}
    </LearningContext.Provider>
  );
};
