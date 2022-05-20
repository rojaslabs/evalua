const mongoose = require("mongoose");

console.log(process.env.DB_LINK)
mongoose.connect(process.env.DB_LINK, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("DB is Working"))
	.catch(err => console.log("Something is wrong", err));