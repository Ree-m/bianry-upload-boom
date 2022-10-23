const Comment=require("../models/Comment");

module.exports={
    createComment:async(req,res)=>{
        try{
            await Comment.create({     
                comment: req.body.comment,  //name:comment in form,so the parameter name is comment
                likes: 0,
                post: req.params.id,
                madeBy:req.user.userName

        })
        console.log("Comment has been added!!!")
        // console.log(req.params)
        res.redirect("/post/"+req.params.id)
           }catch(err){
            console.log(`ERROR ${err}`);

        }
    }

}
        
    

// test test