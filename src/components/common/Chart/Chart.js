import React from 'react'
import { Bar } from 'react-chartjs-2'

// Import necessary chart elements (optional, if not already imported)
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true, // Show the title (optional)
      text: '', // No default title
    },
  },
}

export default function ReusableChart({
  labels, // Required labels for the chart
  datasets, // Required datasets containing data points
  options = defaultOptions, // Allow customization of options
  width = 500, // Default width
  height = 500, // Default height
}) {
  return (
    <div style={{ width, height }}>
      <Bar options={options} data={{ labels, datasets }} />
    </div>
  )
}
