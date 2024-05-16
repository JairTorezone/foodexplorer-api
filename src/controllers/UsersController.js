const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

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

  async update(request, response) {
    const { name, email, password, old_password, updated_at } = request.body;
    const user_id = request.user.id;
    console.log(user_id);

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não cadastrado");
    }

    const checkEmailExist = await knex("users").where({ email: email }).first();

    if (checkEmailExist && checkEmailExist.id !== user.id) {
      throw new AppError("Email já esta cadastrado com outro usuário");
    }

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir uma nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await knex("users")
      .where({ id: user_id })
      .update({ name, email, password: user.password });

    user.updated_at = new Date();

    return response.json({ ...user });
  }
}

module.exports = UsersController;
