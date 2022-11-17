require("dotenv").config();
require("express-async-errors");
const express = require("express");
const routes = require("./routes/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Cover Letter Generator",
			version: "1.0.0",
			description: "API documentation for a Cover letter generator",
		},
		servers: [
			{
				url: "http://localhost:5001",
				description: "Local",
			},
			// {
			// 	url: "http://www.aplicar.herokuapp",
			// 	description: "Development",
			// },
			// {
			// 	url: "http://www.aplicar.com",
			// 	description: "Production",
			// },
		],
	},
	apis: ["./server/routes/*.js"],
};

const openapiSpecification = swaggerJsDoc(options);
const port = process.env.PORT || 5001;

const app = express();

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
	res.send("templates api");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
	try {
		//connect DB
		// await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
