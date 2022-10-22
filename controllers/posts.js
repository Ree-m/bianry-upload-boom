const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment=require("../models/Comment")
const User =require("../models/User")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean(); //lean makes the POST mongodb document(object-like) that we get leaner.It gets rid of all the extra stuff that we dont need in the mongodb document.We used it to make it faster.
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments=await Comment.find({post:req.params.id}).sort({createdAt:"desc"}).lean();
      const madeBy=await User.findById(post.user);
      const commentBy=await Comment.find({comments:comments})
      res.render("post.ejs", { post: post, user:req.user  , comments: comments,madeBy:madeBy,commentBy:commentBy});
    } catch (err) {
      console.log(`ERROR${err}`);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({ 
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(`ERROR${err}`);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 }, //increment by 1
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
