import { Trophy, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";

const leaderboardData = [
  { rank: 1, name: "Aarav Mehta", courses: 8, certificates: 7, points: 2400 },
  { rank: 2, name: "Ishita Gupta", courses: 7, certificates: 6, points: 2100 },
  { rank: 3, name: "Rohan Das", courses: 6, certificates: 6, points: 1950 },
  { rank: 4, name: "Priya Nair", courses: 6, certificates: 5, points: 1800 },
  { rank: 5, name: "Karthik Reddy", courses: 5, certificates: 5, points: 1650 },
  { rank: 6, name: "Ananya Sharma", courses: 5, certificates: 4, points: 1500 },
  { rank: 7, name: "Vikram Joshi", courses: 4, certificates: 4, points: 1350 },
  { rank: 8, name: "Sneha Patil", courses: 4, certificates: 3, points: 1200 },
  { rank: 9, name: "Arjun Kumar", courses: 3, certificates: 3, points: 1050 },
  { rank: 10, name: "Megha Singh", courses: 3, certificates: 2, points: 900 },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-accent" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
  if (rank === 3) return <Award className="w-5 h-5 text-accent/70" />;
  return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-muted-foreground">{rank}</span>;
};

const Leaderboard = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="font-display text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
    <p className="text-muted-foreground mb-8">Top learners on SkillNest</p>

    <div className="space-y-2">
      {leaderboardData.map((user, i) => (
        <motion.div
          key={user.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex items-center gap-4 p-4 rounded-2xl border border-border/60 ${
            user.rank <= 3 ? "bg-primary/5" : "bg-card"
          }`}
          style={{ boxShadow: user.rank <= 3 ? "var(--shadow-hover)" : "var(--shadow-card)" }}
        >
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
            {getRankIcon(user.rank)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.courses} courses • {user.certificates} certificates</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-foreground">{user.points.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Leaderboard;
