const express = require('express');
//const jwt= require('jsonwebtoken')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();
require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
const app = express();
// const app = express();

//midelware
app.use(cors())
app.use(express.json());


// mongodb connect





const uri = "mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.td7ox.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db("assignment12").collection("products");
        const userCollection = client.db("assignment12").collection("users");
        const reviewCollection = client.db("assignment12").collection("review");
        const orderCollection = client.db("assignment12").collection("order");

        // user management 
        app.get('/userget', async (req, res) => {
            const products = await userCollection.find({}).toArray();
            res.send(products)
        })
        app.get('/userget/:email', async (req, res) => {
            const email = req.params.email
            const query = { "email": email };
            const user = await userCollection.findOne(query);
            res.send(user)
        })
        app.post('/userpost', async (req, res) => {
            const newItem = req.body;
            const result = await userCollection.insertOne(newItem);
            res.send(result);
        })
        app.put('/userput/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const update = await userCollection.updateOne({ _id: ObjectId(id) }, { $set: data })
            res.send(update)
        })
        app.delete('/userdelete/:id', async (req, res) => {
            const id = req.params.id;
            const deleteuser = await userCollection.deleteOne({ _id: ObjectId(id) })
            res.send(deleteuser)
        })

        app.post('/userupdate/:id', async (req, res) => {
            const id = req.params.id;
            const newdate = req.body;
            const updateuser = { $set: newdate };
            const options = { upsert: true };
            const update = await userCollection.updateOne({ _id: ObjectId(id) }, updateuser, options)
            res.send(update);
        })



        // product management
        app.get('/productget', async (req, res) => {
            const products = await productCollection.find({}).toArray();
            res.send(products)
        })
        app.get('/getsingleproduct/:id', async (req, res) => {
            const pId = req.params.id;

            const products = await productCollection.find({ _id: ObjectId(pId) }).toArray();
            res.send(products)
        })
        app.post('/productpost', async (req, res) => {
            const newItem = req.body;
            const result = await productCollection.insertOne(newItem);
            res.send(result);
        })
        app.delete('/productdelete/:id', async (req, res) => {
            const id = req.params.id;
            const deleteProduct = await productCollection.deleteOne({ _id: ObjectId(id) })
            res.send(deleteProduct)
        })
        app.put('/productput', async (req, res) => {
            res.send('Got a PUT request at /user')
        })

        app.get('/orderget', async (req, res) => {
            const products = await orderCollection.find({}).toArray();
            res.send(products)
        })
        app.get('/ordergetbyid/:id', async (req, res) => {
            const id = req.params.id;
            const order = await orderCollection.find({ _id: ObjectId(id) }).toArray();
            res.send(order)
        })
        app.get('/orderget/:email', async (req, res) => {
            const email = req.params.email
            const query = { 'user': email };
            console.log(query);
            const user = await orderCollection.find(query).toArray();
            res.send(user)
        })
        app.post('/orderpost/:email', async (req, res) => {
            const newItem = req.body;
            const result = await orderCollection.insertOne(newItem);
            res.send(result);
        })
        app.put('/orderput/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const update = await orderCollection.updateOne({ _id: ObjectId(id) }, { $set: data })
            res.send(update)
        })
        app.delete('/orderdelete/:id', async (req, res) => {
            const id = req.params.id;
            const deleteuser = await orderCollection.deleteOne({ _id: ObjectId(id) })
            res.send(deleteuser)
        })

        app.post('/orderupdate/:id', async (req, res) => {
            const id = req.params.id;
            const newdate = req.body;
            console.log(id);
            const updateuser = { $set: newdate };
            const options = { upsert: true };
            const update = await orderCollection.updateOne({ _id: ObjectId(id) }, updateuser, options)
            res.send(update);
        })


        // user review 
        app.get('/reviewget', async (req, res) => {
            const products = await reviewCollection.find({}).toArray();
            res.send(products)
        })
        app.get('/reviewget/:email', async (req, res) => {
            const mail = req.params.email;
            const products = await reviewCollection.find({ "email": mail }).toArray();
            res.send(products)
        })
        app.post('/userreview', async (req, res) => {
            const newItem = req.body;
            const result = await reviewCollection.insertOne(newItem);
            res.send(result);
        })
        app.delete('/reviewdelete', async (req, res) => {
            res.send('Got a DELETE request at /user')
        })
        // app.put('/userput', async (req, res) => {
        //     res.send('Got a PUT request at /user')
        // })
        app.post('/reviewupdate/:email', async (req, res) => {
            const mail = req.params.email;
            const newdate = req.body;
            const updateuser = { $set: newdate };
            const options = { upsert: true };
            const update = await reviewCollection.updateOne({ "email": mail }, updateuser, options)
            res.send(update);
        })



    } catch (error) {
        console.dir(error);
    }
}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})