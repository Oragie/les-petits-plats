import { templateFactory } from "./template/template.js";

async function init() {
  const { app } = templateFactory();

  app();
}
init();
