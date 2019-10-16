const mongoose = require('mongoose');

//  Schema Setup
const requestSchema = new mongoose.Schema({
title: String,
body: String,
created: {type: Date, default: Date.now},
author: {
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username: String
}
});

module.exports = mongoose.model("Request", requestSchema);
