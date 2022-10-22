const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  post: { //the post the comment is tied to
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  madeBy: {//the user that made the comment
    type:String,
    reuired:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Comment", CommentSchema);
