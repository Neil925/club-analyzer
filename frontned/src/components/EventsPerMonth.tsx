import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { enUS } from "date-fns/locale";

export function EventsPerMonth(
  { eventsByMonth }: { eventsByMonth: Record<string, number> },
) {
  const labels = Object.keys(eventsByMonth).map((x) => new Date(x + "-01"));

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
        type: "time",
        adapters: {
          date: {
            locale: enUS,
          },
        },
        time: {
          unit: "month",
          // parser: "yyyy-mm",
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
      label: "Events per month",
      data: Object.values(eventsByMonth),
      borderColor: "#000",
      backgroundColor: "#006dfd",
    }],
  }), [eventsByMonth, labels]);

  return (
    <div>
      <h3>Events Per Month</h3>
      <div style={{ width: "600px", height: "300px" }}>
        {data && <Line data={data as any} options={options as any} />}
      </div>
    </div>
  );
}
