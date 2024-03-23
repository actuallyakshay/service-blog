const { TagModel } = require("../models/tag.schema");

exports.getAllTags = async (req, res) => {
  try {
    const { name, offset = 0, limit = 10 } = req.query;
    const pipeline = [
      {
        $facet: {
          tags: [
            {
              $match: {
                name: new RegExp(name ?? "", "i"),
              },
            },
            { $skip: +offset },
            { $limit: +limit },
          ],
          count: [
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          tags: 1,
          count: {
            $arrayElemAt: ["$count.count", 0],
          },
        },
      },
    ];

    const resp = await TagModel.aggregate(pipeline);

    return res.status(200).json(...resp);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const foundTag = await TagModel.findById(req.params.id);

    if (!foundTag) throw new Error("Tag not found");

    return res.status(200).json(foundTag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createTag = async (req, res) => {
  try {
    const foundTag = await TagModel.findOne({ name: req.body.name });

    if (foundTag) throw new Error("Tag already exists");

    const createdTag = await TagModel.create(req.body);
    return res.status(201).json(createdTag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateTagById = async (req, res) => {
  try {
    if (!req.body.name) throw new Error("Name is required");
    const foundTag = await TagModel.findById(req.params.id);

    if (!foundTag) throw new Error("Tag not found");

    const updatedTag = await TagModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedTag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const foundTag = await TagModel.findById(req.params.id);

    if (!foundTag) throw new Error("Tag not found");

    await TagModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
