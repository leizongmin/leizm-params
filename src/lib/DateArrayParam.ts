import { Param, ErrorMessageTemplate } from "./Param";
import { DateParam } from "./DateParam";

interface CastResult {
  success: boolean;
  message?: string;
  values?: Date[];
}

function castDateArray(name: string, list: any[]): CastResult {
  let values: Date[];
  try {
    values = list.map((item, index) => {
      return new DateParam(`${name}.${index}`, item).value;
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
  return { success: true, values };
}

export class DateArrayParam extends Param {
  protected _value: Date[];

  constructor(name: string, value: any) {
    if (typeof value === "string") {
      value = value.split(",");
    } else if (typeof value === "number" || value instanceof Date) {
      value = [value];
    } else if (!Array.isArray(value)) {
      super(
        name,
        false,
        ErrorMessageTemplate.failedToCast(name, "Date array", value)
      );
      return;
    }
    const ret = castDateArray(name, value);
    if (ret.success) {
      super(name, true);
      this._value = ret.values;
    } else {
      super(name, false, ret.message);
    }
  }

  public get value() {
    return this._getValue() as Date[];
  }
}
