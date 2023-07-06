require("dotenv").config()
const {MongoClient, ObjectId} = require("mongodb")
const uri = "mongodb+srv://user3715:user3715@cluster0.uaqiq0y.mongodb.net/?retryWrites=true&w=majority";

class rolService{
    constructor(){}

    async find(){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const proveedores = client.db("constru-tech").collection("Proveedores").find({}).limit(20).sort({_id:-1}).toArray()
            if(proveedores){
                return proveedores
            }
        } catch (error) {
            console.log(error)
        }
    }

    async findOne(id){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const proveedores = client.db("constru-tech").collection("Proveedores").findOne({_id: new ObjectId(id)})
            if(proveedores){
                return proveedores               
            }
        } catch (error) {
            console.log(error)
        }
    }

    async add(body){
        const client = new MongoClient(uri)
        try {
            await client.connect();
            const result = await client.db("constru-tech").collection("Proveedores").insertOne(body)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addMany(arrayProv){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Proveedores").insertMany(arrayProv)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id,tipo,estado){
        const client = new MongoClient(uri)
        try {
            await client.connect()
            const result = await client.db("constru-tech").collection("Proveedores").updateOne({_id: new ObjectId(id)},{$set:{tipo:tipo,estado:estado}})
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
            const result = await client.db("constru-tech").collection("Proveedores").updateMany({condicion},{$set:{actualizacion}})
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
            const result = await client.db("constru-tech").collection("Proveedores").deleteOne({_id: new ObjectId(id)})
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
            const result = await client.db("constru-tech").collection("Proveedores").deleteMany({condicion})
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = rolService;