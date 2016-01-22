function permAlone(str) {
    var getPermutations = function (current, chars) {
        if (chars.length === 0)
            return [current];

        var result = [];
        var char = chars[0];
        var cchars = chars.slice();
        cchars.splice(0, 1);
        for (var i = 0; i <= current.length; i++) {
            var perm = current.slice();
            perm.splice(i, 0, char);
            //result = cleanDuplicates(result.concat(getPermutations(perm, cchars)));
            result = result.concat(getPermutations(perm, cchars));
        }
        return result;
    };

    // var cleanDuplicates = function (array) {
    //     array.sort(function(f,s){
    //         return f.join().localeCompare(s.join());
    //     });
    //     for (var i = array.length - 1; i > 0; i--) {
    //         var match = true;
    //         var current = array[i];
    //         var prev = array[i - 1];
    //         
    //         for (var index = 0; index < current.length; index++) {
    //             var f = current[index];
    //             var s = prev[index];
    //             if (f!==s){
    //                 match = false;
    //                 break;
    //             }
    //         }
    //         
    //         if (match)
    //             array.splice(i, 1);
    //     }
    //     return array;
    // };

    var chars = str.split('');
    var permutations = getPermutations([], chars);
    
    var nonDouble = permutations.filter(function (item){return !/(\w)\1/.test(item.join(''));});
    
    return nonDouble.length;
}

//test("ab", permAlone("ab"), 2);

//test("aaaaab", permAlone("aaaaab"), 24);

test("aab",permAlone("aab"),2);
test("aaa",permAlone("aaa"),0);
test("aabb",permAlone("aabb"),8);
test("abcdefa",permAlone("abcdefa"),3600);
test("abfdefa",permAlone("abfdefa"),2640);
test("zzzzzzzz",permAlone("zzzzzzzz"),0);