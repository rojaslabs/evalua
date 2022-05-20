const UserController = require('../controllers/user.controller');
const ReviewController = require('../controllers/review.controller')
const SchoolController = require('../controllers/school.controller')

module.exports = function(app){

    app.post("/api/register", UserController.Register);
    app.post("/api/login", UserController.Login);
    app.post("/api/logout", UserController.Logout);
    app.get("/api/users", UserController.getAll);
    app.get('/api/user/:id', UserController.getUser);

    app.post("/api/review/create", ReviewController.createNewReview );
    app.put("/api/review/update/:id", ReviewController.updateReview);
    app.delete("/api/review/delete/:id", ReviewController.deleteReview);
    app.get("/api/allreview", ReviewController.allReviews);
    app.get('/api/review/:id', ReviewController.reviewById);

    app.post("/api/school/create", SchoolController.createNewSchools );
    app.put("/api/school/update/:id", SchoolController.updateSchools);
    app.delete("/api/school/delete/:id", SchoolController.deleteSchools);
    app.get("/api/allschool", SchoolController.allSchools);
    app.get('/api/school/:id', SchoolController.schoolById);

    app.get("/api/allreviewsbyuser/:id", ReviewController.getReviewByUser);

    app.get("/api/allschoolOrdered", SchoolController.schoolsOrderedByRating);
    app.get("/api/bestschools", SchoolController.bestschools);
    app.get("/api/worstschools", SchoolController.worstschools);
    app.get('/api/school/average/:id', SchoolController.schoolByIdWithAverage);

}

