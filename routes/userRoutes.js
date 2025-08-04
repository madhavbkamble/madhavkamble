const express = require("express");
const router = express.Router();
const User = require("../modules/User");

/*router.post('/register',async(req, res)=>{
    try{
        const {name,email,password,age,education,contry} = req.body;
        const newUser = await User.create({name,email,password,age,education,contry});
        res.json(newUser);
    } catch (error){
        res.status(500).json({error:"Error creating user "});
    }
});*/


router.get("/users",async(req, res)=>{
    try{
        const users = await User.find();
        res.json(users);

    }catch(error){
        res.status(500).json({error:"Error fetching users"});
    }
})
router.delete("/users/:id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({message:"User deleted successfully"});
    }catch(error){
        res.status(500).json({error:"Error deleting user"})
    }
});

router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.get('/userfilter', async (req, res) => {
  try {
    const { age } = req.query;
    const filter = {};
    if (age) {
      filter.age = Number(age);
    }
    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});



module.exports = router;