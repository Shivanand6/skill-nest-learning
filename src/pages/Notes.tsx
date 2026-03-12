import { useState } from "react";
import { notes, courses } from "@/data/courses";
import { FileText, Download, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const Notes = () => {
  const [viewingNote, setViewingNote] = useState<string | null>(null);
  const activeNote = notes.find(n => n.id === viewingNote);

  const downloadNote = (note: typeof notes[0]) => {
    const blob = new Blob([note.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Study Notes</h1>
      <p className="text-muted-foreground mb-8">Download study materials and cheat sheets</p>

      <div className="space-y-3">
        {notes.map((note, i) => {
          const relatedCourse = courses.find(c => c.id === note.courseId);
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{note.title}</p>
                <p className="text-xs text-muted-foreground">{note.description}</p>
                {relatedCourse && (
                  <p className="text-xs text-primary mt-0.5">Related: {relatedCourse.title}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setViewingNote(note.id)}>
                  <Eye className="w-3 h-3 mr-1" /> View
                </Button>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => downloadNote(note)}>
                  <Download className="w-3 h-3 mr-1" /> Download
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note Viewer Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4"
            onClick={() => setViewingNote(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-display font-semibold text-foreground">{activeNote.title}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadNote(activeNote)}>
                    <Download className="w-3 h-3 mr-1" /> Download
                  </Button>
                  <button onClick={() => setViewingNote(null)} className="p-1.5 rounded-lg hover:bg-muted">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{activeNote.content}</ReactMarkdown>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
