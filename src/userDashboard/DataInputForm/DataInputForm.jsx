"use client";
import React, { useState, useEffect } from "react";
import ChartDisplay from "../ChartDisplay/ChartDisplay";
import { BarChart2, Save, LineChart, PieChart, Loader2, X } from "lucide-react";
import "./DataInputForm.css";
import { div } from "framer-motion/client";

export default function DataInputForm() {
    const [chartName, setChartName] = useState("");
    const [labels, setLabels] = useState("");
    const [values, setValues] = useState("");
    const [chartType, setChartType] = useState("bar");
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleGenerate = () => {
        if (!labels || !values || !chartName) {
            alert("Please fill in all fields before generating a chart!");
            return;
        }

        const labelArray = labels.split(",").map((l) => l.trim());
        const valueArray = values.split(",").map((v) => Number(v.trim()));

        if (labelArray.length !== valueArray.length) {
            alert("Number of labels and values must match!");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setChartData({ name: chartName, labels: labelArray, values: valueArray, type: chartType });
            setLoading(false);
            setShowOverlay(true);
        }, 2500 + Math.random() * 2000)
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    }

    return (
        <div className="chart-page-container">
            <header className="chart-header">
                <h2><BarChart2 size={26} /> Create a New Chart</h2>
            </header>

            <div className="chart-form">
                {/* Inputs */}
                <div className="input-group">
                    <label>Chart Name</label>
                    <input type="text" placeholder="Enter chart name" value={chartName} onChange={(e) => setChartName(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>Labels (comma separated)</label>
                    <input type="text" placeholder="e.g. Jan, Feb, Mar" value={labels} onChange={(e) => setLabels(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>Values (comma separated)</label>
                    <input type="text" placeholder="e.g. 10, 20, 30" value={values} onChange={(e) => setValues(e.target.value)} />
                </div>

                {/* Chart Type Buttons */}
                <div className="chart-type-selector">
                    <label>Select Chart Type</label>
                    <div className="chart-type-options">
                        <button 
                            className={chartType === "bar" ? "active" : ""} 
                            onClick={() => setChartType("bar")}
                        >
                            <BarChart2 size={18} /> Bar
                        </button>
                        <button 
                            className={chartType === "line" ? "active" : ""} 
                            onClick={() => setChartType("line")}
                        >
                            <LineChart size={18} /> Line
                        </button>
                        <button 
                            className={chartType === "pie" ? "active" : ""} 
                            onClick={() => setChartType("pie")}
                        >
                            <PieChart size={18} /> Pie
                        </button>
                        <button 
                            className={chartType === "doughnut" ? "active" : ""} 
                            onClick={() => setChartType("doughnut")}
                        >
                            🍩 Doughnut
                        </button>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="button-group">
                    <button onClick={handleGenerate} className="generate-btn">
                        <LineChart size={18} /> Generate {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
                    </button>
                </div>
            </div>
            
            {/* SPinner Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <Loader2 size={60} className="spin" />
                    <p>Generating chart...</p>
                </div>
            )}


            {/* Render Chart Only When Generated */}
            {showOverlay && chartData && (
                <div className="chart-preview">
                    <button className="close-btn" onClick={closeOverlay}>
                        <X size={26} />
                    </button>
                    <div className="chart-container">
                        <ChartDisplay
                            labels={chartData.labels}
                            dataValues={chartData.values}
                            chartType={chartData.type}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
