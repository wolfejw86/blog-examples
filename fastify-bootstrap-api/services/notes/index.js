const { noteSchema } = require('./schemas');
const NotesDAL = require('./notesDAL');
const { isLoggedIn } = require('../../middleware/isLoggedIn');

/**
 * 
 * @param {import('fastify').FastifyInstance} fastify 
 * @param {*} opts 
 * @param {*} next 
 */
module.exports = function (fastify, opts, next) {
  const notesDAL = NotesDAL(fastify.db);

  fastify.addHook('preHandler', isLoggedIn);

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['Notes'],
      description: 'Get all notes',
      querystring: {
        type: 'object',
        properties: {
          'filter[body]': { type: 'string', description: 'Vector match against the body field' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: noteSchema
        }
      }
    },
    handler: async (request, reply) => {
      const vectorSearch = request.query['filter[body]'];
      const userId = request.user;

      return notesDAL.getNotes(vectorSearch, userId);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      tags: ['Notes'],
      description: 'Create a note',
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        }
      },
      response: {
        200: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { title, body } = request.body;
      const userId = request.user;
      const newNote = await notesDAL.createNote(title, body, userId);

      return newNote;
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: {
      tags: ['Notes'],
      description: 'Update a note',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
        }
      },
      response: {
        200: noteSchema
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const { title, body } = request.body;
      const userId = request.user;

      const updatedNote = await notesDAL.updateNote(id, title, body, userId);

      return updatedNote;
    }
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: {
      tags: ['Notes'],
      description: 'Delete a note - WARNING - PERMANENT',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: { type: 'string', default: 'No Content' }
      }
    },
    handler: async (request, reply) => {
      const userId = request.user;
      const noteId = request.params.id;

      try {
        await notesDAL.findNoteById(noteId, userId);
      } catch (error) {
        reply.code(404);
        throw new Error('Resource not found');
      }

      await notesDAL.deleteNote(noteId, userId);

      reply.status(204);
    }
  });

  next();
};
