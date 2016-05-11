/*
    Zemi gi bukvite na broevite od https://mk.wikipedia.org/wiki/%D0%9C%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D1%81%D0%BA%D0%B8_%D0%B1%D1%80%D0%BE%D0%B5%D0%B2%D0%B8
*/

QUnit.test( "Test numbers", function ( assert ) {
  assert.strictEqual( mk.toWords(0), 'Нула', "Passed!" );
  assert.strictEqual( mk.toWords(1), 'Еден', "Passed!" );
  assert.strictEqual( mk.toWords(2), 'Два', "Passed!" );
  assert.strictEqual( mk.toWords(10), 'Десет', "Passed!" );
  assert.strictEqual( mk.toWords(12), 'Дванаесет', "Passed!" );
  assert.strictEqual( mk.toWords(26), 'Дваесет и шест', "Passed!" );
  assert.strictEqual( mk.toWords(90), 'Деведесет', "Passed!" );
  assert.strictEqual( mk.toWords(1254), 'Илјада двесте педесет и четири', "Passed!" );
  assert.strictEqual( mk.toWords(2001), 'Две илјади еден', "Passed!" );
  assert.strictEqual( mk.toWords(32012), 'Триесет и две илјади дванаесет', "Passed!" );
  assert.strictEqual( mk.toWords(21431011), 'Дваесет и еден милион четиристотини триесет и една илјада единаесет', "Passed!" );
  assert.strictEqual( mk.toWords(294000011), 'Двесте деведесет и четири милиони единаесет', "Passed!" );
  assert.strictEqual( mk.toWords(912544912433), 'Деветстотини и дванаесет милијарди петстотини четериесет и четири милиони деветстотини и дванаесет илјади четиристотини триесет и три', "Passed!" );
  assert.strictEqual( mk.toWords(900000000003), 'Деветстотини милијарди три', "Passed!" );
  assert.strictEqual( mk.toWords(303001000005), 'Триста и три милијарди еден милион пет', "Passed!" );
});