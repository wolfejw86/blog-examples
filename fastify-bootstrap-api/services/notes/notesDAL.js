
const NotesDAL = (db) => {
  const createNote = async (title, body, userId) => {
    const { id } = await db.one(
      `INSERT INTO notes (title, body, body_vector, user_id) VALUES ($1, $2, to_tsvector('pg_catalog.english', substring($2, 1, 1000000)), $3) RETURNING id`,
      [title, body, userId]
    );

    return { id, title, body };
  };

  const getNotes = (vectorSearch, userId) => {
    const queryArgs = [];
    let query = 'SELECT id, title, body FROM notes';

    if (vectorSearch) {
      queryArgs.push(`${vectorSearch}:*`, userId);
      query += ' WHERE body_vector @@ to_tsquery($1) AND user_id = $2 LIMIT 10';
    } else {
      queryArgs.push(userId);
      query += ' WHERE user_id = $1';
    }

    return db.manyOrNone(query, queryArgs);
  };

  const updateNote = async (id, title, body, userId) => {
    await db.one(
      'UPDATE notes SET title = $1, body = $2 WHERE id = $3 AND user_id = $4 RETURNING id',
      [title, body, id, userId]
    );

    return { id, title, body };
  };

  const findNoteById = (id, userId) => {
    return db.one('SELECT id, title, body FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
  }

  const deleteNote = (id, userId) => {
    return db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
  }

  return { createNote, getNotes, updateNote, deleteNote, findNoteById };
};


module.exports = NotesDAL;
