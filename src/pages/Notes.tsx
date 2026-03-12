import { notes } from "@/data/courses";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Notes = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Study Notes</h1>
      <p className="text-muted-foreground mb-8">Download study materials and cheat sheets</p>

      <div className="space-y-3">
        {notes.map((note, i) => (
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
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{note.title}</p>
              <p className="text-xs text-muted-foreground">{note.description}</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs shrink-0">
              <Download className="w-3 h-3 mr-1" /> Download
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
