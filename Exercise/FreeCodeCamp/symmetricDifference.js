function sym() {
  var result =[];
  for (var index = 0; index < arguments.length; index++) {
      var locals = [];
      var element = arguments[index];
      var i, number;
      for (i = 0; i < element.length; i++) {
          number = element[i];
          if (locals.indexOf(number)===-1)
            locals.push(number);
      }
      
      for (i = 0; i < locals.length; i++) {
          number = locals[i];
          var rindex = result.indexOf(number);
          if (rindex===-1)
            result.push(number);
          else
            result.splice(rindex, 1);
      }
  }
  return result;
}

test("one", sym([1, 2, 3], [5, 2, 1, 4]), [3, 5, 4], comparers.array);
test("two", sym([1, 2, 5], [2, 3, 5], [3, 4, 5]), [1, 4, 5], comparers.array);
test("three", sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]) , [1, 4, 5], comparers.array);
test("four", sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]) , [7, 4, 6, 2, 3], comparers.array);
test("five", sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]) , [1, 2, 4, 5, 6, 7, 8, 9], comparers.array);