#!/usr/bin/env bun

import * as Icons from "simple-icons";
import tinycolor from "tinycolor2";
import assert from "assert";

const toolbox: Record<
  string,
  Array<string | { label: string; icon?: string; hex?: string }>
> = {
  language: [
    "html5",
    "css3",
    "sass",
    "php",
    "javascript",
    "typescript",
    "nodedotjs",
    "solidity",
    "nx",
    "graphql",
    "mysql",
    "mongodb",
  ],
  framework: [
    "angular",
    "react",
    "nextdotjs",
    "mui",
    "redux",
    "symfony",
    "express",
    "nestjs",
    { label: "Doctrine", hex: "f4672f" },
    "mongoose",
    { label: "Mikro ORM", hex: "0c4346" },
    { label: "Harhat", hex: "fff04d" },
    { label: "Truffle", hex: "5e464d" },
    "ethers",
  ],
  infra: [
    "amazonaws",
    "googlecloud",
    "cloudflare",
    "auth0",
    { label: "Docker Swarm", icon: "docker" },
    "kubernetes",
    "helm",
    "elasticsearch",
    "logstash",
    "kibana",
    "grafana",
    "rabbitmq",
    "terraform",
  ],
  testing: [
    "sonarqube",
    { label: "PHPUnit", hex: "3f98d3" },
    "jest",
    "mocha",
    "vitest",
    { label: "Waffle", hex: "ffae50" },
    { label: "Matchstick", hex: "120b41" },
  ],
  dev: [
    "git",
    "github",
    "gitlab",
    "webstorm",
    "visualstudiocode",
    "neovim",
    "debian",
    "archlinux",
    "nixos",
    "npm",
    "yarn",
    "pnpm",
    "bun",
  ],
  ci: [
    "githubactions",
    { label: "Gitlab CI", icon: "gitlab" },
    "circleci",
    "travisci",
    "argo",
    "gocd",
    "webpack",
    "gulp",
    "vite",
    "swc",
    "prettier",
    "eslint",
  ],
};

type ToolboxArray = {
  headers: string[];
  rows: string[][];
};

const main = () => {
  const toolboxArray = constructArray();
  printArray(toolboxArray);
};

const constructArray = (): ToolboxArray => {
  const headers = Object.keys(toolbox);
  const rows: string[][] = [];
  for (const toolboxIndex in headers) {
    const toolboxName = headers[toolboxIndex];
    for (const toolIndex in toolbox[toolboxName]) {
      const tool = toolbox[toolboxName][toolIndex];
      const iconSlug = typeof tool === "string" ? tool : tool.icon;
      let label = "";
      let hex = "";
      let logo = "";
      if (iconSlug) {
        const icon = Icons[`si${titleCase(iconSlug)}` as keyof typeof Icons];
        assert(icon, `Could not find icon for ${iconSlug}`);
        const { title: iconTitle, hex: iconHex } = icon;
        label = iconTitle;
        hex = iconHex;
        logo = `logo=${iconTitle}&`;
      }
      if (typeof tool !== "string") {
        if (tool.label) label = tool.label;
        if (tool.hex) hex = tool.hex;
      }
      const color = tinycolor(hex);
      const brightness = color.getBrightness();
      const logoColor = `logoColor=${brightness > 200 ? "black" : "white"}`;
      rows[toolIndex] ??= [];
      rows[toolIndex][toolboxIndex] =
        `[<img align="left" alt="${label}" src="https://img.shields.io/badge/-${label}-${hex}?${logo}${logoColor}">](#)`;
    }
  }
  return { headers, rows };
};

const printArray = (toolboxArray: ToolboxArray) => {
  const { headers, rows } = toolboxArray;
  console.log(`|${headers.map(titleCase).join("|")}|`);
  console.log(`|${Array(headers.length).fill("-").join("|")}|`);
  for (const row of rows) {
    console.log(`|${row.join("|")}|`);
  }
};

const titleCase = (value: string) =>
  value[0].toUpperCase() + value.slice(1).toLowerCase();

main();
