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

export interface HousingProps extends Coordinate {
  id: string;
  name: string;
  type: HousingType;
  image: string;
  price: number;
  priceHistory: PriceHistory[];
  bedroom: number;
  bathroom: number;
  squareFeet: number;
  createdAt: number;
  updatedAt: number;
  options: HousingOptions;
}

export class Housing implements HousingProps {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly type: HousingType,
    readonly image: string, // base64,
    readonly price: number,
    readonly priceHistory: PriceHistory[],
    readonly bedroom: number,
    readonly bathroom: number,
    readonly squareFeet: number,
    readonly createdAt: number,
    readonly updatedAt: number,
    readonly latitude: number,
    readonly longitude: number,
    readonly options: HousingOptions,
  ) {}

  static instantiate(props: HousingProps): Housing {
    return new Housing(
      props.id,
      props.name,
      props.type,
      props.image,
      props.price,
      props.priceHistory,
      props.bedroom,
      props.bathroom,
      props.squareFeet,
      props.createdAt,
      props.updatedAt,
      props.latitude,
      props.longitude,
      props.options,
    );
  }
}
