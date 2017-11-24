import { Param, ErrorMessageTemplate } from "./Param";
import { BooleanParam } from "./BooleanParam";

interface CastResult {
  success: boolean;
  message?: string;
  values?: boolean[];
}

function castBooleanArray(name: string, list: any[]): CastResult {
  let values: boolean[];
  try {
    values = list.map((item, index) => {
      return new BooleanParam(`${name}.${index}`, item).value;
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
  return { success: true, values };
}

export class BooleanArrayParam extends Param {
  protected _value: boolean[];

  constructor(name: string, value: any) {
    const t = typeof value;
    if (t === "string") {
      value = value.split(",");
    } else if (
      t === "number" ||
      t === "boolean" ||
      t === "undefined" ||
      value === null
    ) {
      value = [value];
    } else if (!Array.isArray(value)) {
      super(
        name,
        false,
        ErrorMessageTemplate.failedToCast(name, "boolean array", value)
      );
      return;
    }
    const ret = castBooleanArray(name, value);
    if (ret.success) {
      super(name, true);
      this._value = ret.values;
    } else {
      super(name, false, ret.message);
    }
  }

  public get value() {
    return this._getValue() as boolean[];
  }
}
