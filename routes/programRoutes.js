const express = require('express');
const path = require('path');
const { verifyToken } = require('../middlewares/verifyToken');
const { addProgram, getAllProjectsByAminId, deleteProject, getAllProjects } = require('../controllers/programController');

const router = express.Router();

router.post('/add-program', verifyToken, addProgram);
router.get('/all-programs/:adminId', getAllProjectsByAminId)
router.delete('/delete-program/:projectId', deleteProject)
router.get('/getAllPrograms', getAllProjects)

router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
})
module.exports = router