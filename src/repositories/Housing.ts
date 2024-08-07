import * as entities from "@/entities";
import * as services from "@/services";
import housingData from "./data/housing.json";

export class HousingRepository implements services.Housing.Repository {
  async getList(): Promise<entities.Housing[]> {
    return housingData.map((data) => entities.Housing.instantiate(data));
  }
}
