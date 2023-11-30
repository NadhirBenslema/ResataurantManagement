const express = require('express');
const router = express.Router();
const {Plate,validate} = require('../model/plate');
const path = require('path');
const Joi = require("joi");
const multer = require('multer');
const upload = require('../config/multerConfig');


router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//add
router.post('/add', upload.single('image'), async (req, res) => {
    try {
      const { error } = validate(req.body);
          if (error)
              return res.status(400).send({ message: error.details[0].message });
      const plate = new Plate({
        title: req.body.title,
        price:req.body.price,
        image: req.file.filename,
		averageRating:req.body.averageRating,
  
      });
      await plate.save();
      res.status(201).send("Your plat has been added successfully !");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

//getAll
router.get("/getAll", async (req, res) => {
    try {
      const plates = await Plate.find();
      res.status(200).send(plates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});


//getById
router.get("/:id",async (req, res) => {
	try {
		const data=await Plate.findById(req.params.id);
		res.json(data);
		//res.status(200).send(data);
	} catch (err) {
		res.send(err)
	}
});

//delete
router.delete("/:id", async (req, res) => {
	try {
	  const plate = await Plate.findByIdAndDelete(req.params.id);
	  if (!plate)
		return res.status(404).send({ message: "Plate not found" });
  
	  res.status(200).send({ message: "Plate deleted successfully" });
	} catch (error) {
	  console.log(error);
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });
  
  

  
//update
router.put("/update/:id",upload.single('image'),async (req,res)=>{
	
	try{
		const { error } = validate(req.body);
	
		if (error)
			return res.status(400).send({ message: error.details[0].message });
			
		const updatedFields = {
			title: req.body.title,
			price: req.body.price,
			image: req.file.filename,
			averageRating:req.body.averageRating,


		};	
		await Plate.findByIdAndUpdate(req.params.id,updatedFields,{new:true});
		res.status(201).send("updated successfully");

	}catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});




  // Filter gyms by rating
router.get('/filter/:rating', async (req, res) => {
	const rating = req.params.rating;
	const plates = await Plate.find({ averageRating: { $gte: rating } });
	res.json(plates);
  });


router.get('/search/:title', async (req, res) => {
	const { title } = req.params;
  
	try {
	  const plates = await Plate.find({ title: { $regex: new RegExp(title, 'i') } });
	  res.json(plates);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Server error');
	}
});



module.exports = router;