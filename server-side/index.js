const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.port || 5000;

app.use(cors()); // to get the data in client-side from server-side // to send data in client-side
app.use(express.json())



// pass :  PZB2CanjjzUQyA8n

//connection string
const uri = 'mongodb+srv://habiburmunna50:PZB2CanjjzUQyA8n@cluster0.txvs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri); // make a client , pass the uri to the constructor

// Get the database and collection on which to run the operation    
const userCollection = client.db('userDB2').collection('users') // make the collection

async function main() {
    try {
        await client.connect(); // connect to db

        //insert a single data/document
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
            console.log(result.insertedId)
        })

        //retrieve all data from mongoDB to server-side
        app.get('/users', async (req, res) => {
            const cursor = await userCollection.find();
            const allUsers = await cursor.toArray();
            res.send(allUsers)
        })

        app.put('/', (req, res) => {

        })

        //delete a specific user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
            // console.log(id)
        })
    }
    catch (error) {
        console.log(error)
    }
}
main();


app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})