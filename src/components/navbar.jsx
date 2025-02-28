import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import axios from "axios";
import "./Navbar.css";

const API_KEY = "350e550367da4b888be329729bada85e";

const Navbar = ({ onSearch, loading }) => {
  const [searchCity, setSearchCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      onSearch(searchCity.split(",")[0]); // Trigger search
      setSuggestions([]); // Close suggestions after search
    }
  };

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setSearchCity(input);
    setSelectedIndex(-1); // Reset index

    if (input.length > 1) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
        );
        const cityNames = response.data.map(
          (city) => `${city.name}, ${city.country}`
        );
        setSuggestions(cityNames);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setSearchCity(city);
    setSuggestions([]); // Close suggestions
    onSearch(city.split(",")[0]); // Trigger search
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        // Select highlighted suggestion
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        // Search with manually entered city
        handleSearch();
      }
    }
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      {/* Logo */}
      <div className="logo">
        <FilterDramaTwoToneIcon />
        <p>Geo Weather</p>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <TextField
          variant="outlined"
          placeholder="Search city (e.g., Pune)"
          size="small"
          value={searchCity}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {suggestions.length > 0 && (
          <ul className={`suggestions-box ${darkMode ? "dark" : "light"}`}>
            {suggestions.map((city, index) => (
              <li
                key={city}
                className={index === selectedIndex ? "active" : ""}
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          className="search-btn"
        >
          {loading ? "Locating..." : "Search"}
        </Button>
      </div>

      {/* Buttons Container */}
      <div className="button-container">
        {/* Current Location Button */}
        <button
          className={`action-btn location-btn ${loading ? "disabled" : ""}`}
          onClick={() => {
            if (!loading) {
              onSearch("currentLocation");
              setSuggestions([]); // Close suggestions
            }
          }}
        >
          <GpsFixedIcon />
          <span>Current Location</span>
        </button>

        {/* Dark Mode Toggle Button */}
        <button className="action-btn theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
