module.exports = {
  default: {
    require: [
      "src/support/world.ts",
      "src/steps/**/*.ts",
      "src/hooks/**/*.ts"
    ],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["features/**/*.feature"]
  }
};