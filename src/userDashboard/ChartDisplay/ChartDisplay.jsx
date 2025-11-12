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

    // ✅ Define watermark plugin
    const watermarkPlugin = {
        id: 'watermark',
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const { width, height } = chart;
            ctx.save();
            ctx.font = 'bold 36px Poppins';
            ctx.fillStyle = 'rgba(79, 70, 229, 0.08)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Rotate the text diagonally across the canvas
            ctx.translate(width / 2, height / 2);
            ctx.rotate(-Math.PI / 4);

            // Repeat watermark across chart area
            const text = 'Made by GSQ Graphics';
            for (let y = -height; y < height; y += 250) {
                for (let x = -width; x < width; x += 500) {
                    ctx.fillText(text, x, y);
                }
            }

            ctx.restore();
        }
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Data',
                data: dataValues,
                backgroundColor: [
                    '#4e79a7', '#f28e2b', '#e15759',
                    '#76b7b2', '#59a14f', '#edc949', '#af7aa1'
                ],
                borderColor: '#333',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Statistical Chart' },
            watermarkPlugin, // keep for later clarity
        },
    };

    // ✅ Export functions (watermark already visible)
    const exportPNG = async () => {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const exportPDF = async () => {
        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('chart.pdf');
    };

    const chartProps = {
        data: chartData,
        options: chartOptions,
        plugins: [watermarkPlugin], // 👈 attach watermark plugin here
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar': return <Bar key="bar" {...chartProps} />;
            case 'line': return <Line key="line" {...chartProps} />;
            case 'pie': return <Pie key="pie" {...chartProps} />;
            case 'doughnut': return <Doughnut key="doughnut" {...chartProps} />;
            default: return <Bar key="default" {...chartProps} />;
        }
    };

    return (
        <div className="chart-display-container">
            <div ref={chartRef} className="chart-wrapper">
                {renderChart()}
            </div>

            <div className="export-buttons">
                <button onClick={exportPNG}>Export as PNG</button>
                <button onClick={exportPDF}>Export as PDF</button>
            </div>
        </div>
    );
}
