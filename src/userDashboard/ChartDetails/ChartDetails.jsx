import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChartById } from "../../firebase/chartService";
import ChartDisplay from "../ChartDisplay/ChartDisplay";
import { FiArrowLeft } from "react-icons/fi";
import "./ChartDetails.css";

export default function ChartDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchChart = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getChartById(id);
                if (!data) {
                    if (mounted) setError("Chart not found.");
                    return;
                }

                // Normalize createdAt: Firestore Timestamp -> JS Date
                let createdAt = null;
                if (data.createdAt) {
                    // Firestore Timestamp has toDate()
                    if (typeof data.createdAt.toDate === "function") {
                        createdAt = data.createdAt.toDate();
                    } else {
                        // fallback for strings / numbers
                        createdAt = new Date(data.createdAt);
                    }
                }

                if (mounted) setChart({ ...data, createdAt });
            } catch (err) {
                console.error("Failed to fetch chart:", err);
                if (mounted) setError("Failed to load chart. Check console for details.");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchChart();

        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) return <div className="cd-loading">Loading chart…</div>;
    if (error) return <div className="cd-error">{error}</div>;

    return (
        <div className="chart-details-page">
            <div className="cd-topbar">
                <button 
                    className="cd-back" 
                    onClick={() => navigate(-1)}
                >
                    <FiArrowLeft size={18} style={{ marginRight: 8 }} /> Back
                </button>
            </div>

            <div className="cd-card">
                <header className="cd-header">
                    <div>
                        <h1 className="cd-title">{chart.name || "Untitled Chart"}</h1>
                        <p className="cd-sub">
                            {chart.createdAt ? chart.createdAt.toLocaleString() : "Unknown date"} •
                            &nbsp;{chart.labels?.length ?? 0} labels
                        </p>
                    </div>
                {/* future: action buttons (edit, export, delete) */}
                </header>

                <section className="cd-chart">
                    <ChartDisplay 
                        labels={chart.labels || []} 
                        dataValues={chart.values || []} 
                    />
                </section>
            </div>
        </div>
    );
}
