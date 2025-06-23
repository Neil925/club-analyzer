import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

export function EventsPerClub(
  { eventsByClub }: { eventsByClub: Record<string, number> },
) {
  const select = Object.entries(eventsByClub).sort((a, b) => a[1] - b[1]).slice(
    -10,
  );
  const labels = select.map((x) => x[0]);

  const options: ChartOptions = {
    responsive: true,
    color: "#fff",
    backgroundColor: "#000",
    borderColor: "#ffff00",
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = useMemo((): ChartData => ({
    labels,
    datasets: [{
      label: "Events per Club",
      data: select.map((x) => x[1]),
      borderColor: "#000",
      backgroundColor: "#006dfd",
    }],
  }), [eventsByClub, labels]);

  return (
    <div>
      <h3>Events Per Club</h3>
      <div style={{ width: "600px", height: "300px" }}>
        {data && <Bar data={data as any} options={options as any} />}
      </div>
    </div>
  );
}
