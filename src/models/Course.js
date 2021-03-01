const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const CourseSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    },
    link: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

CourseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", CourseSchema);
