const Holiday = require("../models/holiday");
const { URL_API_EXTERNAL } = require('../config');
const { response } = require("../app");
const fetch = require("node-fetch");

function addHoliday(req, res) {
  const body = req.body;
  const holiday = new Holiday(body);

  holiday.save((err, holidayStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!holidayStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear el festivo." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Festivo creado correctamente." });
      }
    }
  });
}

function insertData(json) {
  Holiday.insertMany(json)
    .then(function () {
      console.log("Festivos guardados exitosamente!!!");
    })
    .catch(function (error) {
      console.log('Error al tratar de guardar los festivos traídos desde la API: ' + error);
    }); 
}

function verifyData() {
  Holiday.find().then(holidays => {
    if (holidays.length > 0) {
      console.log('Festivos cargados previamente');
    } else {
     (async () => {
       try {
          const response = await fetch(URL_API_EXTERNAL);
          const json = await response.json();
          insertData(json);
       } catch (error) {
    			console.log('No se pudo conectar con la API del sitio nolaborales');
  			}
     })();
    }
  }).catch(err => console.log('No se pudo poblar los días festivos:', err.message));
}

function getHolidays(req, res) {
  const { page = 1, limit = 5 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" }
  };

  Holiday.paginate({}, options, (err, holidaysStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
      console.log('error 500: ' + err);
    } else {
      if (!holidaysStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningún festivo." });
      } else {
        res.status(200).send({ code: 200, holidays: holidaysStored });
      }
    }
  });
}

function updateHoliday(req, res) {
  const holidayData = req.body;
  const { id } = req.params;

  Holiday.findByIdAndUpdate(id, holidayData, (err, holidayUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!holidayUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningún festivo." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Festivo actualizado correctamente." });
      }
    }
  });
}

function deleteHoliday(req, res) {
  const { id } = req.params;

  Holiday.findByIdAndRemove(id, (err, holidayDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!holidayDeleted) {
        res.status(404).send({ code: 404, message: "Festivo no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El festivo ha sido eliminado correctamente."
        });
      }
    }
  });
}

function getHoliday(req, res) {
  const { url } = req.params;

  Holiday.findOne({ url }, (err, holidayStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!holidayStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningún festivo." });
      } else {
        res.status(200).send({ code: 200, holiday: holidayStored });
      }
    }
  });
}

module.exports = {
  addHoliday,
  getHolidays,
  updateHoliday,
  deleteHoliday,
  getHoliday,
  verifyData
};
