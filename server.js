const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for our chart
const generateChartData = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = labels.map(() => Math.floor(Math.random() * 1000));
    
    return {
        labels,
        datasets: [
            {
                label: 'Sales 2023',
                data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };
};

// API endpoint for chart data
app.get('/api/chart-data', (req, res) => {
    try {
        const chartData = generateChartData();
        res.json(chartData);
    } catch (error) {
        console.error('Error generating chart data:', error);
        res.status(500).json({ error: 'Failed to generate chart data' });
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});