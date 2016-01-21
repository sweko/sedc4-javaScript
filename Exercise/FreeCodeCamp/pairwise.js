function pairwise(arr, arg) {
  var result = arr.map((item, index) => {return {item: item, index: index};});
  
  var total=0;
  for (var index = 0; index < result.length; index++) {
      var element = result[index];
      var match = result.filter(item => (item.item + element.item === arg) && (item.index > element.index)) [0];
      if (!match)
        continue;
        
      total += element.index + match.index;
      var mi = result.indexOf(match);
      result.splice(mi, 1);
      result.splice(index, 1);
      index--;
  }
  
  return total;
}

test("one", pairwise([1, 4, 2, 3, 0, 5], 7), 11);
test("two", pairwise([1, 3, 2, 4], 4), 1);
test("three", pairwise([1, 1, 1], 2), 1);
test("four", pairwise([0, 0, 0, 0, 1, 1], 1), 10);
test("five", pairwise([], 100), 0);