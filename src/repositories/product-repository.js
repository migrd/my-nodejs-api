const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async() => {
  const res = await Product.find({
    active: true}, "title price slug description image tags");
    return res;
}

exports.getByTitle = (title) => {
  return Product
    .find({title: title, active: true},
      "title price image");
}

exports.getBySlug = (slug) => {
  return Product
    .findOne({ slug: slug, active: true},
       "title price slug description image tags");
}

exports.getByTag = (tag) => {
  return Product
    .find({ tags: tag, active: true }, "title price slug tags image");
}

exports.getById = (id) => {
  return Product.findById(id, "title");
}

exports.create = (data) =>{
  let product = new Product(data); //retirar req.body e usar metodo da linha abaixo
  //product.title = req.body.title;
  return product.save();
}

exports.update = (id, data) => {
  return Product
    .findByIdAndUpdate(id, {
      $set: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        price: data.price,
        tags: data.tags
      }
    })
}

exports.delete = (id) =>{
  return Product.findOneAndRemove(id)
}
