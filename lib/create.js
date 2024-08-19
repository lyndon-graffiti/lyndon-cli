import shell from "shelljs";
import chalk from "chalk";
import { clone } from "./utils/clone.js";
import { logSymbols } from "./utils/log-symbols.js";
import fs from "fs-extra";
import {
  inquirerComfirm,
  inquirerList,
  inquirerInputs,
} from "./utils/inquirer.js";
import { templates } from "./constants/templates.js";
import { nameReg } from "./constants/regular.js";
import { questions } from "./constants/questions.js";
import { changePackageJson, npmInstall } from "./utils/package-json.js";

export const create = async (name, options) => {
  const { force, template, yes } = options;

  // --template
  let repository = "";
  if (template) {
    const temp = templates.find((item) => item.name === template);
    if (temp) {
      repository = temp.value;
    } else {
      console.log(
        `${logSymbols.error} ${chalk.redBright("The template does not exist")}`
      );
      console.log(
        `\r\n${logSymbols.info} ${chalk.blueBright(
          `Please use the ${logSymbols.arrow} ${chalk.greenBright(
            "<lyndon list>"
          )} to view the available templates`
        )}\r\n`
      );
      return;
    }
  } else {
    repository = await inquirerList("Please select a template", templates);
  }

  // -- force
  if (fs.existsSync(name) && !force) {
    console.log(
      `${logSymbols.warning} ${chalk.yellowBright(
        "The folder already exists, please use --force to overwrite"
      )}`
    );
    const answer = await inquirerComfirm("Do you want to overwrite?");
    if (answer) {
      shell.rm("-rf", name);
    } else {
      console.log(
        `${logSymbols.error} ${chalk.redBright("Operation canceled")}`
      );
      return;
    }
  } else if (fs.existsSync(name) && force) {
    shell.rm("-rf", name);
  }

  // 是否存在 git 命令
  if (!shell.which("git")) {
    console.log(
      `${logSymbols.error} ${chalk.redBright("Git is not installed")}`
    );
    return;
  }

  // 名称不能包含非法字符
  if (name.match(nameReg)) {
    console.log(
      `${logSymbols.error} ${chalk.redBright(
        "Name can not contain Chinese & special characters"
      )}`
    );
    return;
  }

  try {
    await clone(repository, name);
  } catch (err) {
    console.log(`${logSymbols.error} ${chalk.redBright("Clone failed")}`);
    console.log(err);
  }

  // --yes
  if (!yes) {
    const answers = await inquirerInputs(questions);
    await changePackageJson(name, answers);
  }

  npmInstall(name);
};
