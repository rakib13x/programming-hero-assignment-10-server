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

    //amd Database
    const amdDatabase = client.db("amdDb");
    const amdCollection = amdDatabase.collection("amd");
    //google Database
    const googleDatabase = client.db("googleDb");
    const googleCollection = googleDatabase.collection("google");
    //apple Database
    const appleDatabase = client.db("appleDb");
    const appleCollection = appleDatabase.collection("apple");
    //intel Database
    const intelDatabase = client.db("intelDb");
    const intelCollection = intelDatabase.collection("intel");
    //samsung Database
    const samsungDatabase = client.db("samsungDb");
    const samsungCollection = samsungDatabase.collection("samsung");
    //sony Database
    const sonyDatabase = client.db("sonyDb");
    const sonyCollection = sonyDatabase.collection("sony");
    //mycart Database
    const myCartDatabase = client.db("myCartDb");
    const myCartCollection = myCartDatabase.collection("myCart");

    //amd product CRUD Operation
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
          image: updatedAmd.image,
          brand: updatedAmd.brand,
          category: updatedAmd.type,
          details: updatedAmd.price,
          photo: updatedAmd.description,
          rating: updatedAmd.rating,
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
    //cart
    app.get("/myCart", async (req, res) => {
      const cursor = myCartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/myCart", async (req, res) => {
      const product = req.body;
      console.log(product);

      if (product.type === "amd") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else if (product.type === "apple") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else if (product.type === "google") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else if (product.type === "intel") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else if (product.type === "samsung") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else if (product.type === "sony") {
        const result = await myCartCollection.insertOne(product);
        res.send(result);
      } else {
        res.status(400).send("Invalid request");
      }
    });
    app.delete("/myCart/:id", async (req, res) => {
      const id = req.params.id;
      console.log("Received DELETE request for id:", id);

      try {
        console.log("Received ID:", id);

        const result = await myCartCollection.deleteOne({ _id: id });

        console.log("Delete result:", result);

        if (result.deletedCount === 0) {
          return res.status(404).send("Item not found");
        }

        res.send(result);
      } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Error deleting item.");
      }
    });
    //google product CRUD Operation
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
          image: updatedGoogle.image,
          brand: updatedGoogle.brand,
          category: updatedGoogle.type,
          details: updatedGoogle.price,
          photo: updatedGoogle.description,
          rating: updatedGoogle.rating,
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

    //apple product CRUD Operation

    app.get("/apple", async (req, res) => {
      const cursor = appleCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/apple/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await appleCollection.findOne(query);
      res.send(result);
    });

    app.post("/apple", async (req, res) => {
      const newApple = req.body;
      console.log(newApple);

      const result = await appleCollection.insertOne(newApple);

      res.send(result);
    });

    app.put("/apple/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedApple = req.body;
      const apple = {
        $set: {
          name: updatedApple.name,
          image: updatedApple.image,
          brand: updatedApple.brand,
          category: updatedApple.type,
          details: updatedApple.price,
          photo: updatedApple.description,
          rating: updatedApple.rating,
        },
      };

      const result = await appleCollection.updateOne(filter, apple, options);
      res.send(result);
    });

    app.delete("/apple/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await appleCollection.deleteOne(query);
      res.send(result);
    });

    //intel product CRUD Operation
    app.get("/intel", async (req, res) => {
      const cursor = intelCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/intel/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await intelCollection.findOne(query);
      res.send(result);
    });

    app.post("/intel", async (req, res) => {
      const newIntel = req.body;
      console.log(newIntel);

      const result = await intelCollection.insertOne(newIntel);

      res.send(result);
    });

    app.put("/intel/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedIntel = req.body;
      const intel = {
        $set: {
          name: updatedIntel.name,
          image: updatedIntel.image,
          brand: updatedIntel.brand,
          category: updatedIntel.type,
          details: updatedIntel.price,
          photo: updatedIntel.description,
          rating: updatedIntel.rating,
        },
      };

      const result = await intelCollection.updateOne(filter, intel, options);
      res.send(result);
    });

    app.delete("/intel/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await intelCollection.deleteOne(query);
      res.send(result);
    });

    //Samsung product CRUD Operation
    app.get("/samsung", async (req, res) => {
      const cursor = samsungCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/samsung/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await samsungCollection.findOne(query);
      res.send(result);
    });

    app.post("/samsung", async (req, res) => {
      const newSamsung = req.body;
      console.log(newSamsung);

      const result = await samsungCollection.insertOne(newSamsung);

      res.send(result);
    });

    app.put("/samsung/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedSamsung = req.body;
      const samsung = {
        $set: {
          name: updatedSamsung.name,
          image: updatedSamsung.image,
          brand: updatedSamsung.brand,
          category: updatedSamsung.type,
          details: updatedSamsung.price,
          photo: updatedSamsung.description,
          rating: updatedSamsung.rating,
        },
      };

      const result = await samsungCollection.updateOne(
        filter,
        samsung,
        options
      );
      res.send(result);
    });

    app.delete("/samsung/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await samsungCollection.deleteOne(query);
      res.send(result);
    });

    //Sony product CRUD Operation
    app.get("/sony", async (req, res) => {
      const cursor = sonyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/sony/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sonyCollection.findOne(query);
      res.send(result);
    });

    app.post("/sony", async (req, res) => {
      const newSony = req.body;
      console.log(newSony);

      const result = await sonyCollection.insertOne(newSony);

      res.send(result);
    });

    app.put("/sony/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedSony = req.body;
      const sony = {
        $set: {
          name: updatedSony.name,
          image: updatedSony.image,
          brand: updatedSony.brand,
          category: updatedSony.type,
          details: updatedSony.price,
          photo: updatedSony.description,
          rating: updatedSony.rating,
        },
      };

      const result = await sonyCollection.updateOne(filter, sony, options);
      res.send(result);
    });

    app.delete("/sony/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sonyCollection.deleteOne(query);
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
