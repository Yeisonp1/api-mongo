require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = "mongodb+srv://user3715:user3715@cluster0.uaqiq0y.mongodb.net/?retryWrites=true&w=majority";

class contactoService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const contactos = client.db("constru-tech").collection("Contacto").find({}).limit(20).sort({_id:-1}).toArray()
            if(contactos){
                return contactos                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const usuario = client.db("constru-tech").collection("Contacto").findOne({_id: new ObjectId(id)})
            if(usuario){
                return usuario                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("constru-tech").collection("Contacto").insertOne(body)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addMany(arraycontactos){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Contacto").insertMany(arraycontactos)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,nombre,apellido){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Contacto").updateOne({_id: new ObjectId(id)},{$set:{nombre:nombre,apellido:apellido}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateMany(condicion, actualizacion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Contacto").updateMany({condicion},{$set:{actualizacion}})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Contacto").deleteOne({_id: new ObjectId(id)})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteMany(condicion){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Contacto").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = contactoService;