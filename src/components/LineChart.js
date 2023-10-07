import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const LineGraph = ({ data }) => {
    const chartRef = useRef(null);

    const getData = [
        {
            name: "2015",
            pv: (data.find((x) => x.data_year === 2015) ? data.find((x) => x.data_year === 2015).Burglary : 0),
        },
        {
            name: "2016",
            pv: (data.find((x) => x.data_year === 2016) ? data.find((x) => x.data_year === 2016).Burglary : 0),
        },
        {
            name: "2017",
            pv: (data.find((x) => x.data_year === 2017) ? data.find((x) => x.data_year === 2017).Burglary : 0),
        },
        {
            name: "2018",
            pv: (data.find((x) => x.data_year === 2018) ? data.find((x) => x.data_year === 2018).Burglary : 0),
        },
        {
            name: "2019",
            pv: (data.find((x) => x.data_year === 2019) ? data.find((x) => x.data_year === 2019).Burglary : 0),
        },
        {
            name: "2020",
            pv: (data.find((x) => x.data_year === 2020) ? data.find((x) => x.data_year === 2020).Burglary : 0),
        },
    ];

    const handleExportToPDF = () => {
        html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
    
        const pdf = new jsPDF("landscape");
    
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
    
        pdf.setFontSize(16);
        const headerText = "Burglary Arrests Statistics Report";
        const headerWidth = pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize();
        const headerX = (pageWidth - headerWidth) / 2;
        pdf.text(headerText, headerX, 15);
    
        pdf.setFillColor("#1463FF");
        pdf.setLineWidth(1);
        pdf.line(10, 30, pageWidth - 10, 30);
    
        const chartX = (pageWidth - 260) / 2;
        pdf.addImage(imgData, "PNG", chartX, 40, 260, 100);
    
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(12);
            pdf.text(`Page ${i} of ${pageCount}`, pageWidth - 50, pageHeight - 10);
        }
    
        const pdfBlob = pdf.output("blob");
    
        const pdfUrl = URL.createObjectURL(pdfBlob);
    
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "arrests.pdf";
        a.click();
    
        URL.revokeObjectURL(pdfUrl);
        });
    };
      


  return (
        <div>
            <button onClick={handleExportToPDF}>Export to PDF</button>
            <div ref={chartRef} style={{ height: "350px", marginTop: "100px" }}>
                <ResponsiveContainer>
                    <LineChart data={getData} width={400} height={400} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid stroke="#BAC2DB" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/* <Tooltip content={CustomTooltip} /> */}
                        <Line dataKey="pv" stroke="#1463FF" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
  );
};
export default LineGraph;
