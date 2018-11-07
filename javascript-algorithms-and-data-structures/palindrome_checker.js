// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker
// Return true if the given string is a palindrome. Otherwise, return false.
// You'll need to remove all non-alphanumeric characters (punctuation, spaces
// and symbols) and turn everything into the same case (lower or upper case)
// in order to check for palindromes.

"use strict";

    function palindrome(str) {
      let newStr = str.split(/[\W_]/ig).filter( (item) => item).join("").toLowerCase();
      let reverseStr = "";
      for (let i=newStr.length-1; i>=0; i--) {
          reverseStr=reverseStr+newStr[i];
      }
      return (newStr === reverseStr);
    }

    palindrome("eye"); //should return a boolean.
    palindrome("eye"); //should return true.
    palindrome("_eye"); //should return true.
    palindrome("race car"); //should return true.
    palindrome("not a palindrome"); //should return false.
    palindrome("A man, a plan, a canal. Panama"); //should return true.
    palindrome("never odd or even"); //should return true.
    palindrome("nope"); //should return false.
    palindrome("almostomla"); //should return false.
    palindrome("My age is 0, 0 si ega ym."); //should return true.
    palindrome("1 eye for of 1 eye."); //should return false.
    palindrome("0_0 (: /-\ :) 0-0"); //should return true.
    palindrome("five|\_/|four"); //should return false.
