const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// put some interesting intro on the root path
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the Fantasy Premier League API</h1><p>Use the following endpoints to get the data you need:</p><ul><li>/general-info</li><li>/league-standings</li><li>/event-status</li></ul>"
  );
});

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
    // catch the 503 error and send a custom error message
    if (error.response.status === 503) {
      res.status(503).json({
        error: "The game is currently being updated. Please try again later.",
      });
      return;
    }
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
    // catch the 503 error and send a custom error message
    if (error.response.status === 503) {
      res.status(503).json({
        error: "The game is currently being updated. Please try again later.",
      });
      return;
    }
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// get event status
app.get("/event-status", async (req, res) => {
  try {
    // Make the API request to the Premier League Fantasy API
    const response = await axios(
      "https://fantasy.premierleague.com/api/event-status/"
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    // catch the 503 error and send a custom error message
    if (error.response.status === 503) {
      res.status(503).json({
        error: "The game is currently being updated. Please try again later.",
      });
      return;
    }
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
