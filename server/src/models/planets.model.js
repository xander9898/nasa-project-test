const path = require('path');
const {parse} = require('csv-parse');
const fs = require('fs');
const planets = require('./planets.mongo');
const {getAllLaunches} = require("./launches.model");

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data);
                }
            })
            .on('end', async () => {
                const planetsFoundCount = (await getAllPlanets()).length;
                console.log(`${planetsFoundCount} habitable planets are found`);
                resolve();
            })
            .on('error',  (err) => {
                reject(err);
            })
    })
}

async function getAllPlanets() {
    return planets.find({},{
        '__v' : 0, '_id' : 0,
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true,
        });
    } catch(err) {
        console.error(`Could not save plent ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}