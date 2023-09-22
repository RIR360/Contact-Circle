require("dotenv").config();
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

// server setup
const app = express();
const port = process.env.PORT || 3001;
// globals
const DATA_FILE = "./data/contacts.json";

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// use cors
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

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
    fs.readFile(DATA_FILE, (err, data) => {

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
    fs.readFile(DATA_FILE, (err, data) => {

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
            message: "success", data: contact[0]
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

app.post("/contact/delete", validateKey, (req, res, next) => {

  try {

    // continue fetching contacts if not rejected already
    fs.readFile(DATA_FILE, (err, data) => {

      if (err) {

        next(err);

      } else {

        // find the contact with id
        const id = req.query.id || "";
        // processing the data
        let contacts = JSON.parse(data);
        contacts = contacts.filter(contact => contact.id !== id);

        let new_data = JSON.stringify(contacts, null, 2);

        fs.writeFile(DATA_FILE, new_data, (err) => {

          if (err) next(err);
          else {

            return res.status(200).json({
              message: "success", data: {
                deletedCount: 1,
                deletedID: id
              }
            });

          }

        })

      }

    })

  } catch (err) {

    next(err);

  }

});

app.post("/contact/update", validateKey, (req, res, next) => {

  try {

    // continue fetching contacts if not rejected already
    fs.readFile(DATA_FILE, (err, data) => {

      if (err) {

        next(err);

      } else {

        try {

          // find the contact with id
          const body = req.body;
          // processing the data
          const contacts = JSON.parse(data);

          const updatedContacts = contacts.map((contact) => {

            if (contact.id === body.id) {

              return { ...contact, ...body };

            }

            return contact; // If not, keep the object unchanged

          });

          const new_data = JSON.stringify(updatedContacts, null, 2);

          fs.writeFile(DATA_FILE, new_data, (err) => {

            if (err) next(err);
            else {

              return res.status(200).json({
                message: "success", data: {
                  updatedCount: 1,
                  updatedID: body.id
                }
              });

            }

          })

        } catch (err) {

          next(err);

        }
      }

    })

  } catch (err) {

    next(err);

  }

});

app.post("/contact/upload", validateKey, (req, res, next) => {

  try {

    // continue fetching contacts if not rejected already
    fs.readFile(DATA_FILE, (err, data) => {

      if (err) {

        next(err);

      } else {

        // processing the data
        const contacts = JSON.parse(data);
        
        // generate a random ID
        const id = uuidv4();
        const new_contact = { id, ...req.body };

        contacts.push(new_contact);

        let new_data = JSON.stringify(contacts, null, 2);

        fs.writeFile(DATA_FILE, new_data, (err) => {

          if (err) next(err);
          else {

            return res.status(200).json({
              message: "success", data: {
                insertedCount: 1,
                insertID: id
              }
            });

          }

        })

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
  res.status(code).json(err);

});

app.listen(port, () => {

  console.log(`Contact Circle WebAPI started at http://localhost:${port}/`);

})
