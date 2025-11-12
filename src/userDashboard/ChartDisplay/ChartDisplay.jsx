import React, { useRef } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale,
    BarElement, LineElement, PointElement
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ChartDisplay.css';

ChartJS.register(
    Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale,
    BarElement, LineElement, PointElement
);

export default function ChartDisplay({ labels, dataValues, chartType }) {
    const chartRef = useRef(null);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Data",
                data: dataValues,
                backgroundColor: [
                    "#4e79a7", "#f28e2b", "#e15759",
                    "#76b7b2", "#59a14f", "#edc949", "#af7aa1"
                ],
                borderColor: "#333",
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Statistical Chart" }
        }
    };

    // 🧊 Add watermark to captured canvas
    const addWatermark = (canvas) => {
        const ctx = canvas.getContext("2d");
        const text = "Made by GSQ Graphics";

        ctx.font = "bold 48px Poppins";
        ctx.fillStyle = "rgba(79, 70, 229, 0.15)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Move and rotate canvas context
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-Math.PI / 4); // 45° diagonal

        // Draw the watermark multiple times across the image
        for (let y = -canvas.height; y < canvas.height; y += 300) {
            for (let x = -canvas.width; x < canvas.width; x += 600) {
                ctx.fillText(text, x, y);
            }
        }

        ctx.restore();
    };

    const exportPNG = async () => {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        addWatermark(canvas);
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const exportPDF = async () => {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        addWatermark(canvas);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("chart.pdf");
    };

    const renderChart = () => {
        const chartProps = { data: chartData, options: chartOptions };
        switch (chartType) {
            case "bar": return <Bar key="bar" {...chartProps} />;
            case "line": return <Line key="line" {...chartProps} />;
            case "pie": return <Pie key="pie" {...chartProps} />;
            case "doughnut": return <Doughnut key="doughnut" {...chartProps} />;
            default: return <Bar key="default" {...chartProps} />;
        }
    };

    return (
        <div className='chart-display-container'>
            <div ref={chartRef} className='chart-wrapper'>
                {renderChart()}
            </div>

            <div className='export-buttons'>
                <button onClick={exportPNG}>Export as PNG</button>
                <button onClick={exportPDF}>Export as PDF</button>
            </div>
        </div>
    );
}
