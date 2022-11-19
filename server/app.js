require("express-async-errors");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
<<<<<<< HEAD
const swaggerDocument = require("./utils/swaggerOptions.json")
=======
const swaggerDocument = require("./utils/swaggerOptions.json");
>>>>>>> dev
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
<<<<<<< HEAD

const port = process.env.PORT || 5001;
const fileUpload = require("express-fileupload");
const app = express();

require("dotenv").config();

=======
const connectDB = require("./db/connect");
require("dotenv").config();

const port = process.env.PORT || 5000;
const fileUpload = require("express-fileupload");
const app = express();

>>>>>>> dev
app.use(
	"/cvg-documentation",
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocument)
);

//Routers
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const cvToCoverLetterRoutes = require("./routes/cvToCoverLetterRoutes");
<<<<<<< HEAD
// database
//const connectDB = require("./db/connect");
=======
>>>>>>> dev

app.use(
	"/cvg-documentation",
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocument)
);

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const textToPdf = require("./utils/textToPdf");


app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
	fileUpload({
		limits: {
			fileSize: 5 * 1024 * 1024, //5MB
		},
		abortOnLimit: true,
	})
);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", templateRoutes);
app.use("/api/v1", cvToCoverLetterRoutes);

app.get("/", (req, res) => {
	res.send("templates api");
	textToPdf();
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		//connect DB
		connectDB(process.env.MONGO_URI).then(() => {
			console.log("Connection succesful");
		});
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();

module.exports = app;
