import download from "download-git-repo";
import ora from "ora";
import chalk from "chalk";

export const clone = (repository, destination, options = {}) => {
  const spinner = ora("正在拉取项目...").start();
  return new Promise((resolve, reject) => {
    download(repository, destination, options, (err) => {
      if (err) {
        spinner.fail(chalk.red(err));
        reject(err);
      } else {
        spinner.succeed(chalk.green("拉取成功！"));
        resolve();
      }
    });
  });
};
