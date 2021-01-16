class BaseModel {
  constructor() { }

  serialize() {
    const { id, ...attributes } = this;
    return {
      id,
      type: this.constructor.name,
      attributes,
    }
  }
}

module.exports = { BaseModel }