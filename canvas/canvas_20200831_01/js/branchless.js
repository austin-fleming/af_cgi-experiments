
/*
Branchless programming:
Removes overhead of loading conditions

Basic model:
a*(condition resulting in a being returned) + b*(condition resulting in b being returned) + ....
*/

/**
 * Returns smaller of two numbers
 * @param {Number} a 
 * @param {Number} b
 * @return {Number} Smaller of the two numbers
 */
function smaller (a, b) {
    return a*(a < b) + b*(b < a);
}