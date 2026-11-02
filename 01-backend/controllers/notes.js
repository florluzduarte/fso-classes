const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((noteFound) => {
      if (noteFound) {
        response.json(noteFound);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then((noteDeleted) => response.status(204).end())
    .catch((error) => next(error));
});

notesRouter.post('/', (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => response.json(savedNote))
    .catch((error) => next(error));
});

notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id;
  const { content, important } = request.body;

  Note.findById(id).then((noteFound) => {
    if (!noteFound) {
      return response.status(404).end();
    }

    noteFound.content = content;
    noteFound.important = important;

    return noteFound
      .save()
      .then((updatedNote) => {
        response.json(updatedNote);
      })
      .catch((error) => next(error));
  });
});

module.exports = notesRouter;
