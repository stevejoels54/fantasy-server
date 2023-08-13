const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// get general info
app.get("/general-info", async (req, res) => {
  try {
    // Make the API request to the Premier League Fantasy API
    const response = await axios(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// get league standings
app.get("/league-standings", async (req, res) => {
  try {
    // Make the API request to the Premier League Fantasy API
    const response = await axios(
      "https://fantasy.premierleague.com/api/leagues-classic/314509/standings/"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
