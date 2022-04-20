import { getAllFlights } from "../models/FlightsModel.js"

export async function getAll(req, res) {
    const allFlights = await getAllFlights();
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(allFlights));
}
export async function getById(req, res, num) {
    const allFlights = await getAllFlights();
    for (var index in allFlights) {
        if (allFlights.hasOwnProperty(index)) {
            if (allFlights[index]["id"] == num) {
                var answerById = allFlights[index];
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(answerById));
            }

        }
    }
}
export async function post(req, res, id, flightsCollection) {
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

        //await flightsCollection.insertOne(bodyObject);

        allFlights[id - 1] = bodyObject;

        res.writeHead(200, { "Content-Type": "application/json" });
        //res.end(JSON.stringify(allFlights));
        res.write(JSON.stringify(allFlights));
        res.end();
    });
}

export async function put(req, res, id, flightsCollection) {
    const allFlights = await getAllFlights();
    let body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        //arrumar o put
        body = Buffer.concat(body).toString();
        const objBody = JSON.parse(body);
        for (const [key, value] of Object.entries(objBody)) {
            allFlights[id - 1][key] = value;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(allFlights));
    });
}
export async function deletes(req, res, num) {
    const allFlights = await getAllFlights();
    for (var index in allFlights) {
        if (allFlights.hasOwnProperty(index)) {
            if (allFlights[index]["id"] === num) {
                allFlights.splice(index, 1);
                res.writeHead(200, { "Content-Type": "application/json" });

                res.end(JSON.stringify(allFlights));
            }

        }
    }
}