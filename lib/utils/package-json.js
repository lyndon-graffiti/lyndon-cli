import fs from "fs-extra";
import chalk from "chalk";
import shell from "shelljs";
import ora from "ora";
import { logSymbols } from "./log-symbols.js";

export const changePackageJson = async (dir, info) => {
  try {
    const pkg = await fs.readJSON(`${dir}/package.json`);

    Object.keys(pkg).forEach((key) => {
      const hasInput = !!info[key]?.trim();

      // 处理用户输入数据
      const infoMap = {
        name: hasInput ? info[key] : pkg[key],
        version: hasInput ? info[key] : pkg[key],
        description: hasInput ? info[key] : pkg[key],
        author: hasInput
          ? {
              name: info[key],
            }
          : pkg[key],
        keywords: hasInput ? info[key].split(",") : pkg[key],
      };

      pkg[key] = infoMap[key] ?? pkg[key];
    });

    await fs.writeJSON(`${dir}/package.json`, pkg, {
      spaces: 2,
    });
  } catch (err) {
    console.log(
      `${logSymbols.warning} ${chalk.yellowBright(
        "Failed to write package.json, please write it manually"
      )}`
    );
    console.log(err);
  }
};

export const npmInstall = async (dir) => {
  const spinner = ora("Install...").start();

  const hasPnpm = shell.which("pnpm");

  // 处理对等依赖等
  const shellOrder = `cd ${dir} && ${hasPnpm ? "pnpm" : "npm"} install ${
    hasPnpm ? "" : "--force"
  } -d`;

  if (shell.exec(shellOrder).code !== 0) {
    spinner.fail(chalk.red("Install failed, please install manually"));
    return;
  }

  spinner.succeed(chalk.green("Install success"));
};
