const Admin = require('../models/Admin');
const Program = require('../models/Program');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProgram = async(req, res)=>{
    const{projectname, description} = req.body;
    const image = req.file ? req.file.filename:undefined;
    try {
        const admin = await Admin.findById(req.adminId);
        if(!admin){
            res.status(404).json({message: "Admin not found"})
            console.log("Admin not found")
        }
        const program = new Program({
            projectname,
            description,
            image,
            admin: admin._id
        })
        const savedProgram = await program.save();
        const programId = savedProgram._id;
        admin.program.push(savedProgram);
        await admin.save();

        res.status(200).json({success:"Program Added successfully", programId})
        } catch (error) {
            console.log(error)
            res.status(500).json("Internal Server Error");    
    }
}
const getAllProjectsByAminId = async(req, res)=>{
    const adminId = req.params.adminId;
    try {
        const admin = await Admin.findById(adminId);
        if(!admin){
            return res.status(400).json({message:"Admin Not found"})
        }
        const program = await Program.find({admin: adminId});
        res.status(200).json({program} )
    } catch (error) {
        console.log(error)
            res.status(500).json("Internal Server Error");
    }
}
const deleteProject = async(req, res)=>{
    const projectId = req.params.projectId;
    try {
        const deleteProject = await Program.findByIdAndDelete(projectId);
        if(!deleteProject){
            return res.status(400).json("Deleting failed")
        }
        res.status(200).json({success: "Deleted Successfully...!!!!"})
    } catch (error) {
        console.log(error)
            res.status(500).json("Internal Server Error");
    }
}
const getAllProjects = async(req, res)=>{
    try {
        const programs = await Program.find();
        if(!programs){
            return res.ststus(400).json({message: "Programs not Found"})
        }
        res.status(200).json({programs})
    } catch (error) {
        console.log(error)
            res.status(500).json("Internal Server Error");
    }
}
module.exports = {addProgram:[upload.single('image'), addProgram], getAllProjectsByAminId, deleteProject, getAllProjects};