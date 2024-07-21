import chalk from "chalk";
import isUnicodeSupported from "is-unicode-supported";

const main = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
  arrow: chalk.yellow("➥"),
  spinner: chalk.magenta("⌛"),
  star: chalk.cyan("⭐"),
};

const fallback = {
  info: chalk.blue("i"),
  success: chalk.green("√"),
  warning: chalk.yellow("‼"),
  error: chalk.red("×"),
  arrow: chalk.yellow("➜"),
  spinner: chalk.magenta("..."),
  star: chalk.cyan("*"),
};

export const logSymbols = isUnicodeSupported() ? main : fallback;
