import { StatsResponse } from "../../../endpoint-caller/interfaces/bookings/StatsResponse";

export interface dataField {
    labels: string[],
    datasets: 
        {
            label: string,
            data: number[],
            backgroundColor: string,
            stack: string
        }[]
}

export interface dataInput{
    dataName: string
    dataLabel: string[]
    dataCount: number[]
}

export class StackedBarChartData {
    data: dataField;
    option;
    selectedData: string;
    constructor() {
        this.selectedData = ""
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 20, 15, 30, 40, 20, 45],
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Dataset 2',
                    data: [-10, -20, -15, -30, -40, -20, -45],
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 0',
                },
            ],
        }
        this.option = {
            plugins: {
                title: {
                  display: true,
                  text: 'Chart.js Bar Chart - Stacked',
                },
            },
            responsive: true,
            interaction: {
                mode: 'index' as const,
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        }
    }

    getData() {
        return this.data
    }
    getOption() {
        return this.option
    }

    /**
     * Create dataField dict and insert to class from dataInput
     * @param data 
     */
    initialiseStatsData(data: dataInput){
        this.data = {
            labels: data.dataLabel,
            datasets: [
                {
                    label: data.dataName,
                    data: data.dataCount,
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                }
            ]
        }
    }

    save():this {
        return this
    }
}
