import * as entities from "@/entities";

export interface Housing {
  getList(): Promise<entities.Housing[]>;
}

export namespace Housing {
  export interface Repository {
    getList(): Promise<entities.Housing[]>;
  }
}

export class HousingService implements Housing {
  constructor(private readonly repository: Housing.Repository) {}

  async getList(): Promise<entities.Housing[]> {
    return this.repository.getList();
  }
}
