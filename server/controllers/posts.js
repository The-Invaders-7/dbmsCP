import mongoose from 'mongoose';
import PostMessage from '../models/posts.js'

// read
export const getPosts = async (req, res) =>{
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

// create
export const createPost = async (req, res) => {
    
    const newPost = PostMessage(req.body);

    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(e){
        res.status(404).json({message: e.message});
    }
}

// update
export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).json({message: 'No post with given id exists'}); 

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id} , {new:true});

    res.json(updatePost);
}

// delete
export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'No post with given id exists'})

    try{
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({message: "successfully deleted!"});

    }catch(e){
        res.status(404).json({message: e});

    }
}

// like
export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({message: 'No post with given id exists'}); 

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1} , {new:true})

    res.json(updatedPost);
}
