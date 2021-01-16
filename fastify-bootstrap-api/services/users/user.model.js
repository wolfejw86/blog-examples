const { BaseModel } = require("../../shared/model/base.model");

class UserModel extends BaseModel {
  constructor(dbRow) {
    super();

    if (dbRow) {
      this.id = dbRow.id;
      this.username = dbRow.username;
    }
  }
}

class UserPasswordModel extends UserModel {
  constructor(dbRow) {
    super(dbRow);

    this.hashedPassword = dbRow.password;
  }
}

module.exports = { UserModel, UserPasswordModel }