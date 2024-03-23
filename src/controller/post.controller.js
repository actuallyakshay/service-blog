const mongoose = require("mongoose");
const { PostModel } = require("../models/post.schema");

exports.getAllPosts = async (req, res) => {
  try {
    const { tag, offset = 0, limit = 10, search, sortBy } = req.query;

    const resp = await PostModel.aggregate([
      {
        $facet: {
          posts: [
            {
              $match: {
                $or: [
                  { title: new RegExp(search ?? "", "i") },
                  { description: new RegExp(search ?? "", "i") },
                ],
              },
            },
            {
              $lookup: {
                from: "tags",
                localField: "tags",
                foreignField: "_id",
                as: "tagsData",
              },
            },
            ...(tag
              ? [
                  {
                    $match: {
                      tagsData: {
                        $elemMatch: {
                          name: new RegExp(tag, "i"),
                        },
                      },
                    },
                  },
                ]
              : []),
            ...(sortBy
              ? [{ $sort: { createdAt: sortBy === "ASC" ? 1 : -1 } }]
              : []),
            {
              $skip: +offset,
            },
            {
              $limit: +limit,
            },
            {
              $project: {
                tags: 0,
              },
            },
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
          posts: 1,
          count: {
            $arrayElemAt: ["$count.count", 0],
          },
        },
      },
    ]);

    return res.status(200).json(...resp);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const base64 = req?.file?.buffer?.toString("base64");

    const post = new PostModel({
      imageURL: base64,
      ...req.body,
      tags: req.body?.tags?.split(",") ?? [],
    });

    return res.status(201).json(await post.save());
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await PostModel.findById(id).populate("tags");
    return res.status(200).json(resp);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
