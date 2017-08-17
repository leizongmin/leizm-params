import { Param, ErrorMessageTemplate } from './Param';
import * as $ from './index';

export class AnyParam extends Param {

  protected _value: any;

  constructor(name: string, value: any) {
    if (typeof value === 'undefined') {
      super(name, false, ErrorMessageTemplate.failedToParse(name, 'any', value));
    } else {
      super(name, true);
      this._value = value;
    }
  }

  public get value() {
    return this._getValue() as any;
  }

  public toBoolean(): $.BooleanParam {
    return new $.BooleanParam(this.name, this.value);
  }

  public toBooleanArray(): $.BooleanArrayParam {
    return new $.BooleanArrayParam(this.name, this.value);
  }

  public toDate(): $.DateParam {
    return new $.DateParam(this.name, this.value);
  }

  public toDateArray(): $.DateArrayParam {
    return new $.DateArrayParam(this.name, this.value);
  }

  public toJSON(): $.JSONParam {
    return new $.JSONParam(this.name, this.value);
  }

  public toNumber(): $.NumberParam {
    return new $.NumberParam(this.name, this.value);
  }

  public toNumberArray(): $.NumberArrayParam {
    return new $.NumberArrayParam(this.name, this.value);
  }

  public toString(): $.StringParam {
    return new $.StringParam(this.name, this.value);
  }

  public toStringArray(): $.StringArrayParam {
    return new $.StringArrayParam(this.name, this.value);
  }

}
