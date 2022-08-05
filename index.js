const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const UserController = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.route("/").get(UserController.getUsers).post(UserController.postUser);
app
  .route("/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

app.listen(PORT, (err) => console.log(err ?? `App listening to PORT: ${PORT}`));
