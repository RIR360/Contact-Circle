import { SERVER, SERVER_KEY } from "../env";
import axios from "axios";

export async function getContacts(filter) {

    try {

        const url = `${SERVER}/contacts?filter=${filter}&key=${SERVER_KEY}`;
        const response = await axios.get(url);
        return response.data.data;
        
    } catch (err) {

        console.log("Error while fetching data:", err);
        return [];
        
    }

}

export async function getContact(id) {

    try {

        const url = `${SERVER}/contact?id=${id}&key=${SERVER_KEY}`;
        const response = await axios.get(url);
        return response.data.data;
        
    } catch (err) {

        console.log("Error while fetching data:", err);
        return {};
        
    }

}

export async function deleteContact(id) {

    try {

        const url = `${SERVER}/contact/delete?id=${id}&key=${SERVER_KEY}`;
        const response = await axios.get(url);
        return response.data;
        
    } catch (err) {

        console.log("Error while deleting data:", err);
        return false;
        
    }

}