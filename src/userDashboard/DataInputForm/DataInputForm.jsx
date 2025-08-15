import React, { useState } from 'react';
import ChartDisplay from '../ChartDisplay/ChartDisplay';
import { saveChart } from '../../firebase/chartService';
import "./DataInputForm.css";

export default function DataInputForm() {
    const [labels, setLabels] = useState("");
    const [values, setValues] = useState("");
    const [chartName, setChartName] = useState("");
    const [chartData, setChartData] = useState(null);

    const handleGenerate = () => {
        if (!labels || !values || !chartName) {
            return alert("Please fill in the fields before generating a chart");
        }

        const labelArray = labels.split(",").map(l => l.trim());
        const valueArray = values.split(",").map(v => Number(v.trim()));
        setChartData({ name: chartName, labels: labelArray, values: valueArray });
    };

    const handleSave = () => {
        if (!chartData) return alert("Generate a chart first!");
        saveChart(chartData);
        alert("Chart saved successfully!");
    };

    return (
        <div className='form-container'>
            <h2>Create a New Chart</h2>

            <div className='form-group'>
                <label>Chart Name:</label>
                <input 
                    type="text"
                    placeholder='Enter chart name'
                    value={chartName}
                    onChange={(e) => setChartName(e.target.value)}
                />
            </div>

            <div className='form-group'>
                <label>Labels (comma seperated):</label>
                <input 
                    type="text"
                    placeholder='Labels (comma separated)'
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)} 
                />
            </div>

            <div className='form-group'>
                <label>Values (comma seperated):</label>
                <input 
                    type="text"
                    placeholder='Labels (comma separated)'
                    value={values}
                    onChange={(e) => setValues(e.target.value)} 
                />
            </div>

            <div className='button-group'>
                <button onClick={handleGenerate} className='generate-btn'>Generate Chart</button>
                <button onClick={handleSave} className='save-btn'>Save Chart</button>
            </div>


            {chartData && (
                <ChartDisplay 
                    labels={chartData.labels}
                    dataValues={chartData.values}
                />
            )}
        </div>

    );
}