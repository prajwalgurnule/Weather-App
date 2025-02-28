import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Hot weather icon
import AcUnitIcon from "@mui/icons-material/AcUnit"; // Cold weather icon
import CloudIcon from "@mui/icons-material/Cloud"; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const renderTemperatureIcon = () => {
    if (temperatureCelsius > 23) {
      return <WbSunnyIcon style={{ fontSize: "3rem", color: "orange" }} />;
    } else if (temperatureCelsius < 10) {
      return <AcUnitIcon style={{ fontSize: "3rem", color: "blue" }} />;
    } else {
      return <CloudIcon style={{ fontSize: "3rem", color: "gray" }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "460px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "1px" }}>Current Weather</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    fontSize: "45px",
    fontWeight: "bold",
    justifyContent: "center",
    gap: "15px",
    marginTop: "10px",
  }}
>
  {temperatureCelsius}°C {renderTemperatureIcon()}
</div>

<div style={{ fontSize: "20px", marginTop: "10px", fontWeight: "500", opacity: "0.8" }}>
  {weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}
</div>

<div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", width: "100%" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", opacity: "0.9" }}>
    <CalendarMonthIcon />
    <span>{currentDate}</span>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", opacity: "0.9" }}>
    <LocationOnIcon />
    <span>
      {cityName}, {countryName}
    </span>
  </div>
</div>
</div>
);
};

export default MainWeatherCard;
