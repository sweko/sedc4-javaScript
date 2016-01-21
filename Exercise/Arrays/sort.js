function orderAge(array){
    var result = [];
    if (array.length <=1)
        return array;
    
    var temp = array.copy();
    while (temp.length !== 0){
        var mindex = 0;
        for (var index = 0; index < temp.length; index++) {
            if (temp[mindex].age > temp[index].age){
                mindex = index;
            }
        }
        result.push(temp[mindex]);
        temp.delete(mindex);
    }
    return result;
}


function orderWeight(array){
    var result = [];
    if (array.length <=1)
        return array;
    
    var temp = array.copy();
    while (temp.length !== 0){
        var mindex = 0;
        for (var index = 0; index < temp.length; index++) {
            if (temp[mindex].weight > temp[index].weight){
                mindex = index;
            }
        }
        result.push(temp[mindex]);
        temp.delete(mindex);
    }
    return result;
}

function orderHeight(array){
    var result = [];
    if (array.length <=1)
        return array;
    
    var temp = array.copy();
    while (temp.length !== 0){
        var mindex = 0;
        for (var index = 0; index < temp.length; index++) {
            if (temp[mindex].height > temp[index].height){
                mindex = index;
            }
        }
        result.push(temp[mindex]);
        temp.delete(mindex);
    }
    return result;
}

function getDistance(student){
    return Math.random(100);
}

function orderDistance(array){
    var result = [];
    if (array.length <=1)
        return array;
    
    var temp = array.copy();
    while (temp.length !== 0){
        var mindex = 0;
        for (var index = 0; index < temp.length; index++) {
            if (getDistance(temp[mindex]) > getDistance(temp[index])){
                mindex = index;
            }
        }
        result.push(temp[mindex]);
        temp.delete(mindex);
    }
    return result;
}

Array.prototype.copy = function(){
    return this.slice();
};

Array.prototype.delete = function(index){
    return this.splice(index, 1);
};

Array.prototype.insert = function(index, item){
    return this.splice(index, 0, item);
};

function order(array, criterium){
    var result = [];
    if (array.length <=1)
        return array;
    
    var temp = array.copy();
    while (temp.length !== 0){
        var mindex = 0;
        for (var index = 0; index < temp.length; index++) {
            if (criterium(temp[mindex]) < criterium(temp[index])){
                mindex = index;
            }
        }
        result.push(temp[mindex]);
        temp.delete(mindex);
    }
    return result;
}


function orderLastName(array){
    var lastNameSelector = function(student){
      return student.lastName;  
    };
    return order(array, lastNameSelector); 
}