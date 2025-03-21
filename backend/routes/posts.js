const express=require('express')
const router=express.Router()
const Category = require('../models/Category')
const Post=require('../models/Post')

//Get all post
router.get('/',async(req,res)=>{
    try{
        const posts= await Post.find()
        res.json(posts)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


// Get a Single Post By Id
router.get('/:id',async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:'post not found'})
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
})


//create new post
router.post('/',async(req,res)=>{
    const post= new Post({
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        author:req.body.author,
        image:req.body.image,
    })

    try{
        const newPost=await post.save();
        res.status(201).json(newPost)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

//update an existing post
router.put('/:id',async(req,res)=>{
    try {
       const post= await Post.findById(req.params.id)
       if(!post){
        return res.status(404).json({message:"Post Not Found"})
       }

       post.title=req.body.title || post.title;
       post.content=req.body.content || post.content;
       post.category=req.body.category || post.category;
       post.author=req.body.author || post.author;
       post.image=req.body.image || post.image;
       post.updatedAt=Date.now()

       const updatedPost=await post.save();
       res.json(updatedPost)

    } catch (error) {
       res.status(404).json({message:error.message}) 
    }
})


//delete a post
router.delete('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            return  res.status(404).json({message:"Post Not Found "})
        }
        await  Post.findByIdAndDelete(post._id)
        res.json({message:"Post Deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


// fetch post by catagory ID 
router.get('/category/:categoryId',async (req,res)=>{
    try {
        const categoryId=req.params.categoryId;

        //Validate Category ID
        const categoryExists=await Category.findById(categoryId)

        if(!categoryExists){
            res.status(400).json({message:'Invalid Cateory ID'})
        }

        // Fetch posts
       const posts= await Post.find({category:categoryId}).populate('category')
       res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
 })

module.exports=router;


