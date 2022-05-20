const { reject } = require("bcrypt/promises");
const { default: mongoose } = require("mongoose");
const { School } = require("../models/school.model");

module.exports.allSchools = (req, res) => {
    console.log("estoy buscando todo");
    School.find().populate("reviews").populate({
         path: 'reviews',
        populate: {
            path: 'author',
            model: 'User'
        }})
        .then(allSchools => res.json({allSchools}))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.schoolById = (req, res) => {
    School.findOne({ _id: req.params.id }).populate("reviews").populate({
            path: 'reviews',
            populate: {
                path: 'author',
                model: 'User'
            }})
        .then(schoolById => res.json({schoolById }))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.createNewSchools = (req, res) => {
    console.log(req.body)
    School.create(req.body)
        .then((newSchools)=>res.json({newSchools}))
        .catch((err)=> res.json({message: "Algo salio mal", error: err}))
};

module.exports.updateSchools = (req, res) => {
    School.findOneAndUpdate({_id: req.params.id},req.body,{new:true})
        .then((school)=>res.json({review: school}))
        .catch((err)=>res.json({message: "Algo salio mal", error: err}))
};

module.exports.deleteSchools = (req, res) => {
    console.log(req.params.id)
    School.deleteOne({_id: req.params.id})
        .then((school)=>res.json({resultado: school}))
        .catch((err)=>res.json({message: "Algo salio mal", error: err}))
};

module.exports.schoolsOrderedByRating = (req, res) => {
    console.log("estoy buscando todo ordenado");
    School.aggregate([{ $lookup: {from: 'reviews', localField: 'reviews', foreignField: '_id', as: 'review_docs'} },
        {
            $addFields: {
              avgRating: {
                "$avg": "$review_docs.promedio",
              },
              nRatings: {
                $size: '$review_docs',
              },
            },
          },{ "$sort": { "avgRating": -1 } },
      ])
        .then(allSchools => res.json({allSchools}))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.bestschools = (req, res) => {
    console.log("estoy buscando todo ordenado");
    School.aggregate([{ $lookup: {from: 'reviews', localField: 'reviews', foreignField: '_id', as: 'review_docs'} },
        {
            $addFields: {
              avgRating: {
                "$avg": "$review_docs.promedio",
              },
              nRatings: {
                $size: '$review_docs',
              },
            },
          },{ "$sort": { "avgRating": -1 } },{ "$limit": 3 }
      ])
        .then(allSchools => res.json({allSchools}))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.worstschools = (req, res) => {
    console.log("estoy buscando todo ordenado");
    School.aggregate([{ $lookup: {from: 'reviews', localField: 'reviews', foreignField: '_id', as: 'review_docs'} },
        {
            $addFields: {
                avgRating: {
                "$avg": "$review_docs.promedio",
              },
              nRatings: {
                $size: '$review_docs',
              },
            },
          },{ "$sort": { "avgRating": 1 } },{ "$limit": 3 }
      ])
        .then(allSchools => res.json({allSchools}))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.schoolByIdWithAverage = (req, res) => {
  console.log(req.params)
  School.aggregate([
    {$match:{_id:new mongoose.Types.ObjectId(req.params.id)}},
    {  $lookup: { from: 'reviews', 
                  localField: 'reviews', 
                  foreignField: '_id', 
                  as: 'review_docs'} },
    {
    $addFields: {
      avgRating: {
        "$avg": "$review_docs.promedio",
      },
    },
  },
])
      .then(schoolById => res.json({schoolById }))
      .catch(err => res.json({ message: "Algo salio mal", error: err }));
};
