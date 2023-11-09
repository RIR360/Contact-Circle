const dotenv = require("dotenv");
const express = require("express");
const Contact = require("../models/contact");

// get environment variables
dotenv.config();

// server setup
const app = express();

// middlewares
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

app.get("/", async (req, res, next) => {

  res.status(200).json({
    name: "contact-circle-api",
    version: "1.0.0",
    description: "api server for contact circle app",
    author: "Rejwan Islam Rizvy (RIR360)"
  })

});

app.get("/contacts", validateKey, async (req, res, next) => {

  try {
    
    // filter is a string that should match in the contacts sending back
    const filter = req.query.filter || null;
    let search = {};

    if (filter) {

      search = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { title: { $regex: filter, $options: 'i' } },
          { bio: { $regex: filter, $options: 'i' } },
          { phone: { $regex: filter, $options: 'i' } },
          { email: { $regex: filter, $options: 'i' } }
        ]
      }

    }

    // processing the data
    const contacts = await Contact.find(search);
    const owner = await Contact.findOne({ locked: true })

    return res.status(200).json({
      message: "success",
      data: labelData(contacts),
      owner_exists: owner || false
    });

  } catch (err) {

    next(err);

  }

});

app.get("/contact", validateKey, async (req, res, next) => {

  try {

    const _id = req.query._id || "";
    const contact = await Contact.findOne({ _id });

    return res.status(200).json({
      message: "success",
      data: contact
    });

  } catch (err) {

    next(err);

  }

});

app.post("/contact/delete", validateKey, async (req, res, next) => {

  try {

    const _id = req.query._id || "";
    const contact = await Contact.deleteOne({ _id });

    return res.status(200).json({
      message: "success",
      data: contact
    });

  } catch (err) {

    next(err);

  }

});

app.post("/contact/update", validateKey, async (req, res, next) => {

  try {

    const _id = req.body._id;
    const data = req.body;
    const contact = await Contact.findByIdAndUpdate(_id, data);

    return res.status(200).json({
      message: "success",
      data: contact
    });

  } catch (err) {

    next(err);

  }

});

app.post("/contact/upload", validateKey, async (req, res, next) => {

  try {

    const doc = new Contact(req.body);

    doc.save().then((result) => {

      return res.status(200).json({
        message: "success", data: {
          insertedCount: 1,
          insertID: result.id
        }
      });

    })
    .catch((error) => {

      if (error.code === 11000) {

        return res.status(500).json({
          message: "error", info: "A contact with this name may already exists!"
        });

      } else {

        console.error('Error saving data:', error);
        next(error);

      }


    });

  } catch (err) {

    next(err);

  }

});

module.exports = app;