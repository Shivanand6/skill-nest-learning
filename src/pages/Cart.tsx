import { courses } from "@/data/courses";
import { useLearning } from "@/context/LearningContext";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, clearCart, enroll } = useLearning();
  const cartCourses = cart.map(c => courses.find(co => co.id === c.courseId)!).filter(Boolean);
  const total = cartCourses.reduce((sum, c) => sum + c.price, 0);

  const handleCheckout = () => {
    // Simulate payment
    cartCourses.forEach(c => enroll(c.id));
    clearCart();
    toast.success("Payment successful! Courses unlocked.");
  };

  if (cartCourses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Browse premium courses to add them here.</p>
        <Link to="/courses"><Button className="gradient-bg text-primary-foreground">Browse Courses</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
      <div className="space-y-3 mb-6">
        {cartCourses.map(c => (
          <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60">
            <img src={c.thumbnail} alt={c.title} className="w-20 h-14 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.instructor}</p>
            </div>
            <p className="font-display font-bold text-foreground">₹{c.price}</p>
            <button onClick={() => removeFromCart(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex justify-between text-foreground font-display">
          <span className="font-medium">Total</span>
          <span className="text-2xl font-bold">₹{total}</span>
        </div>
        <Button onClick={handleCheckout} className="w-full gradient-bg text-primary-foreground font-semibold" size="lg">
          Checkout — Pay ₹{total}
        </Button>
        <p className="text-xs text-center text-muted-foreground">Payment simulation for demo purposes</p>
      </div>
    </div>
  );
};

export default Cart;
