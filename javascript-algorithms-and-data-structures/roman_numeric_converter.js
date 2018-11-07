// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter
// Convert the given number into a roman numeral.
// All roman numerals answers should be provided in upper-case.

"use strict";

function convertToRoman(num) {
    let rTable = [
        [1,	"I"],
        [4,	"IV"],
        [5,	"V"],
        [9, "IX"],
        [10, "X"],
        [40, "XL"],
        [50, "L"],
        [90, "XC"],
        [100, "C"],
        [400, "CD"],
        [500, "D"],
        [900, "CM"],
        [1000, "M"]];
    let roman = [];
    let i = rTable.length-1;
    while (i>=0) {
        if (rTable[i][0] > num) {
            i--;
        } else {
            roman.push(rTable[i][1]);
            num = num - rTable[i][0];
        }
    }
    return roman.join("");
}

convertToRoman(36);
convertToRoman(2); //should return "II".
convertToRoman(3); //should return "III".
convertToRoman(4); //should return "IV".
convertToRoman(5); //should return "V".
convertToRoman(9); //should return "IX".
convertToRoman(12); //should return "XII".
convertToRoman(16); //should return "XVI".
convertToRoman(29); //should return "XXIX".
convertToRoman(44); //should return "XLIV".
convertToRoman(45); //should return "XLV"
convertToRoman(68); //should return "LXVIII"
convertToRoman(83); //should return "LXXXIII"
convertToRoman(97); //should return "XCVII"
convertToRoman(99); //should return "XCIX"
convertToRoman(400); //should return "CD"
convertToRoman(500); //should return "D"
convertToRoman(501); //should return "DI"
convertToRoman(649); //should return "DCXLIX"
convertToRoman(798); //should return "DCCXCVIII"
convertToRoman(891); //should return "DCCCXCI"
convertToRoman(1000); //should return "M"
convertToRoman(1004); //should return "MIV"
convertToRoman(1006); //should return "MVI"
convertToRoman(1023); //should return "MXXIII"
convertToRoman(2014); //should return "MMXIV"
convertToRoman(3999); //should return "MMMCMXCIX"
