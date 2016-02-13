function inventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    
    function invToObject(inv){
        var result = {};
        for (var index = 0; index < inv.length; index++) {
            var item = inv[index];
            result[item[1]] = item[0];
        }
        return result;
    }
    
    var inv1 = invToObject(arr1);
    var inv2 = invToObject(arr2);
    for (var key in inv2) {
        if (inv2.hasOwnProperty(key)) {
            if (inv1[key])
                inv1[key] = inv1[key]+inv2[key];
            else
                inv1[key] = inv2[key]; 
        }
    }
    
    var result=[];
    for (var key in inv1) {
        if (inv1.hasOwnProperty(key)) {
            result.push([inv1[key], key]);
        }
    }
    
    result.sort(function(a,b){
       return a[1].localeCompare(b[1]); 
    });
    
    return result;
    
}


test("one",inventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) ,  [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]], comparers.arrayArrayExact);
test("two",inventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []) ,  [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], comparers.arrayArrayExact);
test("three",inventory([], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) ,  [[67, "Bowling Ball"], [2, "Hair Pin"], [3, "Half-Eaten Apple"], [7, "Toothpaste"]], comparers.arrayArrayExact);
test("four",inventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]) ,  [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]], comparers.arrayArrayExact);