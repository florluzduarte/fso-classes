const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password and argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fso:${password}@cluster0.05hrg5g.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "JavaScript can be tricky",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!", result);
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
