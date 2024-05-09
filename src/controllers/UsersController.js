const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password, role } = request.body;

    if (!name) {
      throw new AppError("Nome do usuário  é obrigatório");
    }

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    response.status(201).json();
  }
}

module.exports = UsersController;
