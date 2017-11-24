import { Param, ErrorMessageTemplate } from "./Param";

export class BooleanParam extends Param {
  protected _value: boolean;

  constructor(name: string, value: any) {
    if (typeof value === "boolean") {
      super(name, true);
      this._value = value;
    } else if (typeof value === "string") {
      const v = value.toLowerCase().trim();
      if (v === "true" || v === "on" || v === "1" || v === "yes") {
        super(name, true);
        this._value = true;
      } else if (v === "false" || v === "off" || v === "0" || v === "no") {
        super(name, true);
        this._value = false;
      } else {
        super(
          name,
          false,
          ErrorMessageTemplate.failedToParse(name, "boolean", value)
        );
      }
    } else if (value === 1) {
      super(name, true);
      this._value = true;
    } else if (value === 0 || typeof value === "undefined" || value === null) {
      super(name, true);
      this._value = false;
    } else {
      super(
        name,
        false,
        ErrorMessageTemplate.failedToCast(name, "boolean", value)
      );
    }
  }

  public get value() {
    return this._getValue() as boolean;
  }
}
