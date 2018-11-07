// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher
// Write a function which takes a ROT13 encoded string as input and returns a decoded string.
// All letters will be uppercase. Do not transform any non-alphabetic character
// (i.e. spaces, punctuation), but do pass them on.

"use strict";

function rot13(str) { // LBH QVQ VG!
    const cipherStr =  "NOPQRSTUVWXYZABCDEFGHIJKLM";
    const decodedStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let text = "";
    for (let i=0; i<str.length; i++) {
      let pos = cipherStr.indexOf(str[i]);
      if (pos != -1) {
        text = text + decodedStr[pos];
      } else {
        text = text + str[i];
      }
    }
    return text;

}


rot13("SERR PBQR PNZC"); // should decode to FREE CODE CAMP
rot13("SERR CVMMN!"); // should decode to FREE PIZZA!
rot13("SERR YBIR?"); // should decode to FREE LOVE?
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."); // should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
