const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const bodyParser = require('body-parser');
const proveedorService = require('../services/proveedorService');
const router = express.Router();
//const uri = "mongodb+srv://user3715:user3715@cluster0.uaqiq0y.mongodb.net/?retryWrites=true&w=majority";
const service = new proveedorService

//find all proveedores
router.get('/', async (req, res) =>{
    const proveedores = await service.find()
    if (proveedores) {
        res.status(200).send(proveedores)
    } else {
        res.status(404).send("No se encontraron los proveedores")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const proveedor = await service.findOne(id)   
    if (proveedor) {
        res.status(200).send(proveedor)
    } else {
        res.status(404).send(`No se encontro el proveedor con el id:${id}`)
    }
})

//insertOne proveedor
router.post("/addProveedor", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un nuevo proveedor",result
        })
    } else {
        res.status(404).send("Error al agregar el proveedor")
    }
})

//inserMany
router.post("/addProveedores", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron los proveedores`
        })
    } else {
        res.status(404).send("Error al agregar los proveedores")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {tipo,estado} = req.body
    const result = await service.update(id,tipo,estado)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el proveedor con el id: ${id} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar el proveedor")
    }
})

//updateMany
router.patch('/updateProveedores/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron proveedores con la condicion:${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar proveedores")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el proveedor con el id: ${id}`
        })
    } else {
        res.status(404).send("Error al intentar eliminar el proveedor")
    }
})

//deleteMany
router.delete('/deleteProveedores/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron los proveedores con la condicion: ${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar eliminar proveedores")
    }
    // console.log(condicion)
})




module.exports = router;