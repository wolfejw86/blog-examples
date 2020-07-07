const noteSchema = {
  type: 'object',
  required: ['id', 'title', 'body'],
  properties: {
    id: { type: 'number', description: 'Unique identifier for a specific note' },
    title: { type: 'string' },
    body: { type: 'string', description: 'Main content of the note' }
  }
};


module.exports = {
  noteSchema,
}