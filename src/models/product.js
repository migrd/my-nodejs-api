const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: [true, "title é obrigatório"],
    trim: true
  },
  slug: {
    //Cadeira Gamer = /cadeira-gamer
    type: String,
    required: [true, "slug é obrigatório"],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, "description é obrigatório"]
  },
  price: {
    type: Number,
    required: [true, "price é obrigatório"]
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  image: {
    type: String,
    required: [true, "colocar uma imagem é obrigatório"],
    default: "https://i.imgur.com/EJLFNOw.png"
  },
  tags: [
    {
      type: String,
      required: [true, "tags são obrigatórias"]
    }
  ]
});

module.exports = mongoose.model("Product", schema);

//exemplo de cadastro produto JSON
//{
//  "title":"Cadeira de Escritorio",
//  "slug":"cadeira-de-escritorio",
//  "description":"cadeira de escritorio confortavel",
//  "price":"497.00",
//  "active":true,
//  "image":"url",
//  "tags":["cadeira", "escritorio", "trabalho"]
//}
