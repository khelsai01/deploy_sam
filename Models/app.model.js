const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
}, {
    versionKey: false
});

const noteSchema = mongoose.Schema({
    title: String,
    body: String,
    userId: String,
    username: String
},
    {
        versionKey: false
    })
const UserModel = mongoose.model("user", userSchema);

const NoteModel = mongoose.model("note", noteSchema);
module.exports = {
    UserModel,
    NoteModel
}