'use strict';
let wallet = {};

function get(){
    return wallet;
}

function save(wa)
{
    for(let val in wa){
        wallet[val] = wa[val];
    }
}

function reset(){
    wallet = {};

}
module.exports = {
    get,
    save,
    reset
};
