const bcrypt = require('bcryptjs');
const { UserDAL } = require("./usersDAL")

const UserService = (db) => {
  const userDAL = UserDAL(db);

  const createUser = async (username, unhashedPass) => {
    const hashedPass = await bcrypt.hash(unhashedPass, 10);

    const user = await userDAL.createUser(username, hashedPass)
      .catch(() => {
        throw new Error("There was an error creating your account")
      })

    return user;
  }

  const login = async (username, unhashedPass) => {
    try {
      const user = await userDAL.findByUsername(username);
      if (await bcrypt.compare(unhashedPass, user.hashedPassword)) {
        return user.id
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new Error('Invalid username/password combination.');
    }
  }

  return {
    createUser,
    login,
  }
}

module.exports = { UserService }