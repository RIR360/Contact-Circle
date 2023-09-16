require("dotenv").config();
const express = require("express");
const fs = require("fs");

// server setup
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ limit: '10mb', extended: true }));

// global middleware
app.use((req, res, next) => {

    // allowing CORS and json content globally 
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();


});

// middleware
function validateKey(req, res, next) {

    const key = process.env.KEY;
    const key_requested = req.query.key;

    // reject the request if key doesn't match or not given
    if (key !== key_requested) {

        next({
            code: 403,
            message: "rejected",
            error: "Access denied for wrong API KEY"
        });

    } else {

        next();

    }

}

function labelData(data) {

    const labeled_data = [];
    const levels = [...new Set(data.map(contact => contact.level))];

    levels.forEach((level) => {

        let contacts = [];

        data.forEach(contact => {

            if (contact.level === level) {

                contacts.push(contact)

            }

        })
        labeled_data[level] = contacts;

    });

    return labeled_data;

}

app.get("/", (req, res, next) => {

    res.status(200).json({
        "name": "contact-circle-api",
        "version": "1.0.0",
        "description": "api server for contact circle app",
        "author": "Rejwan Islam Rizvy (RIR360)"
    })

});

app.get("/contacts", validateKey, (req, res, next) => {

    try {

        // continue fetching contacts if not rejected already
        fs.readFile("./data/contacts.json", (err, data) => {

            if (err) {

                next(err);

            } else {

                // processing the data
                let contacts = JSON.parse(data);
                // filter is a string that should match in the contacts sending back
                const filter = req.query.filter || "";

                // proejct only name, level, id
                // contacts = contacts.map(contact => {contact.id, contact.level, contact.name});

                if (filter) {

                    const filtered_data = contacts.filter(contact => {

                        let raw = JSON.stringify(contact).toLowerCase();
                        return raw.includes(filter);

                    })

                    res.status(200).json({
                        message: "success",
                        data: labelData(filtered_data)
                    });

                } else {

                    res.status(200).json({
                        message: "success",
                        data: labelData(contacts)
                    });

                }

            }

        })

    } catch (err) {

        next(err);

    }

});

app.get("/contact", validateKey, (req, res, next) => {

    try {

        // continue fetching contacts if not rejected already
        fs.readFile("./data/contacts.json", (err, data) => {

            if (err) {

                next(err);

            } else {

                // processing the data
                const contacts = JSON.parse(data);
                // find the contact with id
                const id = req.query.id || "";
                const contact = contacts.filter(contact => contact.id === id)

                if (contact) {

                    return res.status(200).json({
                        message: "success", data: contact
                    });

                } else {

                    next({
                        code: 404,
                        error: "No contacts found"
                    });

                }

            }

        })

    } catch (err) {

        next(err);

    }

});

// 404 page not found middleware
app.use((req, res, next) => {

    res.status(404).json({
        code: 404,
        message: "error",
        error: "404 page not found"
    });

});

// custom error handler
app.use((err, req, res, next) => {

    // logging to the console
    console.error(err);

    // sending to the API
    let code = err.code || 500;
    res.status(code).json({
        code: code,
        message: "error",
        error: err.toString()
    });

});

app.listen(port, () => {

    console.log(`Contact Circle WebAPI started at http://localhost:${port}/`);

})
