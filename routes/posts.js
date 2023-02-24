const router = require("express").Router();
const Post = require("../models/Post");

// GET ALL POST
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
    console.log(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE POST
router.post("/write", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COMMENT
router.get("/:id/comment", async (req, res) =>{
  try{
    const comment = await Post.findById(req.params.id);
    res.status(200).json(comment.comments);
  }catch (err){
    res.status(500).json(err);
  }
})

// POST COMMENT
router.put("/:id/comment", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push:{comments:{
          name:req.body.name,
          comment:req.body.comment
        }}
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COMMENT
// router.delete("/:id/comment", async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     res.status(200).json("Post deleted");
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// });

module.exports = router;
