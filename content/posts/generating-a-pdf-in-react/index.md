---
title: "Generating a PDF in React"
date: 2025-03-31T19:27:05-04:00
draft: true
categories: ["tutorial"]
tags: ["react"]
# hiddenInHomeList: true
---

Below is a minimal approach to generating PDFs in React applications:

## 1. A Hidden PDF Component

```typescript {linenos=true}
import React from "react";
import { format } from "date-fns";

interface PDFReportProps {
  reportDate: Date;
  totalItems: number;
}

const PDFReport = React.forwardRef<HTMLDivElement, PDFReportProps>(
  (props, ref) => {
    const { reportDate, totalItems } = props;
    
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
        }}
      >
        <h1>Report - {format(reportDate, "MMMM yyyy")}</h1>
        {totalItems > 0 ? (
          <p>Your main PDF content goes here.</p>
        ) : (
          <p>No data available this month.</p>
        )}
      </div>
    );
  }
);

PDFReport.displayName = "PDFReport";
export default PDFReport;
```

1. We use React.forwardRef so that this component's DOM node is accessible elsewhere.
2. Position it off-screen (top: -9999px) so it never appears in the rendered UI.

## 2. A Button & Utility to Generate the PDF

```typescript {linenos=true, hl_lines=["13-15", "18"]}
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PDFGeneratorProps {
  onGenerate: () => void;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ onGenerate }) => (
  <button onClick={onGenerate}>Download PDF</button>
);

export default PDFGenerator;

export const generatePDF = async (
  reportRef: React.RefObject<HTMLDivElement>,
  reportTitle: string
): Promise<void> => {
  if (!reportRef.current) return;
  
  try {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const imgPdfWidth = imgWidth * ratio;
    const imgPdfHeight = imgHeight * ratio;
    const xOffset = (pdfWidth - imgPdfWidth) / 2;
    
    pdf.addImage(imgData, "PNG", xOffset, 0, imgPdfWidth, imgPdfHeight);
    pdf.save(`${reportTitle}.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};
```

**Key Points:**
- PDFGenerator is a simple button that triggers the parent's onGenerate.
- generatePDF uses html2canvas to capture the off-screen component, then jsPDF to create and download the PDF.

## 3. Using Them in a Generic Parent Component

```typescript {linenos=true, linenostart=1}
import React, { useRef, useState } from "react";
import PDFGenerator, { generatePDF } from "./PDFGenerator";
import PDFReport from "./PDFReport";

function App() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<number>(5);
  
  const handleGeneratePDF = () => {
    const title = "My-Generic-Report";
    generatePDF(pdfRef, title);
  };
  
  return (
    <div>
      <h1>Generic React App</h1>
      <p>You have {items} items for this month.</p>
      
      <PDFGenerator onGenerate={handleGeneratePDF} />
      
      {/* Hidden PDFReport component */}
      <PDFReport ref={pdfRef} reportDate={new Date()} totalItems={items} />
    </div>
  );
}

export default App;
```

That's it! Now, clicking the "Download PDF" button captures and converts the hidden PDFReport into a PDF.

---

## Summary

With a little CSS positioning and the help of html2canvas + jsPDF, you can easily generate PDFs in a generic React application. This approach uses an off-screen component to define the PDF content, then captures it as an image and converts it to a PDF document that users can download.