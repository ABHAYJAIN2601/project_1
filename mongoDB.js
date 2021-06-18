const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('Mongoo Db connected..');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};
module.exports = connectDB;