import { SERVER, SERVER_KEY } from "../env";

// fetcher with Fetch API. callback: (data, error)
async function fetcher(url) {

    return new Promise((resolve, reject) => {

        fetch(url).then((response) => {

            if (!response.ok) {

                throw response.json();

            } else {

                return response.json();

            }

        }).then((json) => {

            // resolve the data
            resolve(json.data);

        }).catch((error) => {

            // reject the error
            reject(error);

        });

    })

}


export async function getContacts(filter) {

    const url = `${SERVER}/contacts?filter=${filter}&key=${SERVER_KEY}`;

    return new Promise((resolve, reject) => {

        fetcher(url).then(data => {

            resolve(data);

        }).catch(err => {

            console.log("Error while fetching data:", err);
            // send empty array as no data found
            resolve([]);

        });

    })

}

export async function getContact(id) {

    const url = `${SERVER}/contact?id=${id}&key=${SERVER_KEY}`;

    return new Promise((resolve) => {

        fetcher(url).then(data => {

            resolve(data);

        }).catch(err => {

            console.log("Error while fetching data:", err);
            // send empty object as no data found
            resolve({});

        });

    })

}