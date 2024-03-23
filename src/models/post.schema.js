const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageURL: {
      type: String,
      required: true,
    },
    tags: {
      type: [Schema.Types.ObjectId],
      ref: "tag",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

exports.PostModel = model("post", postSchema);
