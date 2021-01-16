const { UserModel, UserPasswordModel } = require("./user.model");

/**
 * 
 * @param {import('pg-promise').IDatabase<{}, pg.IClient>} db 
 */
const UserDAL = db => {
  const findByUsername = async (username) => {
    const user = await db.one('SELECT id, username, password FROM users WHERE username = $1', [username]).catch(console.warn);

    return new UserPasswordModel(user);
  }

  const createUser = async (username, password) => {
    const [{ id }] = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, password]
    )

    return new UserModel({ username, id });
  };

  return {
    findByUsername,
    createUser
  }
};

module.exports = { UserDAL }