import { expect } from "chai";
import * as $ from "../lib";

describe("param", function() {
  it("正确解析 Number 参数", function() {
    expect(new $.NumberParam("a", 123).value).to.equal(123);
    expect(new $.NumberParam("a", "1234").value).to.equal(1234);
    expect(new $.NumberParam("a", 123).ok).to.equal(true);
    expect(new $.NumberParam("a", 123).fail).to.equal(false);
    expect(new $.NumberParam("a", "xxx").ok).to.equal(false);
    expect(new $.NumberParam("a", "xxx").fail).to.equal(true);
    expect(() => new $.NumberParam("a", null).value).to.throws($.ParamError);
  });

  it("正确解析 NumberArray 参数", function() {
    expect(new $.NumberArrayParam("a", 123).value).to.deep.equal([123]);
    expect(new $.NumberArrayParam("a", "222").value).to.deep.equal([222]);
    expect(new $.NumberArrayParam("a", "123,456").value).to.deep.equal([
      123,
      456
    ]);
    expect(new $.NumberArrayParam("a", [123, 456]).value).to.deep.equal([
      123,
      456
    ]);
    expect(new $.NumberArrayParam("a", [123, 456, "789"]).value).to.deep.equal([
      123,
      456,
      789
    ]);
    expect(new $.NumberArrayParam("a", "xxx").fail).to.equal(true);
    expect(new $.NumberArrayParam("a", ["xxx"]).fail).to.equal(true);
    expect(new $.NumberArrayParam("a", [123, "xxx"]).fail).to.equal(true);
  });

  it("正确解析 String 参数", function() {
    const date = new Date();
    expect(new $.StringParam("a", 111).value).to.equal("111");
    expect(new $.StringParam("a", true).value).to.equal("true");
    expect(new $.StringParam("a", false).value).to.equal("false");
    expect(new $.StringParam("a", date).value).to.equal(date.toISOString());
    expect(new $.StringParam("a", null).value).to.equal("");
    expect(new $.StringParam("a", undefined).value).to.equal("");
    expect(new $.StringParam("a", "").value).to.equal("");
    expect(new $.StringParam("a", "123").value).to.equal("123");
    expect(new $.StringParam("a", new Error("test")).value).to.equal(
      "Error: test"
    );
    expect(new $.StringParam("a", /hello/).value).to.equal("/hello/");
    expect(new $.StringParam("a", {}).fail).to.equal(true);
  });

  it("正确解析 StringArray 参数", function() {
    expect(new $.StringArrayParam("a", 111).value).to.deep.equal(["111"]);
    expect(new $.StringArrayParam("a", [111]).value).to.deep.equal(["111"]);
    expect(new $.StringArrayParam("a", [111, "hello"]).value).to.deep.equal([
      "111",
      "hello"
    ]);
    expect(new $.StringArrayParam("a", [111, "hello", {}]).fail).to.equal(true);
  });

  it("正确解析 Boolean 参数", function() {
    expect(new $.BooleanParam("a", true).value).to.equal(true);
    expect(new $.BooleanParam("a", false).value).to.equal(false);
    expect(new $.BooleanParam("a", "true").value).to.equal(true);
    expect(new $.BooleanParam("a", "on").value).to.equal(true);
    expect(new $.BooleanParam("a", "yes").value).to.equal(true);
    expect(new $.BooleanParam("a", "1").value).to.equal(true);
    expect(new $.BooleanParam("a", 1).value).to.equal(true);
    expect(new $.BooleanParam("a", "false").value).to.equal(false);
    expect(new $.BooleanParam("a", "off").value).to.equal(false);
    expect(new $.BooleanParam("a", "OFf").value).to.equal(false);
    expect(new $.BooleanParam("a", "no").value).to.equal(false);
    expect(new $.BooleanParam("a", "0").value).to.equal(false);
    expect(new $.BooleanParam("a", 0).value).to.equal(false);
    expect(new $.BooleanParam("a", undefined).value).to.equal(false);
    expect(new $.BooleanParam("a", null).value).to.equal(false);
    expect(new $.BooleanParam("a", {}).fail).to.equal(true);
  });

  it("正确解析 BooleanArray 参数", function() {
    expect(new $.BooleanArrayParam("a", true).value).to.deep.equal([true]);
    expect(new $.BooleanArrayParam("a", false).value).to.deep.equal([false]);
    expect(new $.BooleanArrayParam("a", 1).value).to.deep.equal([true]);
    expect(new $.BooleanArrayParam("a", "off").value).to.deep.equal([false]);
    expect(new $.BooleanArrayParam("a", null).value).to.deep.equal([false]);
    expect(new $.BooleanArrayParam("a", undefined).value).to.deep.equal([
      false
    ]);
    expect(
      new $.BooleanArrayParam("a", [
        true,
        false,
        "on",
        "off",
        1,
        0,
        null,
        undefined,
        "yes",
        "no"
      ]).value
    ).to.deep.equal([
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false
    ]);
    expect(new $.BooleanArrayParam("a", [1, "xxx"]).fail).to.equal(true);
  });

  it("正确解析 JSON 参数", function() {
    expect(new $.JSONParam("a", "111").value).to.equal(111);
    expect(new $.JSONParam("a", "true").value).to.equal(true);
    expect(new $.JSONParam("a", "false").value).to.equal(false);
    expect(new $.JSONParam("a", "null").value).to.equal(null);
    expect(new $.JSONParam("a", '"hello"').value).to.equal("hello");
    expect(new $.JSONParam("a", '{"a":123,"b":"456"}').value).to.deep.equal({
      a: 123,
      b: "456"
    });
    expect(new $.JSONParam("a", '"a').fail).to.equal(true);
    expect(new $.JSONParam("a", "/").fail).to.equal(true);
    expect(new $.JSONParam("a", null).fail).to.equal(true);
    expect(new $.JSONParam("a", true).fail).to.equal(true);
    expect(new $.JSONParam("a", {}).fail).to.equal(true);
  });

  it("正确解析 Date 参数", function() {
    const date = new Date(1502000847000);
    expect(new $.DateParam("a", date).value).to.deep.equal(date);
    expect(new $.DateParam("a", date.getTime()).value).to.deep.equal(date);
    expect(new $.DateParam("a", date.toString()).value).to.deep.equal(date);
    expect(new $.DateParam("a", "xxx").fail).to.equal(true);
    expect(new $.DateParam("a", "12345678").fail).to.equal(true);
    expect(new $.DateParam("a", {}).fail).to.equal(true);
  });

  it("正确解析 DateArray 参数", function() {
    const date = new Date(1502000847000);
    expect(new $.DateArrayParam("a", date).value).to.deep.equal([date]);
    expect(new $.DateArrayParam("a", date.getTime()).value).to.deep.equal([
      date
    ]);
    expect(new $.DateArrayParam("a", date.toString()).value).to.deep.equal([
      date
    ]);
    expect(
      new $.DateArrayParam("a", [date.getTime(), date.toString()]).value
    ).to.deep.equal([date, date]);
    expect(new $.DateArrayParam("a", [date.getTime(), "xxx"]).fail).to.equal(
      true
    );
  });

  it("正确解析 Any 参数", function() {
    expect(new $.AnyParam("a", null).value).to.equal(null);
    expect(new $.AnyParam("a", 123).value).to.equal(123);
    expect(new $.AnyParam("a", true).value).to.equal(true);
    expect(new $.AnyParam("a", false).value).to.equal(false);
    expect(new $.AnyParam("a", "hello").value).to.equal("hello");
    expect(new $.AnyParam("a", ["hello", 123]).value).to.deep.equal([
      "hello",
      123
    ]);
    expect(new $.AnyParam("a", { a: 111 }).value).to.deep.equal({ a: 111 });
    expect(new $.AnyParam("a", undefined).fail).to.equal(true);
  });

  it("Any 参数正确转换到其他参数", function() {
    expect(new $.AnyParam("a", "123").toNumber().value).to.equal(123);
    expect(new $.AnyParam("a", 123).toString().value).to.equal("123");
    expect(new $.AnyParam("a", "on").toBoolean().value).to.equal(true);
    expect(new $.AnyParam("a", "on").toBooleanArray().value).to.deep.equal([
      true
    ]);
    expect(new $.AnyParam("a", "111,222").toStringArray().value).to.deep.equal([
      "111,222"
    ]);
  });
});
