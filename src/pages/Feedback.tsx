import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !rating || !message) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Thank you for your feedback!");
    setName(""); setEmail(""); setRating(0); setMessage("");
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
        <Button type="submit" className="w-full gradient-bg text-primary-foreground font-semibold">
          <Send className="w-4 h-4 mr-2" /> Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
