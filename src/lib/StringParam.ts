import { Param, ErrorMessageTemplate } from "./Param";

export class StringParam extends Param {
  protected _value: string;

  constructor(name: string, value: any) {
    const t = typeof value;
    if (t === "undefined" || value === null) {
      super(name, true);
      this._value = "";
    } else if (
      t === "boolean" ||
      t === "number" ||
      t === "symbol" ||
      t === "string" ||
      value instanceof RegExp
    ) {
      super(name, true);
      this._value = String(value);
    } else if (value instanceof Date) {
      super(name, true);
      this._value = value.toISOString();
    } else if (value instanceof Error) {
      super(name, true);
      this._value = value.toString();
    } else {
      super(
        name,
        false,
        ErrorMessageTemplate.failedToCast(name, "string", JSON.stringify(value))
      );
    }
  }

  public get value() {
    return this._getValue() as string;
  }
}
