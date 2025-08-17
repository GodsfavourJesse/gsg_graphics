import React, { useEffect, useState } from 'react';
import { getCharts, deleteChart } from '../../firebase/chartService';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChartPie, FaTags, FaTrash } from 'react-icons/fa';
import './SavedCharts.css';

export default function SavedCharts() {
    const [charts, setCharts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCharts();
            setCharts(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (e, chartId) => {
        e.stopPropagation(); //Prevent navigating to chart detail
        if (window.confirm("Are you sure you want to delete this chart")) {
            await deleteChart(chartId);
            setCharts(prevCharts => prevCharts.filter(c => c.id !== chartId));
        }
    }

    return (
        <div className='saved-charts-container'>
            <div className='saved-charts-header'>
                <h2>Saved Charts</h2>
                <p className='subtitle'>Your personal chart library</p>
            </div>

            {charts.length > 0 ? (
                <div className='chart-list'>
                    {charts.map((chart) => (
                        <div
                            key={chart.id}
                            className="chart-card"
                            onClick={() => navigate(`/dashboard/chart-display/${chart.id}`)}
                        >
                            <div className="chart-card-header">
                                <div className="chart-icon-wrap">
                                    <FaChartPie className="chart-icon" />
                                </div>
                                <div className="chart-title-wrap">
                                    <h3>{chart.name || 'Untitled Chart'}</h3>
                                    <p className="chart-sub">
                                        Click to view details
                                    </p>
                                </div>
                                <FaTrash
                                    className='delete-icon'
                                    onClick={(e) => handleDelete(e, chart.id)}
                                />
                            </div>

                            <div className="chart-meta">
                                <span>
                                    <FaCalendarAlt />{" "}
                                    {chart.createdAt
                                        ? new Date(chart.createdAt.toDate ? chart.createdAt.toDate() : chart.createdAt).toDateString()
                                        : "Unknown date"}
                                </span>
                                <span>
                                    <FaTags /> {chart.labels?.length ?? 0} labels
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No charts saved yet.</p>
            )}
        </div>
    )
}