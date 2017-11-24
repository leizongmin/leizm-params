export class Param {
  constructor(
    public name: string,
    protected _success: boolean,
    protected _errorMessage?: string
  ) {}

  /**
   * 获取参数的值，如果无法正确解析参数，会抛出异常
   */
  protected _getValue() {
    if (this._success) {
      return (this as any)["_value"];
    }
    throw new ParamError(this.name, this._errorMessage);
  }

  /**
   * 是否解析失败
   */
  public get fail() {
    return !this._success;
  }

  /**
   * 是否解析成功
   */
  public get ok() {
    return this._success;
  }

  /**
   * 获取解析出错信息，如果正常则返回OK
   */
  public get message() {
    return this._success ? "OK" : this._errorMessage;
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
