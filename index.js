import { templateFactory } from "./src/template/template.js";

async function init() {
  const { initApp } = templateFactory();

  initApp();
}
init();
