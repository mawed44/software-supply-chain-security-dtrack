const express = require("express");
const { chunk } = require("lodash");

function createApp() {
  const app = express();

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.get("/api/components", (_request, response) => {
    const components = ["express", "lodash", "syft", "dependency-track"];
    response.json({
      project: "syft-sbom-demo",
      groups: chunk(components, 2),
    });
  });

  return app;
}

module.exports = { createApp };
