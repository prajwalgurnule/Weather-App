// import React from "react";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import CloudIcon from "@mui/icons-material/Cloud";
// import WaterDropIcon from "@mui/icons-material/WaterDrop";

// const FiveDayForecast = ({ forecastData }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-GB", {
//       weekday: "short",
//       day: "2-digit",
//       month: "short",
//     }).format(date);
//   };

//   // Extract unique dates (one per day, preferably around midday)
//   const dailyForecast = [];
//   const uniqueDates = new Set();

//   for (let i = 0; i < forecastData.list.length; i++) {
//     const item = forecastData.list[i];
//     const date = item.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD

//     if (!uniqueDates.has(date)) {
//       uniqueDates.add(date);
//       dailyForecast.push(item);
//     }

//     if (dailyForecast.length === 5) break; // Limit to 5 days
//   }

//   const getWeatherIcon = (description) => {
//     if (description.includes("clear")) return <WbSunnyIcon style={{ color: "orange" }} />;
//     if (description.includes("cloud")) return <CloudIcon style={{ color: "gray" }} />;
//     if (description.includes("rain") || description.includes("snow")) return <AcUnitIcon style={{ color: "blue" }} />;
//     return <CloudIcon style={{ color: "white" }} />;
//   };

//   return (
//     <div
//       style={{
//         background: " #4B5563",
//         color: "white",
//         borderRadius: "12px",
//         padding: "20px",
//         width: "100%",
//         maxWidth: "460px",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//         textAlign: "center",
//       }}
//     >
//       <h2 style={{ marginBottom: "15px", letterSpacing: "1px" }}>5 Days Weather Forecast</h2>
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.3)", fontSize: "16px", opacity: "0.9" }}>
//             <th style={tableHeaderStyle}>Date</th>
//             <th style={tableHeaderStyle}>Temp</th>
//             <th style={tableHeaderStyle}>Min/Max</th>
//             <th style={tableHeaderStyle}>Humidity</th>
//             <th style={tableHeaderStyle}>Weather</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dailyForecast.map((item, index) => (
//             <tr key={index} style={tableRowStyle}>
//               <td style={tableCellStyle}>{formatDate(item.dt_txt)}</td>
//               <td style={tableCellStyle}>{Math.round(item.main.temp)}°C</td>
//               <td style={tableCellStyle}>
//                 {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
//               </td>
//               <td style={tableCellStyle}>
//                 <WaterDropIcon style={{ fontSize: "14px", color: "#00BFFF" }} /> {item.main.humidity}%
//               </td>
//               <td style={tableCellStyle}>
//                 {getWeatherIcon(item.weather[0].description)} {item.weather[0].description}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // Table styling
// const tableHeaderStyle = {
//   padding: "10px",
//   fontWeight: "bold",
//   borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
// };

// const tableRowStyle = {
//   borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
//   fontSize: "14px",
// };

// const tableCellStyle = {
//   padding: "10px",
// };

// export default FiveDayForecast;

import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air"; // Wind icon

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  // Extract unique dates (one per day, preferably around midday)
  const dailyForecast = [];
  const uniqueDates = new Set();

  for (let i = 0; i < forecastData.list.length; i++) {
    const item = forecastData.list[i];
    const date = item.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD

    if (!uniqueDates.has(date)) {
      uniqueDates.add(date);
      dailyForecast.push(item);
    }

    if (dailyForecast.length === 5) break; // Limit to 5 days
  }

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return <WbSunnyIcon style={{ color: "orange" }} />;
    if (description.includes("cloud")) return <CloudIcon style={{ color: "gray" }} />;
    if (description.includes("rain") || description.includes("snow")) return <AcUnitIcon style={{ color: "blue" }} />;
    return <CloudIcon style={{ color: "white" }} />;
  };

  return (
    <div
      style={{
        background: "#4B5563",
        color: "white",
        borderRadius: "12px",
        padding: "20px",
        width: "100%",
        maxWidth: "460px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "15px", letterSpacing: "1px" }}>5 Days Weather Forecast</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.3)", fontSize: "16px", opacity: "0.9" }}>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Temp</th>
            <th style={tableHeaderStyle}>Humidity</th>
            <th style={tableHeaderStyle}>Wind Speed</th>
            <th style={tableHeaderStyle}>Weather</th>
          </tr>
        </thead>
        <tbody>
          {dailyForecast.map((item, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tableCellStyle}>{formatDate(item.dt_txt)}</td>
              <td style={tableCellStyle}>{Math.round(item.main.temp)}°C</td>
              <td style={tableCellStyle}>
                <WaterDropIcon style={{ fontSize: "14px", color: "#00BFFF" }} /> {item.main.humidity}%
              </td>
              <td style={tableCellStyle}>
                <AirIcon style={{ fontSize: "14px", color: "#FFA500" }} /> {Math.round(item.wind.speed)} m/s
              </td>
              <td style={tableCellStyle}>
                {getWeatherIcon(item.weather[0].description)} {item.weather[0].description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table styling
const tableHeaderStyle = {
  padding: "10px",
  fontWeight: "bold",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const tableRowStyle = {
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  fontSize: "14px",
};

const tableCellStyle = {
  padding: "10px",
};

export default FiveDayForecast;
