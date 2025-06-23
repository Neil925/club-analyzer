import { ChartData, ChartOptions } from "chart.js";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";

export function Cohosted(
  { cohosted }: { cohosted: Record<string, number> },
) {
  const select = Object.entries(cohosted).sort((a, b) => a[1] - b[1]).slice(
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
      label: "Cohosted Events",
      data: select.map((x) => x[1]),
      borderColor: "#000",
      backgroundColor: "#006dfd",
    }],
  }), [cohosted, labels]);

  return (
    <div>
      <h3>Cohosted Events</h3>
      <div style={{ width: "600px", height: "300px" }}>
        {data && <Pie data={data as any} options={options as any} />}
      </div>
    </div>
  );
}
