import inquirer from "inquirer";

export const inquirerComfirm = async (message) => {
  const { confirm } = await inquirer.prompt({
    type: "confirm",
    name: "confirm",
    message,
  });
  return confirm;
};

export const inquirerList = async (message, choices) => {
  const { list } = await inquirer.prompt({
    type: "list",
    name: "list",
    message,
    choices,
  });
  return list;
};
