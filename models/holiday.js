const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const HolidaySchema = Schema({
  motivo: String,
  tipo: String,
  info: String,
  original: String,
  id: String,
  dia: Number,
  mes: Number
});
HolidaySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Holiday", HolidaySchema);
