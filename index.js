#!/usr/bin/env node

const prog = require("caporal");
const init = require("./lib/create");

prog
  .version("1.0.0")
  .command("create", "Create a new application")
  .argument("<template>", "Template to use")
  .option(
    "--variant <variant>",
    "Which <variant> of the template would you like to use?"
  )
  .action(init);

prog.parse(process.argv);
