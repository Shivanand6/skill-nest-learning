import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Brain, Smile, Frown, Meh, Sparkles, Hash, MessageCircle, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  confidence: number;
  emotions: string[];
  explanation: string;
  keywords: string[];
  tone: string;
  subjectivity: string;
}

const sentimentConfig = {
  positive: { icon: Smile, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", label: "Positive" },
  negative: { icon: Frown, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", label: "Negative" },
  neutral: { icon: Meh, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", label: "Neutral" },
  mixed: { icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30", label: "Mixed" },
};

const sampleTexts = [
  "I absolutely love learning new programming languages! React is amazing and makes building UIs so much fun.",
  "The exam was incredibly difficult and I feel like I failed. I'm so disappointed in myself.",
  "The weather today is 25 degrees Celsius with partly cloudy skies across the region.",
  "While the course content was good, the pacing was too fast and I struggled to keep up with the assignments.",
];

const SentimentAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ text: string; result: SentimentResult }[]>([]);

  const analyze = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("sentiment-analyzer", {
        body: { text: text.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
      setHistory(prev => [{ text: text.trim(), result: data }, ...prev].slice(0, 10));
    } catch (err: any) {
      toast.error(err.message || "Failed to analyze sentiment");
    } finally {
      setLoading(false);
    }
  };

  const config = result ? sentimentConfig[result.sentiment] || sentimentConfig.neutral : null;
  const SentimentIcon = config?.icon || Meh;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Sentiment Analyzer</h1>
          <p className="text-muted-foreground text-sm">Learn how AI detects emotions and tone in text</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 mt-8">
        {/* Input Section */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <label className="text-sm font-medium text-foreground mb-2 block">Enter text to analyze</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste any text here — a review, essay, tweet, comment, or any sentence..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">{text.length} characters</span>
              <Button
                onClick={analyze}
                disabled={loading || !text.trim()}
                className="gradient-bg text-primary-foreground font-semibold"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                {loading ? "Analyzing..." : "Analyze Sentiment"}
              </Button>
            </div>
          </div>

          {/* Sample Texts */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Try a sample:</p>
            <div className="flex flex-wrap gap-2">
              {sampleTexts.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setText(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors truncate max-w-[250px]"
                >
                  {s.slice(0, 50)}...
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && config && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-6 space-y-5"
              >
                {/* Sentiment Badge */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${config.bg} ${config.border} border-2 flex items-center justify-center`}>
                    <SentimentIcon className={`w-8 h-8 ${config.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Detected Sentiment</p>
                    <p className={`font-display text-2xl font-bold ${config.color}`}>{config.label}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="font-display text-2xl font-bold text-foreground">{result.confidence}%</p>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="gradient-bg h-2.5 rounded-full"
                  />
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Emotions */}
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Smile className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">Emotions</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.emotions.map(e => (
                        <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tone */}
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-medium text-foreground">Tone</span>
                    </div>
                    <p className="text-sm text-foreground capitalize">{result.tone}</p>
                  </div>

                  {/* Keywords */}
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-accent" />
                      <span className="text-xs font-medium text-foreground">Key Words</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.keywords.map(k => (
                        <span key={k} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subjectivity */}
                  <div className="bg-card rounded-xl p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-foreground">Subjectivity</span>
                    </div>
                    <p className="text-sm text-foreground capitalize">{result.subjectivity}</p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-card rounded-xl p-4 border border-border/50">
                  <p className="text-xs font-medium text-foreground mb-1">AI Explanation</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Analysis History</h3>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Your analysis history will appear here
              </p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {history.map((h, i) => {
                  const hConfig = sentimentConfig[h.result.sentiment] || sentimentConfig.neutral;
                  const HIcon = hConfig.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => { setText(h.text); setResult(h.result); }}
                      className="w-full text-left bg-card rounded-xl p-3 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <HIcon className={`w-3.5 h-3.5 ${hConfig.color}`} />
                        <span className={`text-xs font-medium ${hConfig.color}`}>{hConfig.label}</span>
                        <span className="text-[10px] text-muted-foreground ml-auto">{h.result.confidence}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{h.text}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Learn More */}
          <div className="glass-card rounded-2xl p-5 mt-4">
            <h3 className="font-display font-semibold text-foreground mb-3">📚 What is Sentiment Analysis?</h3>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Sentiment analysis</strong> is a Natural Language Processing (NLP) technique
                that identifies the emotional tone behind text.
              </p>
              <p>It's used in social media monitoring, customer feedback analysis, brand reputation management, and market research.</p>
              <p>This tool uses AI to detect <strong className="text-foreground">sentiment, emotions, tone, key words,</strong> and <strong className="text-foreground">subjectivity</strong> — helping you understand how text communicates feelings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
