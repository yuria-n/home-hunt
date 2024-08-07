import * as fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import _ from "lodash";

import {
  BoolDistribution,
  Coordinate,
  createdAtRange,
  currentTime,
  GenerationConfig,
  Housing,
  HousingOptions,
  precisionMap,
  PriceHistory,
  Range,
  squareFeetConfigs,
  updatedAtFrequencyRange,
} from "./config";
import {
  earClippingTriangulation,
  generateName,
  getDistribution,
  getRandomCoordinate,
  Triangle,
  floor,
} from "./utils";

export class HousingGenerator {
  private readonly trianglesList: Triangle<Coordinate>[][][];
  constructor(private readonly config: GenerationConfig) {
    this.trianglesList = config.coordinatesList.map(earClippingTriangulation);
  }

  generateHousingList(count: number): Housing[] {
    // images
    const imageDir = path.resolve(__dirname, "../../../..", "public/images");
    const imageNamesMap = new Map<string, string[]>();
    for (const dirname of fs.readdirSync(imageDir)) {
      const dirPath = path.resolve(imageDir, dirname);
      if (!fs.statSync(dirPath).isDirectory()) {
        continue;
      }
      const publicDirPath = path.join("/images", dirname);
      const imagePaths = fs
        .readdirSync(dirPath)
        .filter((filename) => path.extname(filename) === ".jpg")
        .map((filename) => path.join(publicDirPath, filename));
      imageNamesMap.set(dirname, imagePaths);
    }

    // generating housing list
    const housingList: Housing[] = [];
    for (const [housingConfig, baseCount] of getDistribution(
      this.config.housing,
      count,
    )) {
      let housingCount = Math.round(baseCount);
      while (--housingCount >= 0) {
        const coordinate = getRandomCoordinate(_.sample(this.trianglesList)!);
        const price = this.getWeightedValueFromRange(
          housingConfig.priceRange,
          precisionMap.price,
        );
        const createdAt = this.getValueFromRange(createdAtRange);
        const priceHistory = this.generatePriceHistory(
          price,
          createdAt,
          housingConfig.trendRange,
        );
        const updatedAt = priceHistory[priceHistory.length - 1].updatedAt;
        const squareFeet = this.getWeightedValueFromRange(
          squareFeetConfigs[housingConfig.bedroom].squareFeetRange,
          precisionMap.squareFeet,
        );
        const options: HousingOptions = {
          cats: this.getBoolFromDistribution(housingConfig.options.cats),
          dogs: this.getBoolFromDistribution(housingConfig.options.dogs),
          furnished: this.getBoolFromDistribution(
            housingConfig.options.furnished,
          ),
        };
        const housing: Housing = {
          id: randomUUID(),
          name: generateName(housingConfig, options),
          type: housingConfig.type,
          image: _.sample(
            imageNamesMap.get(options.furnished ? "furnished" : "unfurnished"),
          )!,
          bedroom: housingConfig.bedroom,
          bathroom: this.getValueFromRange(housingConfig.bathroomRange),
          price,
          priceHistory,
          squareFeet,
          createdAt,
          updatedAt,
          options,
          ...coordinate,
        };
        housingList.push(housing);
      }
    }
    return housingList;
  }

  private getValueFromRange(range: Range, precision = 1) {
    const [min, max] = range;
    return floor(Math.random() * (max - min) + min, precision);
  }

  private getWeightedValueFromRange(range: Range, precision: number) {
    const [min, max] = range;
    // 99.7%
    const mean = floor((max + min) / 2, precision);
    const stdDev = floor((max - min) / 3, precision);
    let value;
    do {
      // Box Muller transform
      const num =
        Math.sqrt(-2 * Math.log(Math.random())) *
        Math.cos(2.0 * Math.PI * Math.random());
      value = mean + stdDev * num;
    } while (value < min || value > max);
    return floor(value, precision);
  }

  private getBoolFromDistribution(distribution: BoolDistribution) {
    const [t, f] = distribution;
    const total = t + f;
    return Math.random() * total <= t;
  }

  private generatePriceHistory(
    price: number,
    createdAt: number,
    trendRange: Range,
  ): PriceHistory[] {
    const history: PriceHistory[] = [];
    let updatedAt = currentTime;
    while (true) {
      updatedAt -= this.getValueFromRange(updatedAtFrequencyRange);
      if (updatedAt <= createdAt) {
        break;
      }
      history.unshift({ price, updatedAt });
      price = floor(
        price /
          (1 + this.getWeightedValueFromRange(trendRange, precisionMap.trend)),
        precisionMap.price,
      );
    }
    history.unshift({ price, updatedAt: createdAt });
    return history;
  }
}
