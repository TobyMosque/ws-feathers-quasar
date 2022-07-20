import { Service, MemoryServiceOptions } from "feathers-memory";
import { Application } from "../../declarations";
import { EntityModel } from "./entities.model";

export class Entities extends Service<EntityModel> {
  static docs: any;
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MemoryServiceOptions>, app: Application) {
    super(options);
  }
}
