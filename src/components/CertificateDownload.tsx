import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CertificateDownloadProps {
  courseName: string;
  studentName: string;
  certId: string;
  completionDate?: string;
}

const CertificateDownload = ({ courseName, studentName, certId, completionDate }: CertificateDownloadProps) => {
  const certRef = useRef<HTMLDivElement>(null);

  const downloadPdf = async () => {
    if (!certRef.current) return;
    toast.info("Generating PDF...");
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff" });
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = 297;
      const pdfHeight = 210;
      const imgRatio = canvas.width / canvas.height;
      let imgWidth = pdfWidth - 20;
      let imgHeight = imgWidth / imgRatio;
      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = imgHeight * imgRatio;
      }
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = (pdfHeight - imgHeight) / 2;
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
      pdf.save(`SkillNest-Certificate-${certId}.pdf`);
      toast.success("Certificate downloaded!");
    } catch (err) {
      toast.error("Failed to generate PDF");
      console.error(err);
    }
  };

  const date = completionDate || new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      {/* Hidden certificate for rendering */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div
          ref={certRef}
          style={{
            width: 900,
            height: 636,
            padding: 48,
            background: "linear-gradient(135deg, #f8f9ff, #fff, #f0f4ff)",
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Border decoration */}
          <div style={{
            position: "absolute", inset: 16, border: "3px solid #7c3aed", borderRadius: 16,
            background: "transparent"
          }} />
          <div style={{
            position: "absolute", inset: 22, border: "1px solid #c4b5fd", borderRadius: 12,
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: 32 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: 24, fontWeight: 700,
              }}>S</div>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#1a1a2e" }}>SkillNest</span>
            </div>
            <p style={{ fontSize: 12, color: "#888", letterSpacing: 4, textTransform: "uppercase", marginBottom: 32 }}>Learn • Build • Achieve</p>

            <p style={{ fontSize: 14, color: "#666", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Certificate of Completion</p>

            <p style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>This is to certify that</p>
            <p style={{
              fontSize: 36, fontWeight: 700, color: "#7c3aed", marginBottom: 8,
              borderBottom: "2px solid #c4b5fd", display: "inline-block", paddingBottom: 4, paddingLeft: 24, paddingRight: 24,
            }}>{studentName}</p>

            <p style={{ fontSize: 14, color: "#888", marginTop: 16, marginBottom: 4 }}>has successfully completed the course</p>
            <p style={{ fontSize: 22, fontWeight: 600, color: "#1a1a2e", marginBottom: 24 }}>{courseName}</p>

            <p style={{ fontSize: 13, color: "#888" }}>Completed on: {date}</p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>Certificate ID: {certId}</p>

            <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 80 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderTop: "2px solid #c4b5fd", width: 150, marginBottom: 4 }} />
                <p style={{ fontSize: 12, color: "#888" }}>Platform Director</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ borderTop: "2px solid #c4b5fd", width: 150, marginBottom: 4 }} />
                <p style={{ fontSize: 12, color: "#888" }}>Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button size="sm" onClick={downloadPdf} className="gradient-bg text-primary-foreground text-xs">
        <Download className="w-3 h-3 mr-1" /> Download PDF
      </Button>
    </div>
  );
};

export default CertificateDownload;
