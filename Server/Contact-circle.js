require("dotenv").config();
const express = require("express");
const fs = require("fs");

// server setup
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res, next) => {

    res.status(200).json({
        "name": "contact-circle-api",
        "version": "1.0.0",
        "description": "api server for contact circle app",
        "author": "Rejwan Islam Rizvy (RIR360)"
    })

});

app.get("/contacts", (req, res, next) => {

    try {

        // process key
        const key = process.env.KEY;
        const key_requested = req.query.key;

        // reject the request if key doesn't match or not given
        if (key !== key_requested) {

            return res.status(403).json({
                code: 403,
                message: "Access denied for wrong API KEY"
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

                    res.status(200).json(filtered_data);

                } else {

                    res.status(200).json(contacts);

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
        message: "404 page not found"
    });

});

// custom error handler
app.use((err, req, res, next) => {

    // logging to the console
    console.error(err);

    // sending to the API
    res.status(500).json({
        code: 500,
        message: String(err)
    });

});

app.listen(port, () => {

    console.log(`Contact Circle WebAPI started at http://localhost:${port}/`);

})