const express = require('express');
const {MongoClient, ObjectId}= require('mongodb');
const bodyParser = require('body-parser');
const contactoService = require('../services/contactoService');
const router = express.Router();
// const uri = "mongodb+srv://user3715:user3715@cluster0.uaqiq0y.mongodb.net/?retryWrites=true&w=majority"; 
const service = new contactoService

//find all contactos
router.get('/', async (req, res) =>{
    const contactos = await service.find()
    if (contactos) {
        res.status(200).send(contactos)
    } else {
        res.status(404).send("No se encontraron los contactos")
    }
})

router.get('/:id', async (req, res) =>{
    const id = req.params.id
    const contacto = await service.findOne(id)
    if (contacto) {
        res.status(200).send(contacto)
    } else {
        res.status(404).send(`No se encontro el contacto con el id:${id}`)
    }
})

//insertOne contacto
router.post("/addContacto", async (req, res) =>{
    const result = await service.add(req.body)
    if (result) {
        res.status(200).json({
            message:"Se agrego un nuevo contacto",result
        })
    } else {
        res.status(404).send("Error al agregar el contacto")
    }
})

//inserMany
router.post("/addContactos", async (req, res) =>{
    const result = await service.addMany(req.body)
    if (result) {
        res.status(200).json({
            message:`Se agregaron los contactos`
        })
    } else {
        res.status(404).send("Error al agregar los contactos")
    }
})

//updateOne
router.patch('/:id', async (req, res) =>{
    const id = req.params.id
    const {nombre,nit} = req.body
    const result = await service.update(id,nombre,nit)
    if (result.modifiedCount > 0) {
        res.status(200).json({
            message:`Se actualizo el contacto con el id: ${id} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar el contacto")
    }
})

//updateMany
router.patch('/updateContacto/:campoCond/:valorCond/', async (req, res) => {
    const {campoCond,valorCond} = req.params
    const {campoUpdate,valorUpdate} = req.body
    const condicion = `{"${campoCond}":"${valorCond}"}`
    const actualizacion = `{"${campoUpdate}":"${valorUpdate}"}`
    const result = await service.updateMany(condicion,actualizacion)
    if (result) {
        res.status(200).json({
            message:`Se actualizaron contactos con la condicion:${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar actualizar contactos")
    }
})


//deleteOne
router.delete('/:id', async (req, res) =>{
    const id = req.params.id
    const result = await service.delete(id)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se elimino el contacto con el id: ${id}`
        })
    } else {
        res.status(404).send("Error al intentar eliminar el contacto")
    }
})

//deleteMany
router.delete('/deleteContactos/:campo/:valor', async (req, res) =>{
    const {campo,valor} = req.params
    const condicion = campo+":"+valor
    const result = await service.deleteMany(condicion)
    console.dir(result)
    console.dir(condicion)
    if (result.acknowledged == true && result.deletedCount > 0) {
        res.status(200).json({
            message:`Se eliminaron los contactos con la condicion: ${condicion} `
        })
    } else {
        res.status(404).send("Error al intentar eliminar contactos")
    }
    // console.log(condicion)
})

module.exports = router;