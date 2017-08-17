import { Param, ErrorMessageTemplate } from './Param';
import { NumberParam } from './NumberParam';

interface CastResult {
  success: boolean;
  message?: string;
  values?: number[];
}

function castNumberArray(name: string, list: any[]): CastResult {
  let values: number[];
  try {
    values = list.map((item, index) => {
      return new NumberParam(`${name}.${index}`, item).value;
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
  return { success: true, values };
}

export class NumberArrayParam extends Param {

  protected _value: number[];

  constructor(name: string, value: any) {
    if (typeof value === 'number') {
      super(name, true);
      this._value = [ value ];
    } else if (Array.isArray(value)) {
      const ret = castNumberArray(name, value);
      if (ret.success) {
        super(name, true);
        this._value = ret.values;
      } else {
        super(name, false, ret.message);
      }
    } else if (typeof value === 'string') {
      value = value.trim();
      if (!value) {
        super(name, true);
        this._value = [];
      } else {
        const ret = castNumberArray(name, value.split(','));
        if (ret.success) {
          super(name, true);
          this._value = ret.values;
        } else {
          super(name, false, ret.message);
        }
      }
    } else {
      super(name, false, ErrorMessageTemplate.failedToCast(name, 'number array', value));
    }
  }

  public get value() {
    return this._getValue() as number[];
  }

}
