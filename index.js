#!/usr/bin/env node

const prog = require("caporal");
const init = require("./lib/create");

prog
 .version("3.0.6")
 .command("create", "Create a new application")
 .action(init);

prog.parse(process.argv);
