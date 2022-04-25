import { getAllFlights } from "../models/FlightsModel.js"

export async function getAll(req, res, flightsCollection) {
    const allFlights = await flightsCollection.find({}).toArray();
    console.log(allFlights);
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(allFlights));
}
export async function getById(req, res, num, flightsCollection) {
    const query = { id: num }
    const answerById = await flightsCollection.find(query).toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(answerById));

}
export async function post(req, res, id, flightsCollection) {
    //console.log(flightsCollection);
    const allFlights = await getAllFlights();

    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', async () => {
        body = Buffer.concat(body).toString();
        const bodyObject = JSON.parse(body);
        res.on('error', (err) => {
            console.error(err);
        });
        console.log(bodyObject);
        await flightsCollection.insertOne(bodyObject);

        allFlights[id - 1] = bodyObject;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allFlights));
        res.end();
    });
}

export async function put(req, res, num, flightsCollection) {
    const query = { id: num }
    //const allFlights = await getAllFlights();
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', async () => {
        //arrumar o put
        body = Buffer.concat(body).toString();
        const objBody = JSON.parse(body);
        for (const [key, value] of Object.entries(objBody)) {
            flightsCollection.updateOne(query, {
                $set: {
                    [key]: value
                }
            })
            //allFlights[id - 1][key] = value;
        }
        const allFlights = await flightsCollection.find({}).toArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(allFlights));
    });
}
export async function deletes(req, res, num, flightsCollection) {
    const query = { id: num }
    flightsCollection.deleteOne(query);
    const allFlights = await flightsCollection.find({}).toArray();
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(allFlights));
}