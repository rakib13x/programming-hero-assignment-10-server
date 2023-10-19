const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Brand Shop server is running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kyfxv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const amdDatabase = client.db("amdDb");
    const amdCollection = amdDatabase.collection("amd");
    const googleDatabase = client.db("googleDb");
    const googleCollection = googleDatabase.collection("google");
    const appleDatabase = client.db("appleDb");
    const appleCollection = appleDatabase.collection("apple");
    const intelDatabase = client.db("intelDb");
    const intelCollection = intelDatabase.collection("intel");
    const samsungDatabase = client.db("samsungDb");
    const samsungCollection = samsungDatabase.collection("samsung");
    const sonyDatabase = client.db("sonyDb");
    const sonyCollection = sonyDatabase.collection("sony");

    app.get("/amd", async (req, res) => {
      const cursor = amdCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/amd/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await amdCollection.findOne(query);
      res.send(result);
    });
    app.post("/amd", async (req, res) => {
      const newAmd = req.body;
      console.log(newAmd);

      const result = await amdCollection.insertOne(newAmd);

      res.send(result);
    });

    app.put("/amd/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedAmd = req.body;
      const amd = {
        $set: {
          name: updatedAmd.name,
          quantity: updatedAmd.quantity,
          supplier: updatedAmd.supplier,
          taste: updatedAmd.taste,
          category: updatedAmd.category,
          details: updatedAmd.details,
          photo: updatedAmd.photo,
        },
      };

      const result = await amdCollection.updateOne(filter, amd, options);
      res.send(result);
    });

    app.delete("/amd/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await amdCollection.deleteOne(query);
      res.send(result);
    });
    app.get("/google", async (req, res) => {
      const cursor = googleCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/google/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await googleCollection.findOne(query);
      res.send(result);
    });

    app.post("/google", async (req, res) => {
      const newGoogle = req.body;
      console.log(newGoogle);

      const result = await googleCollection.insertOne(newGoogle);

      res.send(result);
    });

    app.put("/google/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedGoogle = req.body;
      const google = {
        $set: {
          name: updatedGoogle.name,
          quantity: updatedGoogle.quantity,
          supplier: updatedGoogle.supplier,
          taste: updatedGoogle.taste,
          category: updatedGoogle.category,
          details: updatedGoogle.details,
          photo: updatedGoogle.photo,
        },
      };

      const result = await googleCollection.updateOne(filter, google, options);
      res.send(result);
    });

    app.delete("/google/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await googleCollection.deleteOne(query);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});
