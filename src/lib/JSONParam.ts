import { Param, ErrorMessageTemplate } from './Param';

export class JSONParam extends Param {

  protected _value: any;

  constructor(name: string, value: any) {
    if (typeof value === 'string') {
      let v: any;
      try {
        v = JSON.parse(value);
      } catch (err) {
        super(name, false, ErrorMessageTemplate.failedToParse(name, 'json', value));
        return;
      }
      super(name, true);
      this._value = v;
    } else {
      super(name, false, ErrorMessageTemplate.failedToCast(name, 'json', value));
    }
  }

  public get value() {
    return this._getValue() as any;
  }

}
