export class Param {

  constructor(public name: string, private _success: boolean, private _errorMessage?: string) { }

  /**
   * 获取参数的值，如果无法正确解析参数，会抛出异常
   */
  protected _getValue() {
    if (this._success) {
      return (this as any)['_value'];
    }
    throw new ParamError(this.name, this._errorMessage);
  }

  /**
   * 是否解析失败
   */
  public get isError() {
    return !this._success;
  }

  /**
   * 是否解析成功
   */
  public get isOk() {
    return this._success;
  }

}

export class ParamError extends Error {

  /**
   * 参数名
   */
  public param: string;

  constructor(name: string, msg: string) {
    super();
    this.name = this.constructor.name;
    this.message = msg;
    this.param = name;
  }

}

export class ErrorMessageTemplate {

  public static failedToParse(name: string, type: string, value: any): string {
    return `[${name}] failed to parse ${type} value: ${value}`;
  }

  public static failedToCast(name: string, type: string, value: any): string {
    return `[${name}] cast to ${type} failed: ${value}`;
  }

}

