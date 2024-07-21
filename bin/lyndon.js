#!/usr/bin/env node
import { program, Option } from "commander";
import fs from "fs-extra";
import { create } from "../lib/create.js";
import { list } from "../lib/list.js";
import { help } from "../lib/help.js";

const pkg = fs.readJSONSync(new URL("../package.json", import.meta.url));
program.version(pkg.version, "-v, --version", "output the current version");

program
  .name("lyndon")
  .description("lyndon is a cli tool for engineering")
  .usage("<command> [options]")
  .on("--help", help)
  .addOption(new Option("-h, --help", "show the help information"));

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-t, --template [template]", "template name")
  .option("-f, --force", "overwrite target directory if it exists")
  .option("-y, --yes", "do not prompt for confirmation")
  .action((name, options) => create(name, options));

program.command("list").description("list all templates").action(list);

program.parse(process.argv);
