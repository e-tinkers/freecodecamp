// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
// Design a cash register drawer function checkCashRegister() that accepts purchase
// price as the first argument (price), payment as the second argument (cash), and
// cash-in-drawer (cid) as the third argument.
//
// The checkCashRegister() function should always return an object with a status
// key and a change key.

"use strict";

function checkCashRegister(price, cash, cid) {
    const units = [{name: "ONE HUNDRED", value: 100.00},
                 {name: "TWENTY", value: 20.00},
                 {name: "TEN", value: 10.00},
                 {name: "FIVE", value: 5.00},
                 {name: "ONE", value: 1.00},
                 {name: "QUARTER", value: 0.25},
                 {name: "DIME", value: 0.1},
                 {name: "NICKEL", value: 0.05},
                 {name: "PENNY", value: 0.01}];

    let changes = cash - price;

    //check totoal amount in the cash register
    const total = cid.reduce((total, item) => (total + item[1])*100/100, 0.00);

    if (changes > total) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    if (changes === total) {
        return {status: "CLOSED", change: cid};
    }

    // return an array of potential change denoms required for the change.
    // e.g. if change < $1.0, the potential change denons would be
    // quarter, dime, nickel and penny
    let potentialChanges = units.filter(unit => (changes >= unit.value));

    let changeNotes = [];
    for (let unit of potentialChanges) {
        for (let i=0; i<cid.length; i++) {
            let deductedAmount = 0.00;
            if (cid[i][0] === unit.name) {
                // if there is no sufficient money for the denom to handle the changes
                if (changes > cid[i][1]) {
                    deductedAmount = cid[i][1];
                    changes = changes - deductedAmount;
                    cid[i][1] = 0;
                    changeNotes.push([cid[i][0], deductedAmount]);
                }
                // there is sufficient money for the denom in the register
                else {
                    deductedAmount = Math.floor(changes/unit.value)*unit.value;
                    changes = Math.round((changes - deductedAmount)*100)/100;
                    cid[i][1] = cid[i][1] - deductedAmount;
                    changeNotes.push([cid[i][0], deductedAmount]);
                }
            }
        }
    }
    if (changes != 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status: "OPEN", change: changeNotes.filter((change) => (change[1]!=0))};
}


checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// result = {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// result = {status: "OPEN", change: change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
// result = {status: "INSUFFICIENT_FUNDS", change: []}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
// result = {status: "OPEN", change: [["QUARTER", 0.5]]}
