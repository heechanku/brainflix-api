const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const { v4 } = require("uuid");


router.get("/", (req, res) => {
  const videoList = getVideos();

  res.json(videoList);
});

router.get("/:id", (req, res) => {
  const videoList = getVideos();
  const found = videoList.some((video) => video.id === req.params.id);
  if (found) {
    res.json(videoList.filter((video) => video.id === req.params.id));
  } else {
    res
      .status(400)
      .json({ errorMessage: `Video with ID:${req.params.id} is not valid` });
  }
});

router.post("/", (req, res) => {
  const videoList = getVideos();


  const { title, description } = req.body;

  const newVideo = {
    id: v4(),
    title,
    description,
    channel: "Heech's Channel",
    comments: [
        {
            id: v4(),
            name: "Bella Jeong",
            comment: "That is so cool!",
            "likes": 10000000,
            "timestamp": Date.now()
        },
        {
            id: v4(),
            name: "Heech",
            comment: "That is so lame!",
            "likes": 1000000234234230,
            "timestamp": Date.now()
        },
    ]

  };

  videoList.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videoList));
  res.send("created")
});

function getVideos() {
  const videoFile = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videoFile);
  return videos;
}

module.exports = router;
