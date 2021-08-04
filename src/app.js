const path = require("path");
const express = require("express");
const hbs = require("hbs");

const foreCast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res, next) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});
// run index.html because / it is by default index.html

app.get("/help", (req, res, next) => {
  res.render("help", {
    helpText: "This is some helpfull text...",
    title: "Help",
    name: "Shreeram Nage",
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew",
  });
});

app.get("/weather", (req, res, next) => {
  const unit = req.query.unit;
  const address = req.query.address;
  if (!req.query.address) {
    return res.send({ error: "You must provide an  address." });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }

    foreCast(latitude, longitude, unit, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res, next) => {
  // Run when no search is provided
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res, next) => {
  res.render("404", {
    title: "404",
    name: "Shreeram Nage",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res, next) => {
  res.render("404", {
    title: "404",
    name: "Shreeram Nage",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
