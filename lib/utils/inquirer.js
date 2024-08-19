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

export const inquirerInput = async (message) => {
  const { input } = await inquirer.prompt({
    type: "input",
    name: "input",
    message,
  });
  return input;
};

export const inquirerInputs = async (messages) => {
  const answers = await inquirer.prompt(
    messages.map((msg) => ({
      type: "input",
      name: msg.name,
      message: msg.message,
      validate: msg.validate,
    }))
  );
  return answers;
};
