import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const Feedback = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating || !message) {
      toast.error("Please fill all fields");
      return;
    }
    if (!user) {
      toast.error("Please sign in to submit feedback");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("feedback").insert({
      name, email, rating, message, user_id: user.id,
    });
    if (error) {
      toast.error("Failed to submit feedback");
    } else {
      toast.success("Thank you for your feedback!");
      setName(""); setEmail(""); setRating(0); setMessage("");
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Feedback</h1>
      <p className="text-muted-foreground mb-8">We'd love to hear from you</p>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Rating</label>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(s => (
              <button key={s} type="button" onClick={() => setRating(s)}>
                <Star className={`w-6 h-6 transition-colors ${s <= rating ? "fill-accent text-accent" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
          <textarea
            value={message} onChange={e => setMessage(e.target.value)} rows={4}
            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="Share your experience..."
          />
        </div>
        <Button type="submit" disabled={submitting} className="w-full gradient-bg text-primary-foreground font-semibold">
          <Send className="w-4 h-4 mr-2" /> {submitting ? "Submitting..." : "Submit Feedback"}
        </Button>
        {!user && <p className="text-xs text-muted-foreground text-center">Please sign in to submit feedback</p>}
      </form>
    </div>
  );
};

export default Feedback;
