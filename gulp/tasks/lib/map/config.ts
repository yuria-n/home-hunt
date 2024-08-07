import _ from "lodash";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface PriceHistory {
  price: number;
  updatedAt: number;
}

export enum HousingType {
  Apartment,
  Condo,
  House,
}

export interface HousingOptions {
  cats: boolean;
  dogs: boolean;
  furnished: boolean;
}

export interface Housing extends Coordinate {
  id: string;
  name: string;
  type: HousingType;
  // TODO: change it to a path, and load an image separately
  image: string; // base64
  price: number;
  priceHistory: PriceHistory[];
  bedroom: number;
  bathroom: number;
  squareFeet: number;
  createdAt: number;
  updatedAt: number;
  options: HousingOptions;
}

export interface Apartment extends Housing {
  type: HousingType.Apartment;
  // TODO: roomNumber is not implemented yet
  roomNumber: number;
}

export interface Condo extends Housing {
  type: HousingType.Condo;
  // TODO: roomNumber is not implemented yet
  roomNumber: number;
}

export type Range = [number, number]; // Both are inclusive
export type BoolDistribution = [number, number];

export interface SquareFeetConfig {
  bedroom: number;
  squareFeetRange: Range;
}
export const squareFeetConfigs: Record<number, SquareFeetConfig> = {
  1: {
    bedroom: 1,
    squareFeetRange: [400, 800],
  },
  2: {
    bedroom: 2,
    squareFeetRange: [700, 1000],
  },
  3: {
    bedroom: 3,
    squareFeetRange: [900, 1200],
  },
};

export interface Weight {
  weight: number;
}

type HousingOptionsConfig = Record<keyof HousingOptions, BoolDistribution>;

export interface HousingConfig extends Weight {
  type: HousingType;
  weight: number;
  bedroom: number;
  priceRange: Range; // The current price range
  trendRange: Range; // The trend range is used to calculate old prices
  bathroomRange: Range; // The number of bathrooms should be less than the number of bedrooms
  options: HousingOptionsConfig;
}

export interface ApartmentConfig extends HousingConfig {
  type: HousingType.Apartment;
  roomNumberRange: Range;
}

export interface CondoConfig extends HousingConfig {
  type: HousingType.Condo;
  roomNumberRange: Range;
}

type CoordinateStr = string;

export interface GenerationConfig extends Weight {
  name: string; // The name is only used for this config
  coordinatesList: Coordinate[][];
  housing: (HousingConfig | ApartmentConfig | CondoConfig)[];
}

const now = new Date();
const oldest = new Date();
oldest.setFullYear(oldest.getFullYear() - 3);

export const currentTime = now.getTime();
export const createdAtRange: Range = [oldest.getTime(), currentTime];
export const updatedAtFrequencyRange: Range = [1, 120].map(
  (day) => day * 24 * 60 * 60 * 1_000,
) as Range;
export const precisionMap = {
  coordinate: 1_000,
  price: 0.1,
  squareFeet: 1,
  trend: 10_000,
};
export const generationConfigs: GenerationConfig[] = [
  {
    name: "downtown",
    weight: 1,
    coordinatesList: [
      toCoordinates([
        "49.292542, -123.137084",
        "49.286606, -123.117919",
        "49.277239, -123.132334",
        "49.283804, -123.140758",
        "49.286963, -123.139232",
        "49.289966, -123.143673",
      ]),
      toCoordinates([
        "49.287431, -123.120311",
        "49.280629, -123.104396",
        "49.278257, -123.114994",
        "49.272651, -123.122305",
        "49.274217, -123.124946",
        "49.278290, -123.134206",
      ]),
    ],
    housing: [
      {
        type: HousingType.Condo,
        weight: 7,
        bedroom: 1,
        priceRange: [2_000, 3_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 1],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Condo,
        weight: 3,
        bedroom: 2,
        priceRange: [2_800, 5_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 2],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Condo,
        weight: 1,
        bedroom: 3,
        priceRange: [4_000, 7_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 3],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 8,
        bedroom: 1,
        priceRange: [1_800, 3_000],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 1],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 3,
        bedroom: 2,
        priceRange: [2_300, 4_100],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 2],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 1,
        bedroom: 3,
        priceRange: [2_600, 5_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 3],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
    ],
  },
  {
    name: "vancouver",
    weight: 2,
    coordinatesList: [
      toCoordinates([
        "49.280502, -123.099043",
        "49.280276, -123.045820",
        "49.219197, -123.048918",
        "49.207053, -123.139886",
        "49.237731, -123.188344",
        "49.269764, -123.189211",
        "49.271866, -123.143480",
        "49.264088, -123.135805",
        "49.266217, -123.098647",
      ]),
    ],
    housing: [
      {
        type: HousingType.Condo,
        weight: 7,
        bedroom: 1,
        priceRange: [1_500, 3_000],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 1],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Condo,
        weight: 3,
        bedroom: 2,
        priceRange: [1_800, 4_000],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 2],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Condo,
        weight: 1,
        bedroom: 3,
        priceRange: [2_500, 6_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 3],
        options: {
          cats: [1, 5],
          dogs: [1, 4],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 8,
        bedroom: 1,
        priceRange: [1_500, 2_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 1],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 3,
        bedroom: 2,
        priceRange: [1_800, 3_600],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 2],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.Apartment,
        weight: 1,
        bedroom: 3,
        priceRange: [2_500, 5_000],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 3],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.House,
        weight: 1,
        bedroom: 1,
        priceRange: [1_400, 2_500],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 1],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
      {
        type: HousingType.House,
        weight: 1,
        bedroom: 2,
        priceRange: [1_800, 3_000],
        trendRange: [-0.02, 0.05],
        bathroomRange: [1, 2],
        options: {
          cats: [1, 2],
          dogs: [2, 5],
          furnished: [3, 2],
        },
      },
    ],
  },
];

function toCoordinates(
  coordinates: (Coordinate | CoordinateStr)[],
): Coordinate[] {
  return _.chain(coordinates)
    .map((c) => {
      if (typeof c !== "string") {
        return c;
      }
      const [latitude, longitude] = c.split(", ").map((text) => Number(text));
      return { latitude, longitude };
    })
    .map((c) => ({
      latitude: roundCoordinate(c.latitude),
      longitude: roundCoordinate(c.longitude),
    }))
    .uniqBy((c) => `${c.latitude}:${c.longitude}`)
    .value();
}

function roundCoordinate(
  num: number,
  precision: number = precisionMap.coordinate,
): number {
  return Math.round(num * precision) / precision;
}
