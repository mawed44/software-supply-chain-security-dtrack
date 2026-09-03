const { createApp } = require("./app");

const port = Number.parseInt(process.env.PORT || "3000", 10);

createApp().listen(port, () => {
  console.log(`API disponible sur http://localhost:${port}`);
});
