#!/usr/bin/env node
import { clone } from "../lib/clone.js";
import chalk from "chalk";
import figlet from "figlet";
import { program, Option } from "commander";
import { templates } from "../lib/constants.js";
import fs from "fs-extra";

const pkg = fs.readJSONSync(new URL("../package.json", import.meta.url));

program.version(pkg.version, "-v, --version", "output the current version");

program
  .name("lyndon")
  .description("lyndon is a cli tool for engineering")
  .usage("<command> [options]")
  .on("--help", () => {
    console.log(
      `\r\n ${chalk.yellow(
        figlet.textSync("lyndon-cli", {
          font: "standard",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 120,
          whitespaceBreak: true,
        })
      )}`
    );
    console.log(
      `Run ${chalk.cyan(`lyndon <command> --help`)} for more usaged.`
    );
  })
  .addOption(new Option("-h, --help", "show the help information"));

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-t, --template [template]", "template name")
  .option("-f, --force", "overwrite target directory if it exists")
  .option("-y, --yes", "do not prompt for confirmation")
  .action(async (name, options) => {
    console.log(`create ${name}`);
    console.log(options);
  });

program
  .command("list")
  .description("list all templates")
  .action(() => {
    console.log(chalk.yellowBright("templates:"));
    templates.forEach((item, idx) => {
      console.log(
        `${idx + 1}.${chalk.greenBright(item.name)} -> ${chalk.greenBright(
          item.desc
        )}`
      );
    });
  });

// await clone("yingside/vite-template", "test-temp");

program.parse(process.argv);
