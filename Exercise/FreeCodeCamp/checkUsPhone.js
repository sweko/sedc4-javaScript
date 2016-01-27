function telephoneCheck(str) {
  var regex = /^(1[ -]?)?(\(?\d{3}\)?)[ -]?\d{3}[ -]?\d{4}$/gmi;
  var result = regex.exec(str);
  if (!result)
    return false;
  var ones = ["1", "1-","1 "];
  var toCheck = result[2];
  regex = /(^\d{3}$)|(^\(\d{3}\)$)/gmi;
  return regex.test(toCheck);
}

test('telephoneCheck("555-555-5555")', telephoneCheck("555-555-5555"), true);
test('telephoneCheck("1 555-555-5555")', telephoneCheck("1 555-555-5555") , true);
test('telephoneCheck("1 (555) 555-5555")', telephoneCheck("1 (555) 555-5555") , true);
test('telephoneCheck("5555555555")', telephoneCheck("5555555555") , true);
test('telephoneCheck("(555)555-5555")', telephoneCheck("(555)555-5555") , true);
test('telephoneCheck("1(555)555-5555")', telephoneCheck("1(555)555-5555") , true);
test('telephoneCheck("1 555)555-555")', telephoneCheck("1 555)555-555") , false);
test('telephoneCheck("1 555 555 5555")', telephoneCheck("1 555 555 5555") , true);
test('telephoneCheck("1 456 789 4444")', telephoneCheck("1 456 789 4444") , true);
test('telephoneCheck("123**&!!asdf#")', telephoneCheck("123**&!!asdf#") , false);
test('telephoneCheck("55555555")', telephoneCheck("55555555") , false);
test(telephoneCheck("(6505552368)") , false);
test(telephoneCheck("2 (757) 622-7382") , false);
test(telephoneCheck("0 (757) 622-7382") , false);
test(telephoneCheck("-1 (757) 622-7382") , false);
test(telephoneCheck("2 757 622-7382") , false);
test(telephoneCheck("10 (757) 622-7382") , false);
test(telephoneCheck("27576227382") , false);
test(telephoneCheck("(275)76227382") , false);
test(telephoneCheck("2(757)6227382") , false);
test(telephoneCheck("2(757)622-7382") , false);
test(telephoneCheck("555)-555-5555") , false);
test(telephoneCheck("(555-555-5555") , false);