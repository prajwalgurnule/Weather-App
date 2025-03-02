import React, { useState, useEffect } from "react";
import Navbar from "../src/components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = "350e550367da4b888be329729bada85e";
    axios
      .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching the air quality data:", error));
  };

  const fetchWeatherData = (city) => {
    setLoading(true);
    const API_KEY = "350e550367da4b888be329729bada85e";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        setRecentSearches((prev) => {
          const updatedSearches = [city, ...prev.filter((c) => c !== city)];
          return updatedSearches.slice(0, 5);
        });
        axios
          .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then((forecastResponse) => {
            setFiveDayForecast(forecastResponse.data);
            const now = new Date();
            const hourlyData = forecastResponse.data.list
              .filter((item) => new Date(item.dt * 1000) > now)
              .slice(0, 5)
              .map((item) => ({
                time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                temp: item.main.temp,
              }));
            setForecastData(hourlyData);
            setTimeout(() => setLoading(false), 3000);
          })
          .catch((error) => {
            console.error("Error fetching the 5-day forecast data:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar onSearch={(searchCity) => { setCity(searchCity); setOpenDialog(false); }} loading={loading} />
      <Dialog open={openDialog} sx={{ textAlign: 'center' }}>
        <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', color: '#2C3E50' }}>🌍 Welcome to Geo Weather Dashboard </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ fontSize: '18px', color: '#34495E', marginBottom: '10px' }}>
            Stay updated with the latest weather conditions! 🌦️
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '16px', color: '#7F8C8D' }}>
            Start by entering your city's name in the search bar above. Get real-time temperature, air quality, and forecast details instantly! 🔍
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: '20px' }}>
          <Button variant="contained" onClick={() => setOpenDialog(false)} sx={{ backgroundColor: '#3498DB', '&:hover': { backgroundColor: '#2980B9' }, color: 'white', fontSize: '16px' }}>Got it! 🚀</Button>
        </DialogActions>
      </Dialog>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        weatherData &&
        airQualityData && (
          <div style={{ display: "flex", flexDirection: "column", padding: "30px", gap: "20px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "30px" }}>

                {/* Recent Searches Box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0 }}
                  style={{
                    backgroundColor: "#4B5563",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    color: "white",
                    width: "460px",
                  }}
                >
                  <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Recent Searches</h2>
                  {recentSearches.length === 0 ? (
                    <p>No recent searches</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {recentSearches.map((search, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#1E293B",
                            padding: "10px",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => setCity(search)}
                        >
                          <span>{search}</span>
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setRecentSearches((prev) => prev.filter((c) => c !== search));
                            }}
                          >
                            ❌
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Main Weather Card */}
                <MainWeatherCard weatherData={weatherData} />
                {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
              </div>

              <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "10px" }}>
                <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />

                {/* Hourly Forecast */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0 }}
                  style={{
                    backgroundColor: "#4B5563",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    color: "white",
                    width: "860px",
                    marginTop: "20px",
                  }}
                >
                  <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>Hourly Forecast</h2>
                  <div style={{ backgroundColor: "#1E293B", borderRadius: "10px", padding: "15px" }}>
                  <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={forecastData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E0" />
                        <XAxis dataKey="time" tick={{ fill: '#E2E8F0' }} />
                        <YAxis tick={{ fill: '#E2E8F0' }} domain={[20,40]} ticks={[20, 24, 28, 32, 36, 40]} />
                        <Tooltip contentStyle={{ backgroundColor: '#2D3748', borderRadius: '5px', color: 'white' }} />
                        <Line type="monotone" dataKey="temp" stroke="#63B3ED" strokeWidth={2} dot={{ stroke: '#63B3ED', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherDashboard;
