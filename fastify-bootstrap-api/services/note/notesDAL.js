
const NotesDAL = (db) => {
  const createNote = async (title, body) => {
    const { id } = await db.one(
      'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id',
      [title, body]
    );

    return { id, title, body };
  };

  const getNotes = (vectorSearch) => {
    const queryArgs = [];
    let query = 'SELECT id, title, body FROM notes';

    if (vectorSearch) {
      queryArgs.push(`${vectorSearch}:*`);
      query += ' WHERE body_vector @@ to_tsquery($1) LIMIT 10';
    }

    return db.manyOrNone(query, queryArgs);
  };

  const updateNote = async (id, title, body) => {
    await db.one(
      'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING id',
      [title, body, id]
    );

    return { id, title, body };
  };

  const deleteNote = (id) => {
    return db.query('DELETE FROM notes WHERE id = $1', [id]);
  }

  return { createNote, getNotes, updateNote, deleteNote };
};


module.exports = NotesDAL;
