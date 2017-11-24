import { Param, ErrorMessageTemplate } from "./Param";

export class NumberParam extends Param {
  protected _value: number;

  constructor(name: string, value: any) {
    if (typeof value === "number") {
      super(name, true);
      this._value = value;
    } else if (typeof value === "string") {
      const v = Number(value);
      if (isNaN(v)) {
        super(
          name,
          false,
          ErrorMessageTemplate.failedToParse(name, "number", value)
        );
      } else {
        super(name, true);
        this._value = v;
      }
    } else {
      super(
        name,
        false,
        ErrorMessageTemplate.failedToCast(name, "number", value)
      );
    }
  }

  public get value() {
    return this._getValue() as number;
  }
}
