import _ from "lodash";

import { HousingConfig, HousingOptions } from "../config";

const exampleMap = {
  bedroom: {
    "1": ["1", "One"],
    "2": ["2", "Two"],
  },
  bedroomText: ["Bedroom", "bedroom", "bed", "BR"],
  pets: ["Pet Friendly", "Pet Welcome", "Pet Allowed", ""],
  cats: ["Cat Friendly", "Cat Welcome", "Cat Allowed", ""],
  dogs: ["Dog Friendly", "Dog Welcome", "Dog Allowed", ""],
  furnished: ["Furnished", "furnished", ""],
};

export function generateName(config: HousingConfig, options: HousingOptions) {
  const list: string[] = [];

  // bedroom
  const bedroom = config.bedroom.toString();
  list.push(
    _.sample(exampleMap.bedroom[bedroom as keyof typeof exampleMap.bedroom]) ??
      bedroom,
  );
  list.push(_.sample(exampleMap.bedroomText)!);

  // furnished
  if (options.furnished) {
    list.push(_.sample(exampleMap.furnished)!);
  }

  // pets
  let petText = "";
  if (options.dogs && options.cats) {
    petText = _.sample(exampleMap.pets)!;
  } else if (options.cats) {
    petText = _.sample(exampleMap.cats)!;
  } else if (options.dogs) {
    petText = _.sample(exampleMap.dogs)!;
  }
  if (Math.random() < 0.5) {
    list.push(petText);
  } else {
    list.unshift(petText);
  }

  return list.filter((text) => text).join(" ");
}
