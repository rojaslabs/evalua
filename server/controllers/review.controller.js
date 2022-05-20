const { Review } = require("../models/review.model");


module.exports.allReviews = (req, res) => {
    console.log("estoy buscando todo");
    Review.find().populate('author')
        .then(allReviews => res.json({allReviews}))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.reviewById = (req, res) => {
    Review.findOne({ _id: req.params.id }).populate('author')
        .then(reviewById => res.json({reviewById }))
        .catch(err => res.json({ message: "Algo salio mal", error: err }));
};

module.exports.createNewReview = (req, res) => {
    console.log(req.body)
    Review.create(req.body)
        .then((newReview)=>res.json({newReview}))
        .catch((err)=> res.json({message: "Algo salio mal", error: err}))
};

module.exports.updateReview = (req, res) => {
    Review.findOneAndUpdate({_id: req.params.id},req.body,{new:true})
        .then((review)=>res.json({review: review}))
        .catch((err)=>res.json({message: "Algo salio mal", error: err}))
};

module.exports.deleteReview = (req, res) => {
    console.log(req.params.id)
    Review.deleteOne({_id: req.params.id})
        .then((result)=>res.json({resultado: result}))
        .catch((err)=>res.json({message: "Algo salio mal", error: err}))
};

module.exports.getReviewByUser = (req, res) => {
    Review.find({ author: req.params.id }).populate('author')
        .then((allReviews) => res.json({ reviews: allReviews }))
        .catch((err) => res.json({ message: "Algo salio mal", error: err }))
}