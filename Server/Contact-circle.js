require("dotenv").config();
const express = require("express");
const fs = require("fs");

// server setup
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res, next) => {

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({
        "name": "contact-circle-api",
        "version": "1.0.0",
        "description": "api server for contact circle app",
        "author": "Rejwan Islam Rizvy (RIR360)"
    })

});

app.get("/contacts", (req, res, next) => {

    try {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // process key
        const key = process.env.KEY;
        const key_requested = req.query.key;

        // reject the request if key doesn't match or not given
        if (key !== key_requested) {

            return res.status(403).json({
                code: 403,
                message: "rejected",
                error: "Access denied for wrong API KEY"
            });

        }

        // continue fetching contacts if not rejected already
        fs.readFile("./data/contacts.json", (err, data) => {

            if (err) {

                next(err);

            } else {

                // processing the data
                const contacts = JSON.parse(data);
                // filter is a string that should match in the contacts sending back
                const filter = req.query.filter || "";

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

// 404 page not found middleware
app.use((req, res, next) => {

    let error = new Error();
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
    res.status(500).json({
        code: 500,
        message: "error",
        error: String(err)
    });

});

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

app.listen(port, () => {

    console.log(`Contact Circle WebAPI started at http://localhost:${port}/`);

})