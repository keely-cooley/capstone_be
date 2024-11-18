const express = require("express");
const cors = require("cors");
const app = express();
const port = 8083;
require("dotenv").config();

let dbConnect = require("./dbConnect");

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/", express.static("public"));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");
const listedMovieRoutes = require("./routes/listedMovieRoutes");
const seenMovieRoutes = require("./routes/seenMovieRoutes")

// const landingPostRoutes = require("./routes/landingPostRoutes");

// //ROUTES
//http://localhost:8083/
app.use("/", userRoutes);

//http:localhost:8083/reviews
app.use("/reviews", reviewRoutes);

//http://localhost:8083/movies
app.use("/movies", movieRoutes);

//http://localhost:8083/listedMovieRoutes
app.use("/listedMovies", listedMovieRoutes)

//http://localhost:8083/seenMovieRoutes
app.use("/seenMovies", seenMovieRoutes)

// //https://localhost:8083/landingPost
// //landing page posts only
// app.use("/landingPost", landingPostRoutes);

app.listen(port, () => {
  console.log(`Cinnefiles listening at http://localhost:${port}`);
});
