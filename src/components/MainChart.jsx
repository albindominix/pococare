import React from "react";
import Chart from "react-apexcharts";
function MainChart({ weather }) {
  const filtedredData = weather?.hourly?.filter((_, index) => index < 24)
    
 const catergoryData = filtedredData?.map((time, index) => {
  const tz = "Asia/Kolkata";
  // Timestamp
  const timestamp = time.dt;
  // Create Date object
  const date = new Date(timestamp * 1000);
  // Options
  const option = {
    timeZone: tz,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    ampm: "AM/PM"  
  };
  // Convert to India time
  const indiaTime = date.toLocaleString("en-US", option);

  // Display
  if (index < 24) {
    return indiaTime.slice(0, -6) + indiaTime.slice(-2); //remove minutes and keep am/pm
  }
});

const seriesData = filtedredData?.map((weather, index) =>weather.temp+'°C' )
 
  let series = [
    {
      name: "Temperature (°C)",
      data: seriesData,
      
    },
  ];
  let options = {
    chart: {
      height: 280,
      type: "area",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          pan:true,
          zoomin: true,
          zoomout: true,},
          autoSelected:'zoom'
      }
      
    },
    // events: {
    //   mounted: function (chart) {
    //     var commitsEl = document.querySelector('.cmeta span.commits');
    //     var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)
  
    //     commitsEl.innerHTML = commits
    //   },
    //   updated: function (chart) {
    //     var commitsEl = document.querySelector('.cmeta span.commits');
    //     var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)
  
    //     commitsEl.innerHTML = commits
    //   }
    // },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        // stops: [0, 90, 100]
      },
    },
    markers: {
      size: 6,
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      stepSize:10,
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: ["#000000"],
          fontSize: "14px",
          fontWeight: 600,
        },
      },
      categories: catergoryData,
    },
  };

  return (
    <div>
      <Chart options={options} type="area" height={250} series={series} />
    </div>
  );
}

export default MainChart;
