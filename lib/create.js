const prompt = require("prompt");
const shell = require("shelljs");
const fs = require("fs");
const colors = require("colors");

prompt.message = colors.green("Replace");

module.exports = (args, options, logger) => {
  const variant = options.variant || "default";
  const templatePath = `${__dirname}/../templates/${args.template}/${variant}`;
  const localPath = process.cwd();

  if (fs.existsSync(templatePath)) {
    logger.info(colors.yellow("Creating project files"));
    shell.cp("-R", `${templatePath}/*`, localPath);
    logger.info(colors.green("✔ All files have been created!"));
  } else {
    logger.error(
      colors.red(`The requested template for ${args.template} wasn't found.`)
    );
    process.exit(1);
  }

  const variables = require(`${templatePath}/_variables`);

  if (fs.existsSync(`${localPath}/_variables.js`)) {
    shell.rm(`${localPath}/_variables.js`);
  }

  logger.info(colors.yellow("Please fill the following values…"));

  // Ask for variable values
  prompt.start().get(variables, (err, result) => {
    // Remove MIT License file if another is selected
    // Omit this code if you have used your own template
    if (result.license !== "MIT") {
      shell.rm(`${localPath}/LICENSE`);
    }

    // Replace variable values in all files
    shell.sed(
      "-i",
      '"name": "placeholder"',
      `"name": "${result.project_name}"`,
      "package.json"
    );
    // Replace variable values in the package.json file
    const packageJsonPath = `${localPath}/package.json`;
    if (fs.existsSync(packageJsonPath)) {
      variables.forEach((variable) => {
        shell.sed(
          "-i",
          `\\[${variable.toUpperCase()}\\]`,
          result[variable],
          packageJsonPath
        );
      });
    }
    // Run installation command
    logger.info(colors.yellow("Installing project dependencies..."));
    shell.exec("npm install", (code, stdout, stderr) => {
      if (code === 0) {
        logger.info(colors.green("✔ Dependencies installed successfully!"));

        logger.info(colors.green("✔ project created successfully Success!"));
      } else {
        logger.error(colors.red("✖ Failed to install dependencies."));
        logger.error(stderr);
      }
    });
  });
};
