const express = require("express");

const UserController = require("./controllers");

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => `App listening to PORT: ${PORT}`);
