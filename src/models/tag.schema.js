const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
exports.TagModel = model("tag", tagSchema);
