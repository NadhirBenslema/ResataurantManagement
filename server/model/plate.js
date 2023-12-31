const mongoose=require('mongoose');
const Joi = require("joi");



const PlateSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    averageRating:{
      type: Number,
      required: true
  },

  category: {
    type: String,
    enum: ['fajitas', 'salades','desserts','poulet'],
    default: 'fajitas'
  },
});
const Plate = mongoose.model("Plate", PlateSchema);

const validate = (data) => {
	const schema = Joi.object({

    title: Joi.string().required().messages({
      'any.required': 'title is required',
      }),

    price: Joi.number().required().messages({
      'any.required': 'price is required',
    }),
    averageRating: Joi.number().required().messages({
        'any.required': 'rating is required',
    }),

    category: Joi.string().required().messages({
        'any.required': 'category is required',
    }),
	 
	 
	});
  
	return schema.validate(data, { abortEarly: false });
  };
  module.exports = {Plate, validate};
