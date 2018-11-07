// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator
// Return true if the passed string looks like a valid US phone number.
// The area code is required. If the country code is provided, you must confirm
// that the country code is 1.

// WARNING: DO NOT USE IN PRODUCTION CODE.

"use strict";
(function () {
  function telephoneCheck(str) {
    // Good luck!
    let regex = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}\W?\d{4}$/;
    return regex.test(str);
  }

  telephoneCheck("555-555-5555"); should return a boolean.
  telephoneCheck("1 555-555-5555"); should return true.
  telephoneCheck("1 (555) 555-5555"); should return true.
  telephoneCheck("5555555555"); should return true.
  telephoneCheck("555-555-5555"); should return true.
  telephoneCheck("(555)555-5555"); should return true.
  telephoneCheck("1(555)555-5555"); should return true.
  telephoneCheck("555-5555"); should return false.
  telephoneCheck("5555555"); should return false.
  telephoneCheck("1 555)555-5555"); should return false.
  telephoneCheck("1 555 555 5555"); should return true.
  telephoneCheck("1 456 789 4444"); should return true.
  telephoneCheck("123**&!!asdf#"); should return false.
  telephoneCheck("55555555"); should return false.
  telephoneCheck("(6054756961)"); should return false
  telephoneCheck("2 (757) 622-7382"); should return false.
  telephoneCheck("0 (757) 622-7382"); should return false.
  telephoneCheck("-1 (757) 622-7382"); should return false
  telephoneCheck("2 757 622-7382"); should return false.
  telephoneCheck("10 (757) 622-7382"); should return false.
  telephoneCheck("27576227382"); should return false.
  telephoneCheck("(275)76227382"); should return false.
  telephoneCheck("2(757)6227382"); should return false.
  telephoneCheck("2(757)622-7382"); should return false.
  telephoneCheck("555)-555-5555"); should return false.
  telephoneCheck("(555-555-5555"); should return false.
  telephoneCheck("(555)5(55?)-5555"); should return false.
