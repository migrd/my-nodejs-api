const ValidationContract = require("../validators/fluent-validator");
const repository = require("../repositories/product-repository");

exports.get = async(req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "falha na requisição"
    });
  }
}

exports.getByTitle = (req, res, next) => {
  repository
    .getByTitle(req.params.title)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send({ message: "erro 400", data: erro });
    });
};

exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send({ message: "erro 400", data: erro });
    });
};

exports.getByTag = (req, res, next) => {
  repository
    .getByTag(req.params.tag)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send({ message: "erro 400", data: erro });
    });
};

exports.getById = (req, res, next) => {
  repository
    .getById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((erro) => {
      res.status(400).send({ message: "erro 400", data: erro });
    });
};

exports.post = (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(
    req.body.title,
    3,
    "o titulo precisa ter no minimo 3 caracteres"
  );

  //se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  repository
    .create(req.body)
    .then((x) => {
      res.status(201).send({ message: "produto cadastrado com sucesso" });
    })
    .catch((erro) => {
      res.status(400).send({ message: "erro ao cadastrar produto", data: erro });
    });
};

exports.put = (req, res, next) => {
  repository
    .update(req.params.id, req.body)
    .then((data) => {
      res.status(201).send({ message: "produto atualizado com sucesso" });
    })
    .catch((erro) => {
      res.status(400).send({ message: "falha ao atualizar produto", data: erro });
    });
};

exports.delete = (req, res, next) => {
  repository
    .delete(req.body.id) //passar o id do elemento no body da req
    .then((data) => {
      res.status(201).send({ message: "produto removido com sucesso" });
    })
    .catch((erro) => {
      res.status(400).send({ message: "falha ao remover produto", data: erro });
    });
};
