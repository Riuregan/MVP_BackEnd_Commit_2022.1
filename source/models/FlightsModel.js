import flightsData from '../data/flights.json' assert {type: "json"};

export function getAllFlights() {
    return new Promise((resolve, reject) => {
        resolve(flightsData);
    });
}