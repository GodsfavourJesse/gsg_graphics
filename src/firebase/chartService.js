import { collection, addDoc, getDocs, doc, getDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "./config";

// Save a chart to Firestore (adds a server timestamp)
export const saveChart = async (chartData) => {
    try {
        const payload = {
            ...chartData,
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, "charts"), payload);
        console.log("Chart saved with ID", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding chart", e);
        throw e;
    }
};

// Get all charts
export const getCharts = async () => {
    const chartsCollection = collection(db, "charts");
    const chartSnapshot = await getDocs(chartsCollection);
    return chartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete chart
export const deleteChart = async (chartId) => {
    await deleteDoc(doc(db, "charts", chartId));
};


// Get a single chart by ID
export const getChartById = async (id) => {
    const docRef = doc(db, "charts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        return null;
    }
};
