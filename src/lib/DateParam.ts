import { Param, ErrorMessageTemplate } from './Param';

export class DateParam extends Param {

  protected _value: Date;

  constructor(name: string, value: any) {
    if (value instanceof Date) {
      super(name, true);
      this._value = value;
    } else if (typeof value === 'string' || typeof value === 'number') {
      const v = new Date(value);
      if (isFinite(v.getTime())) {
        super(name, true);
        this._value = v;
      } else {
        super(name, false, ErrorMessageTemplate.failedToParse(name, 'date', value));
      }
    } else {
      super(name, false, ErrorMessageTemplate.failedToCast(name, 'date', value));
    }
  }

  public get value() {
    return this._getValue() as Date;
  }

}
