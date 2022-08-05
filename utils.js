exports.generateUpdateByIdQuery = (table, id, cols) => {
  // "UPDATE users SET name = $1, email = $2 WHERE id=$3",
  const query = [`UPDATE ${table}`, "SET"];

  const set = [];
  Object.keys(cols).forEach((key, i) => {
    set.push(`${key} = \$${i + 1}`);
  });

  query.push(set.join(", "));
  query.push(`WHERE id=${id}`);

  return query.join(" ");
};
