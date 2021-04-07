// Imports
import moment from "moment";
import { tz } from "moment-timezone";
import { Chart } from "chart.js";

// DOM Elements
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: null,
        datasets: [
            {
                label: 'Temperature',
                data: null,
                backgroundColor: 'rgba(17, 138, 178, 0.2)',
                borderColor: 'rgb(17, 138, 178)',
            },
        ]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [{
                // https://stackoverflow.com/questions/35022830/chart-js-change-label-orientation-on-x-axis-for-line-charts
                ticks: {
                    autoSkip: false,
                    maxRotation: 70,
                    minRotation: 70
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
            }]
        },
        tooltips: {
            callbacks: {
                label: (tooltipItems, data) => {
                    return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' K';
                }
            },
        }
    },
})

// Functions
const getClimateVariables = ({ hourlyData, timezone }) => {
    const temperature = hourlyData.map(data => data.temp);
    const hours = hourlyData.map(data => (
        moment
            .tz(data.dt * 1000, timezone)
            .format('hh A')
    ))

    return {
        temperature: temperature,
        hours: hours
    }
}

// Exports
export const printHourlyData = ({ hourlyWeatherData, timezone }) => {
    const hourlyData = hourlyWeatherData.filter((_, i) => i < 12);
    const {
        temperature,
        hours
    } = getClimateVariables({
        hourlyData: hourlyData,
        timezone: timezone
    });
    chart.data.labels = hours;
    chart.data.datasets[0].data = temperature;
    chart.update();
}