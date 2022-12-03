require("dotenv").config();
const Admin = require("../models/Admin");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const {
	StatusCodes
} = require("http-status-codes");
const {
	BadRequestError,
	NotFoundError
} = require("../errors");

const createPost = async (req, res) => {
	const {
		adminId,
		title,
		content
	} = req.body;
	if (!adminId || !title || !content)
		return res
			.status(StatusCodes.NO_CONTENT)
			.json({
				message: "All Fields are required"
			});
	const admin = await Admin.findOne({
		_id: adminId
	});
	if (!mongoose.Types.ObjectId.isValid(adminId) || !admin) {
		throw new BadRequestError(
			"This adminId is not valid or the admin does not exist in our database."
		);
	}
	const post = new Blog({
		title,
		content
	});
	await post.save();

	return res
		.status(StatusCodes.CREATED)
		.json({
			status: "success", data: post
		});
};

const deleteABlogPost = async (req, res) => {
	const {
		blogId
	} = req.params;
	
	const blog = await Blog.findById({_id: blogId});

	if (!mongoose.Types.ObjectId.isValid(blogId) || !blog)
		throw new BadRequestError(
			`Invalid Blog ID request or Blog  with id ${blogId} does not exist.`
		);

	await Blog.findByIdAndDelete(blogId);
	return res.status(StatusCodes.OK).json({
		status: "success"
	});
};

const searchPost = async (req, res) => {
	const {
		query
	} = req.query;
	if (!query) {
		throw new NotFoundError("What are we searching for?");
	}
	const posts = await Blog.find({
		title: {
			$regex: new RegExp(query + ".*", "i")
		},
	});

	if (!posts || posts.length === 0) {
		throw new NotFoundError("We couldn't find any blog with that title");
	}
	return res
		.status(StatusCodes.OK)
		.json({
			message: "Blog found successfully.",
			query,
			posts
		});
};

const getABlogPost = async (req, res) => {
	const {
		blogId
	} = req.params;

	if (!mongoose.Types.ObjectId.isValid(blogId)) {
		throw new BadRequestError(`Invalid Blog ID request.`);
	}
	const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new BadRequestError(`Blog with id ${blogId} does not exist.`);
	}



	return res.status(StatusCodes.OK).json({
		message: "Blog request was successfully.",
		data: blog,
	});
};

const updatePost = async (req, res, next) => {

	const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!blog) {
		return next(new BadRequestError("No Blog found with this ID."));
	} else {
		return res.status(StatusCodes.OK).json({
			message: 'update successful',
			data: blog
		});
	}
};

const getAllPosts = async (req, res) => {
	const result = await Blog.find({});

	if (result) {
		return res
			.status(200)
			.json({
				message: "Successfully retrieved.",
				posts: result
			});
	} else {
		return res.status(404).json({
			message: "Post not found"
		});
	}
};

module.exports = {
	createPost,
	getABlogPost,
	deleteABlogPost,
	searchPost,
	updatePost,
	getAllPosts,
};