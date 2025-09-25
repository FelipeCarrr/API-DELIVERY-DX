import { UnitOfMeasure } from "../models/unit_of_measure.model.js";

const unitsOfMeasure = [
  { name: "kg" },
  { name: "g" },
  { name: "L" },
  { name: "ml" },
  { name: "units" },
];

export class UnitOfMeasureService {
  static async createUnitsOfMeasure() {
    try {
      for (const unit of unitsOfMeasure) {
        await UnitOfMeasure.findOrCreate({ where: { name: unit.name } });
      }
    } catch (error) {
      throw new Error(`Error creating units of measure: ${error.message}`);
    }
  }
}