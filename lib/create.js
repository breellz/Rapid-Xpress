const prompt = require("prompt");
const shell = require("shelljs");
const fs = require("fs");
const colors = require("colors");

prompt.message = colors.green("Replace");

module.exports = async (args, options, logger) => {
 const template = "express";
 const templatePath = `${__dirname}/../templates/${template}`;
 const localPath = process.cwd();

 const variants = fs
  .readdirSync(templatePath)
  .filter((file) => fs.statSync(`${templatePath}/${file}`).isDirectory());

 if (variants.length === 0) {
  logger.error(colors.red(`No variants found for template ${template}.`));
  process.exit(1);
 }

 logger.info(colors.yellow("Select a variant for the template:"));
 logger.info(`Available variants: ${variants.join(", ")}`);
 // Prompt user to select a variant
 const { variant } = await prompt.get({
  name: "variant",
  description: "Select a variant",
  type: "string",
  required: true,
  conform: (value) => variants.includes(value),
  message: `Available variants: ${variants.join(", ")}`,
 });

 const selectedTemplatePath = `${templatePath}/${variant}`;

 if (fs.existsSync(selectedTemplatePath)) {
  logger.info(colors.yellow("Creating project files"));
  shell.cp("-R", `${selectedTemplatePath}/*`, localPath);
  logger.info(colors.green("✔ All files have been created!"));
 } else {
  logger.error(
   colors.red(`The requested template for ${args.template} wasn't found.`)
  );
  process.exit(1);
 }

 const variables = require(`${selectedTemplatePath}/_variables`);

 if (fs.existsSync(`${localPath}/_variables.js`)) {
  shell.rm(`${localPath}/_variables.js`);
 }

 logger.info(colors.yellow("Please fill the following values…"));

 // Ask for variable values
 prompt.start().get(variables, (err, result) => {
  if (err) {
   logger.error(colors.red("✖ Error getting prompt values."));
   process.exit(1);
  }

  // Remove MIT License file if another is selected
  // if (result.license !== "MIT") {
  //  shell.rm(`${localPath}/LICENSE`);
  // }

  // Replace variable values in all files
  shell.sed(
   "-i",
   '"name": "placeholder"',
   `"name": "${result.project_name}"`,
   "package.json"
  );

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

  const envVariables =
   variant === "mongodb"
    ? [
       "PORT",
       "MONGO_TEST_URI",
       "MONGO_URI",
       "MONGO_DEV_URI",
       "REDIS_HOST",
       "REDIS_PORT",
       "REDIS_PASSWORD",
       "SMTP_HOST",
       "SMTP_PORT",
       "SMTP_USER",
       "SMTP_PASSWORD",
       "SMTP_SENDER_ADDRESS",
       "JWT_SECRET",
      ]
    : [
       "PORT",
       "TEST_DATABASE_URL",
       "DEV_DATABASE_URL",
       "REDIS_HOST",
       "REDIS_PORT",
       "REDIS_PASSWORD",
       "SMTP_HOST",
       "SMTP_PORT",
       "SMTP_USER",
       "SMTP_PASSWORD",
       "SMTP_SENDER_ADDRESS",
       "JWT_SECRET",
      ];

  // Create .env file with the envVariables
  const envFilePath = `${localPath}/.env`;
  let envContent = "";
  envVariables.forEach((variable) => {
   envContent += `${variable}=${result[variable]}\n`;
  });
  fs.writeFileSync(envFilePath, envContent);
  logger.info(colors.green("✔ .env file created successfully!"));

  // Run installation command
  logger.info(colors.yellow("Installing project dependencies..."));
  shell.exec("npm install", (code, stdout, stderr) => {
   if (code === 0) {
    logger.info(colors.green("✔ Dependencies installed successfully!"));
    logger.info(colors.green("✔ Project created successfully!"));
   } else {
    logger.error(colors.red("✖ Failed to install dependencies."));
    logger.error(stderr);
   }
  });
 });
};
