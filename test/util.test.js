const t = require('babel-types');
const valueUtil = require('../src/utils/value');

describe('value 工具测试', () => {
  it('[getLiteral] value is number', () => {
    expect(valueUtil.getLiteral(5)).toEqual(t.numericLiteral(5));
  });

  it('[getLiteral] value is string', () => {
    expect(valueUtil.getLiteral('t')).toEqual(t.stringLiteral('t'));
  });

  it('[callExpressionWithRPX] value invalid', () => {
    const value = t.stringLiteral('invalid value');
    expect(valueUtil.callExpressionWithRPX(value)).toEqual(value);

    const ptValue = t.stringLiteral('123pt');
    expect(valueUtil.callExpressionWithRPX(ptValue)).toEqual(ptValue);

    const vhValue = t.stringLiteral('100vh');
    expect(valueUtil.callExpressionWithRPX(vhValue)).toEqual(vhValue);

    const vwValue = t.stringLiteral('100vw');
    expect(valueUtil.callExpressionWithRPX(vwValue)).toEqual(vwValue);
  });

  it('[callExpressionWithRPX] rpx value', () => {
    const value = t.stringLiteral('100rpx');

    const toValue = t.callExpression(t.identifier('__RPX'), [
      t.numericLiteral(100),
      t.numericLiteral(750),
    ]);

    expect(valueUtil.callExpressionWithRPX(value, { designWidth: 750 })).toEqual(toValue);
  });

  it('[callExpressionWithRPX] normal value', () => {
    const stringValue = t.stringLiteral('100');
    const numericValue = t.numericLiteral(100);

    const toValue = t.callExpression(t.identifier('__RPX'), [
      t.numericLiteral(100),
      t.numericLiteral(750),
    ]);

    expect(valueUtil.callExpressionWithRPX(stringValue, { designWidth: 750 })).toEqual(toValue);
    expect(valueUtil.callExpressionWithRPX(numericValue, { designWidth: 750 })).toEqual(toValue);
  });

  it('[transformUnit]', () => {
    // 123pt => 123
    expect(valueUtil.transformUnit(t.stringLiteral('123pt'))).toEqual(t.numericLiteral(123));

    // 100rpx => __RPX(100, 750)
    expect(valueUtil.transformUnit(t.stringLiteral('100rpx'), { designWidth: 750 })).toEqual(
      t.callExpression(t.identifier('__RPX'), [t.numericLiteral(100), t.numericLiteral(750)]),
    );

    // 50 => 50
    expect(valueUtil.transformUnit(t.numericLiteral(50))).toEqual(t.numericLiteral(50));

    // 40 => __RPX(40, 750)
    expect(valueUtil.transformUnit(t.numericLiteral(40), { rpx: true, designWidth: 750 })).toEqual(
      t.callExpression(t.identifier('__RPX'), [t.numericLiteral(40), t.numericLiteral(750)]),
    );
  });
});
