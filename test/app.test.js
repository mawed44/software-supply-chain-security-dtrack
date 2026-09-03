const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { createApp } = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("GET /health confirme que l'API fonctionne", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("GET /api/components retourne les composants par groupes", async () => {
  const response = await fetch(`${baseUrl}/api/components`);
  const body = await response.json();

  assert.equal(body.project, "syft-sbom-demo");
  assert.deepEqual(body.groups, [
    ["express", "lodash"],
    ["syft", "dependency-track"],
  ]);
});
