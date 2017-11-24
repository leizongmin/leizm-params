import { Param } from "./Param";
import { StringParam } from "./StringParam";

interface CastResult {
  success: boolean;
  message?: string;
  values?: string[];
}

function castStringArray(name: string, list: any[]): CastResult {
  let values: string[];
  try {
    values = list.map((item, index) => {
      return new StringParam(`${name}.${index}`, item).value;
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
  return { success: true, values };
}

export class StringArrayParam extends Param {
  protected _value: string[];

  constructor(name: string, value: any) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    const ret = castStringArray(name, value);
    if (ret.success) {
      super(name, true);
      this._value = ret.values;
    } else {
      super(name, false, ret.message);
    }
  }

  public get value() {
    return this._getValue() as string[];
  }
}
