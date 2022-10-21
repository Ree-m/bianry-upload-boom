const express=require(express);
const router = express.Router()
const commentsController=require("..controllers/comments");
const { model } = require("mongoose");

router.post("/createComment",commentsController.createComment);
router.put("likeComment",commentsController.likeComment);
router.put("deleteComment",commentsController.deleteComment);

model.exports=router;

