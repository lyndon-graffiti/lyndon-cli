import { logSymbols } from "./utils/log-symbols.js";
import { templates } from "./constants/templates.js";
import chalk from "chalk";
import { table } from "table";

export const list = () => {
  const config = {
    header: {
      alignment: "center",
      content: `${logSymbols.star}${chalk.yellowBright("templates")}`,
    },
  };

  const tableInfo = templates.map((item) => [
    chalk.greenBright(item.name),
    chalk.greenBright(item.value),
    chalk.greenBright(item.desc),
  ]);

  tableInfo.unshift(["name", "value", "desc"]);

  console.log(table(tableInfo, config));
};
