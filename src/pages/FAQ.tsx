import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How do I enroll in a free course?", a: "Simply click on any free course, then click 'Enroll Now'. The course will immediately appear in your My Learning dashboard." },
  { q: "How do I unlock premium courses?", a: "Add the premium course to your cart and complete the checkout process (₹49 per course). Once payment is confirmed, the course is unlocked for lifetime access." },
  { q: "How are certificates generated?", a: "After completing 100% of a course's lessons, go to My Learning and click 'Get Cert'. Enter your name and a unique certificate with a serial number will be generated." },
  { q: "Can I download study notes?", a: "Yes! Visit the Notes section to view and download study materials in Markdown format for all major courses." },
  { q: "Is my progress saved?", a: "Yes, your progress is tracked in real-time. You can resume any course from where you left off via the My Learning dashboard." },
  { q: "What payment methods are supported?", a: "Currently we support simulated checkout for demo purposes. Razorpay integration is planned for production." },
  { q: "Can I bookmark courses for later?", a: "Absolutely! Click the bookmark icon on any course card to save it. Access your bookmarks from the My Learning section." },
  { q: "How does the AI Assistant work?", a: "The AI Assistant helps answer engineering and course-related questions. Click the chat icon in the bottom-right corner to start a conversation." },
];

const FAQ = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="font-display text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h1>
    <p className="text-muted-foreground mb-8">Everything you need to know about SkillNest</p>
    <Accordion type="single" collapsible className="space-y-2">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl bg-card border border-border/60 px-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground pb-4">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQ;
