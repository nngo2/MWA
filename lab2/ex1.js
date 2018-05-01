'use strict';
Array.prototype.odd = function () {
    let result = [];
    for (const [index, value] of this.entries()) {
        if (index % 2 == 0 ) {
            result.push(value);
        }
    }
    return result;
}

Array.prototype.even = function () {
    let result = [];
    for (const [index, value] of this.entries()) {
        if (index % 2 != 0 ) {
            result.push(value);
        }
    }
    return result;
}

console.log([1,2,3,4,5,6,7,8].even());
console.log([1,2,3,4,5,6,7,8].odd());