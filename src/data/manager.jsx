
import data from "./contacts.json";

export const levels = data.map(contact => contact.level);

export function loadData(filter) {

    try {

        // filter the contacts put it in one level
        let filtered = data.filter(contact => {

            let raw = JSON.stringify(contact).toLowerCase();
            return raw.includes(filter);

        })
        // return processed and managed components
        return filtered;

    } catch (err) {

        console.log("Error while loading data", err);
        return [];

    }

}

// callback structure (err)
export function deleteData(id, callback) {

    try {

        // send callback
        return callback(null);

    } catch (err) {

        return callback(err);

    }

}