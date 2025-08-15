import React, { useRef, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    Chart,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ChartDisplay.css';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
);


export default function ChartDisplay({ labels, dataValues}) {
    const chartRef = useRef(null);
    const [chartType, setChartType] = useState("bar") //default

    const chartData = {
        labels,
        datasets: [
            {
                labels: "Data",
                data: dataValues,
                backgroundColor: [
                    "#4e79a7",
                    "#f28e2b",
                    "#e15759",
                    "#76b7b2",
                    "#59a14f",
                    "#edc949",
                    "#af7aa1"
                ],
                borderColor: "#333",
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, //Flexible height scaling
        plugins: { 
            legend: { 
                position: "top", 
                labels: {
                    boxWidth: 12, //Smaller legend icons for mobile
                    font: { size: 12 },
                    padding: 10,
                    usePointStyle: true,
                    // Force multi-line when space is small
                    generateLabels: (chart) => {
                        const original = ChartJS.overrides.doughnut.plugins.legend.labels.generateLabels;
                        const labels = original(chart);
                        return labels.map(label => ({
                            ...label,
                            text: label.text.length > 15 ? label.text.match(/.{1,15}/g).join("\n") : label.text
                        }))
                    }
                }
            },
            title: { 
                display: true, 
                text: "Statistical Chart",
                font: { size: 16 }
            }
        },
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }
        },
        scales: {
            x: {
                ticks: {
                    font: { size: 12 },
                    maxRotation: 45, // Prevents overlap on small screens
                    minRotation: 0
                }
            },
            y: {
                ticks: {
                    font: { size: 12 }
                }
            }
        }
    };


    // Export to PNG
    const exportPNG = async () => {
        const canvas = await html2canvas(chartRef.current);
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    // Export to PDF
    const exportPDF = async () => {
        const canvas = await html2canvas(chartRef.current);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("chart.pdf");
    };

    // Decide which chart to render
    const renderChart = () => {
        const chartProps = { data: chartData, options: chartOptions };
        switch (chartType) {
            case "bar":
                return <Bar key={chartType} {...chartProps} />;
            case "line":
                return <Line key={chartType} {...chartProps} />;
            case "pie":
                return <Pie key={chartType} {...chartProps} />;
            default:
                return <Bar key={chartType} {...chartProps} />;
        }
    }


    return (
        <div className='chart-display-container'>
            {/* Chart Type Selector */}
            <div className='chart-controls'>
                <label>Choose Chart Type:</label>
                <select 
                    value={chartType} 
                    onChange={(e) => setChartType(e.target.value)}
                >
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                </select>
            </div>

            {/* Chart Container */}
            <div ref={chartRef} className='chart-wrapper'>
                {renderChart()}
            </div>

            {/* Export Buttons */}
            <div className='export-buttons'>
                <button onClick={exportPNG}>
                    Export as PNG
                </button>
                <button onClick={exportPDF}>
                    Export as PDF
                </button>
            </div>
        </div>
    );
}
