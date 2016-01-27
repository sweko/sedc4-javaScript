function test(testName, actual, expected, comparer) {
    var result = document.getElementById("result");
    var presult = document.createElement("p");

    if (typeof comparer === "undefined")
        comparer = comparers.default;

    if (comparer(actual, expected)) {
        presult.innerHTML = "<b>" + testName + "</b> passes successfully";
    } else {
        presult.innerHTML = "<b>" + testName + "</b> fails, expected <b>" + expected + "</b> actual <b>" + actual + "</b>";
    }
    result.appendChild(presult);
}

var comparers = {
    default: function (a, b) { return a === b; },
    array: function (a, b) {
        //shallow comparison
        if (!Array.isArray(a))
            return false;
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        var atemp = a.slice();
        var btemp = b.slice();
        atemp.sort();
        btemp.sort();
        for (var index = 0; index < atemp.length; index++) {
            if (atemp[index] !== btemp[index])
                return false;
        }
        return true;
    },
    arrayArray: function (a, b) {
        //shallow comparison
        if (!Array.isArray(a))
            return false;
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        var atemp = a.slice();
        var btemp = b.slice();
        atemp.sort();
        btemp.sort();
        for (var index = 0; index < atemp.length; index++) {
            if (!comparers.array(atemp[index], btemp[index]))
                return false;
        }
        return true;
    },
    arrayExact: function (a, b) {
        //shallow comparison
        if (!Array.isArray(a))
            return false;
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (var index = 0; index < a.length; index++) {
            if (a[index] !== b[index])
                return false;
        }
        return true;
    },
    arrayArrayExact: function (a, b) {
        //shallow comparison
        if (!Array.isArray(a))
            return false;
        if (!Array.isArray(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (var index = 0; index < a.length; index++) {
            if (!comparers.arrayExact(a[index], b[index]))
                return false;
        }
        return true;
    },


};



