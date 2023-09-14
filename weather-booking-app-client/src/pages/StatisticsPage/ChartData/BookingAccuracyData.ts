
export const BookingAccuracyData = {
    labels: ["Successfull", "Failed", "Pending"],
    datasets: [
        {
            label: "Result",
            data: [
                0,
                0,
                0
            ],
            backgroundColor: [
                "#9BCB3C",
                "#CF3333",
                "#FFB03B"
            ],
            hoverOffset: 4
        }
    ],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right"
            }
        }
    }
}