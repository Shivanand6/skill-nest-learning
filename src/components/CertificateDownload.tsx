import { jsPDF } from "jspdf";
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
  const date =
    completionDate ||
    new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const downloadPdf = async () => {
    toast.info("Generating PDF...");

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const centerX = pageWidth / 2;

      pdf.setFillColor(248, 249, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setDrawColor(124, 58, 237);
      pdf.setLineWidth(1.2);
      pdf.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 4, 4, "S");

      pdf.setDrawColor(196, 181, 253);
      pdf.setLineWidth(0.4);
      pdf.roundedRect(14, 14, pageWidth - 28, pageHeight - 28, 3, 3, "S");

      pdf.setFillColor(124, 58, 237);
      pdf.roundedRect(centerX - 11, 22, 22, 22, 3, 3, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("S", centerX, 35, { align: "center" });

      pdf.setTextColor(26, 26, 46);
      pdf.setFontSize(24);
      pdf.text("SkillNest", centerX, 52, { align: "center" });

      pdf.setTextColor(120, 120, 140);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text("LEARN • BUILD • ACHIEVE", centerX, 60, { align: "center" });

      pdf.setTextColor(90, 90, 110);
      pdf.setFontSize(11);
      pdf.text("CERTIFICATE OF COMPLETION", centerX, 76, { align: "center" });

      pdf.setTextColor(120, 120, 140);
      pdf.setFontSize(11);
      pdf.text("This is to certify that", centerX, 92, { align: "center" });

      pdf.setTextColor(124, 58, 237);
      pdf.setFont("times", "bold");
      pdf.setFontSize(28);
      pdf.text(studentName || "Student", centerX, 108, { align: "center" });
      pdf.setDrawColor(196, 181, 253);
      pdf.line(centerX - 42, 112, centerX + 42, 112);

      pdf.setTextColor(120, 120, 140);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.text("has successfully completed the course", centerX, 126, { align: "center" });

      pdf.setTextColor(26, 26, 46);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      const courseLines = pdf.splitTextToSize(courseName, 180);
      pdf.text(courseLines, centerX, 140, { align: "center" });

      const courseBlockHeight = courseLines.length * 7;
      const metaY = 140 + courseBlockHeight + 10;

      pdf.setTextColor(110, 110, 130);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Completed on: ${date}`, centerX, metaY, { align: "center" });
      pdf.text(`Certificate ID: ${certId}`, centerX, metaY + 8, { align: "center" });

      const signatureY = pageHeight - 32;
      pdf.setDrawColor(196, 181, 253);
      pdf.line(58, signatureY, 108, signatureY);
      pdf.line(pageWidth - 108, signatureY, pageWidth - 58, signatureY);

      pdf.setTextColor(120, 120, 140);
      pdf.setFontSize(10);
      pdf.text("Platform Director", 83, signatureY + 6, { align: "center" });
      pdf.text("Course Instructor", pageWidth - 83, signatureY + 6, { align: "center" });

      pdf.save(`SkillNest-Certificate-${certId}.pdf`);
      toast.success("Certificate downloaded!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <Button size="sm" onClick={downloadPdf} className="gradient-bg text-primary-foreground text-xs">
      <Download className="w-3 h-3 mr-1" /> Download PDF
    </Button>
  );
};

export default CertificateDownload;
