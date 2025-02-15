import {Schema,model,models } from "mongoose";

const userSchema = new Schema({
fullname: String,
email: String,
password: String,
});

export = models.User || model("User", userSchema);