function drawer(price, cash, cid) {
  var change = (cash-price) * 100, 
      result = [], 
      bankValue = 0,
      i;
  
  var bank = {};
  var values = {
      "PENNY": 1,
      "NICKEL": 5,
      "DIME": 10,
      "QUARTER": 25,
      "ONE": 100,
      "FIVE": 500,
      "TEN": 1000,
      "TWENTY": 2000,
      "ONE HUNDRED": 10000
  };
  var sizes = ["ONE HUNDRED", "TWENTY", "TEN","FIVE","ONE","QUARTER","DIME","NICKEL","PENNY"];
  
  for (i = 0; i < cid.length; i++) {
      var element = cid[i];
      bank[element[0]] = Math.round(element[1] * 100 / values[element[0]]);
      bankValue += element[1] * 100;
  }
  
  if (bankValue === change)
    return "Closed";
  
  for (i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    var value = values[size];
    var avail = bank[size];
    if (bankValue < change)
        return "Insufficient Funds";
    if (change > value){
        var bills = Math.min(avail, Math.floor(change / value));
        result.push([size, value * bills / 100]);
        change -= value * bills;
    }
    bankValue -= value * avail;
  }
  
  return result;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

test("half-a-dollar", drawer(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]), [["QUARTER", 0.50]], comparers.arrayArray);
test("break-a-hundred", drawer(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]), [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]], comparers.arrayArray);
test("just-a-penny", drawer(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), "Insufficient Funds");
test("penny-dollar", drawer(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), "Insufficient Funds");
test("fifty-pence", drawer(19.50, 20.00, [["PENNY", 0.50], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]), "Closed");
