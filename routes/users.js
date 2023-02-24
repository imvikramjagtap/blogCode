const router = require("express").Router();

const User = require("../models/User");

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  
});

// DELETE
router.delete("/:id", async (req, res) => {
    if (req.body._id === req.params.id) {
      try {
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("User deleted")
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    }else{
      res.status(401).json("You can only delete your account")
    }
  });

//   Get single user

router.get("/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch (err){
        res.status(500).json(err)
    }
});

// Get all users

router.get("/", async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;
