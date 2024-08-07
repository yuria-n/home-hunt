import * as fs from "node:fs";
import assert from "node:assert";
import path from "node:path";

import * as gulp from "gulp";
import minimist from "minimist";

import { generationConfigs, Housing } from "./lib/map/config";
import { HousingGenerator } from "./lib/map/HousingGenerator";
import { getDistribution } from "./lib/map/utils";

const argv = minimist(process.argv.slice(2));

const targetDir = path.resolve(__dirname, "../../src/repositories/data");

/**
 * npm run gulp map:housing:generate -- -c 500
 */
gulp.task("map:housing:generate", async () => {
  const generationCount = Number(argv.c || argv.count || 100);
  assert.ok(Number.isSafeInteger(generationCount) && generationCount > 0);

  const generatedHousingList: Housing[] = [];
  for (const [genConfig, baseCount] of getDistribution(
    generationConfigs,
    generationCount,
  )) {
    const genCount = Math.round(baseCount);
    console.log(`generating [${genConfig.name}]: ${genCount}`);
    const generator = new HousingGenerator(genConfig);
    generatedHousingList.push(...generator.generateHousingList(genCount));
  }
  fs.writeFileSync(
    path.resolve(targetDir, "housing.json"),
    JSON.stringify(generatedHousingList),
  );
});
