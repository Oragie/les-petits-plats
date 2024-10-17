import { templateFactory } from "./src/template/template.js";

async function init() {
  const { app } = templateFactory();

  app();
}
init();
