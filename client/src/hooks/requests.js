const API_BASE_URL = 'http://localhost:8000/v1'

// Load planets and return as JSON.
async function httpGetPlanets() {
    const response = await fetch(`${API_BASE_URL}/planets`);
    return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
    const response = await fetch(`${API_BASE_URL}/launches`);
    const fetchedLaunches = await response.json();
    return fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
    try {
        return await fetch(`${API_BASE_URL}/launches`, {
            method: "post",
            body: JSON.stringify(launch),
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (err) {
        return {ok: false};
    }


}

// Delete launch with given ID.
async function httpAbortLaunch(id) {

    try{
        return await fetch(`${API_BASE_URL}/launches/${id}`,{
            method: "DELETE",
        });
    } catch(err) {
        return {ok: false};
    }
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};