import chalk from "chalk";
import figlet from "figlet";

export const help = () => {
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
  console.log(`Run ${chalk.cyan(`lyndon <command> --help`)} for more usaged.`);
};
