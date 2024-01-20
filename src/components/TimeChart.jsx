import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
function TimeChart() {
 
    const [chartOptions, setChartOptions] = useState({
        chart: {
          type: 'area',
          height: 350
        },
        dataLabels: {
          enabled: false
        },  
        stroke: {
          curve: 'smooth'
        },
        markers: {
          size: 6,
          strokeWidth: 3,
          hover: {
            size: 9
          }
        }
      });
    
      const [series, setSeries] = useState([{
        name: 'Daylight',
        data: generateDaylightData() 
      }]);
    
    function generateDaylightData(){
        const times = [
            "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", 
            "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
            "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"
          ];
          
          const data = times.map(time => {
          
            let hour = parseInt(time.split(" ")[0]);
            
            // Map 12 PM to 1 
            if (time.includes("PM")) {
              hour += 12; 
            }
            
            // Calculate data point  
            let dataPoint; 
            if (hour < 13) {
              // Morning - ramp up 
              dataPoint = hour / 12;  
            } else {
              // Afternoon - ramp down
              dataPoint = 2 - (hour - 12) / 12;  
            }
          
            return {
              x:time, 
              y: dataPoint // Peak of 1 at noon
            };
            
          });
          return data
    }

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    
      return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              {/* <Chart 
                options={chartOptions}
                series={series}
                type="area"
              /> */}
                <svg height="200" viewBox="0 0 704 200">
      <defs>
        <clipPath>
          <rect x="18" y="0" height="170" width="676"/>
        </clipPath>
        <linearGradient id="time" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#F7E0AF" stopOpacity="0.6"/>
          <stop offset="90%" stopColor="#F7E0AF" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <g>
        <line height="30" x="18" y="170" stroke="#666" fill="none" x1="18" y1="170" x2="694" y2="170"/>
        <g>
          <g>
            <text height="30" x="18" y="178" stroke="none" fill="#666" textAnchor="middle">
              <tspan x="18" dy="0.71em">5am</tspan>
            </text>
          </g>
          {/* other <g> elements */}
        </g>
      </g>
      <g>
        <g>
          <path stroke="none" fill="url(#time)" fillOpacity="0.6" width="676" height="170" d="M187,141.6666..."/>
          <path stroke="#FEDB41" fill="none" fillOpacity="0.6" width="676" height="170" d="M187,141.6666..."/> 
        </g>
      </g>
    </svg>
            </div>
          </div>
        </div>
      );
}

export default TimeChart

