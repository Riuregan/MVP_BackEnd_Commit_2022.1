import { createServer } from 'http';
import { getAll, getById, post, put, deletes } from "./controllers/FlightsController.js";
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://riuregan:torrada186@cluster0.se4ge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(uri, (err, client) => {
    // ... do something here
    if (err) return console.error(err)
    console.log('Connected to Database');
    const db = client.db("flights-database");
    var flightsCollection = db.collection("flights");
})


const server = createServer((req, res) => {
    var path = req.url.split("/");
    //const x = flightsCollection;
    const route = path[1];
    const id = path[2];
    if (route === "flights") {
        switch (req.method) {
            case "GET":
                if (id === undefined) {
                    getAll(req, res)
                } else {
                    getById(req, res, id);
                }
                break;
            case "POST":
                post(req, res, id, x);
                break;
            case "PUT":
                put(req, res, id);
                break;
            case "DELETE":
                deletes(req, res, id);
                break;
            default:
                res.end(JSON.stringify({ mensagem: "unsupported operation" }));
        }
    } else {
        res.end(JSON.stringify({ mensagem: "error" }));
    }
});
const PORT = 5000;

server.listen(PORT, () => {
    console.log("ouvindo o servidor na porta " + PORT);
});

