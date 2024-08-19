import { nameReg, semVerReg } from "./regular.js";

export const questions = [
  {
    name: "name",
    message: "请输入项目名称:",
    validate: (value) => {
      if (value.match(nameReg)) {
        return "The project name can not contain illegal characters";
      }
      return true;
    },
  },
  {
    name: "version",
    message: "请输入项目版本:",
    validate: (value) => {
      if (value.match(semVerReg)) {
        return "The project version format is incorrect";
      }
      return true;
    },
  },
  {
    name: "description",
    message: "请输入项目描述:",
  },
  {
    name: "author",
    message: "请输入项目作者:",
  },
  {
    name: "keywords",
    message: "请输入项目关键字(,分割):",
  },
];
