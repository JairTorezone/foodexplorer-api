const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const autoConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { role, sub: user_id } = verify(token, autoConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
