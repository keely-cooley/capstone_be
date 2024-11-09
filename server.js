const express = require("express");
// const cors = require("cors");
const app = express();
const port = 8083;
require("dotenv").config();

let dbConnect = require('./dbConnect')

// const corsOptions = {
//   origin: "http://localhost:5173",
// };

// app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/", express.static("public"));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
// const userPostRoutes = require("./routes/userPostRoutes");
// const movieRoutes = require("./routes/movieroutes");
// const landingPostRoutes = require("./routes/landingPostRoutes");

// //ROUTES
//http://localhost:8083/
app.use("/", userRoutes);
// //http:localhost:8083/userPosts
// app.use("/userPosts", userPostRoutes);
// //http://localhost:8083/movies
// //landing page movie array only
// app.use("/movies", movieRoutes);
// //https://localhost:8083/landingPost
// //landing page posts only
// app.use("/landingPost", landingPostRoutes);

app.listen(port, () => {
  console.log(`Cinnefiles listening at http://localhost:${port}`);
});
