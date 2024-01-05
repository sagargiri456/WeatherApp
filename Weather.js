const express = require("express");
const cors = require("cor");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
// const ejs = require("ejs")
const port = process.env.PORT || 5000

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors(
  {
origin: ["weather-52sxnbg4v-sagar-giris-projects.vercel.app"],
method:["POST","GET"],
credentials:true
  }
));
app.get("/", (req, res) => {
  const cityimageurl = "citypng.png";
  const heading = "Weather App";
  const inputcode = true;
  res.render("template", {
    cityimageurl: cityimageurl,
    inputcode: inputcode,
    heading: heading,
  });
});
const apikey = "b5fb35dd4753e1ad51c8ed9793f64d42";
app.post("/", (req, res) => {
  const cityname = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}
      &appid=${apikey}&units=metric`;

  https.get(url, function (response) {
    console.log("dusre https.get tk kam kar rha hai");
    response.on("data", function (data) {
      const allData = JSON.parse(data);
      const heading = `Temperature in ${cityname} is:`;
      const temperature = allData.main.temp;
      const inputcode = false;
      const iconcode = allData.weather[0].icon;
const weatherdescription = allData.weather[0].description;
      const weatherImage =
        "http://openweathermap.org/img/w/" + iconcode + ".png";

      // var weatherImage;

      // switch (iconcode) {
      //   case "01d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "02d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "03d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "04d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "09d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "10d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "11d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "13d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      //   case "50d":
      //     weatherImage = `${iconcode}.png`;
      //     break;
      
      //   default:
      //     break;
      // }

      console.log(allData);
      //   res.write();
      //   res.write();
      res.render("template", {
        cityimageurl: weatherImage,
        heading: heading,
        inputcode: inputcode,
        temperature: temperature,
        weatherdescription:weatherdescription,
      });
    });
  });
});

app.listen(port);
