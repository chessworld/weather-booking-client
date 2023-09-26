
export var ChartOptionConfig = {
    plugins: {
        legend: {
            display: false
        },
    },
    
    responsive: true,
    interaction: {
        mode: "index",
        intersect: false
    },
    scales: {
        x: {
            border: {
                display: false
            },
            grid: {
                display: false,
            },
            
        },
        y: {
            border: {
                display: false,
            },
            ticks: {
                stepSize: 3,
            },
            grid: {
                display: false,
            }
        },
    }
}
