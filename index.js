const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB, DB_NAME } = require("./config");

const HolidayController = require("./controllers/holiday");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Conexión establecida OK.");

      app.listen(port, () => {
        console.log("##########################");
        console.log("###### FESTIVOS APP ######");
        console.log("##########################");
        console.log("API disponible en: ");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
      HolidayController.verifyData();
     
    }
  }
);
