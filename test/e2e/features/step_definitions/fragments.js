/*global element,by*/
var byString = function (object, fragmentName)
{
    'use strict';
    if (!fragmentName || !fragmentName.replace) {
        return null;
    }
    fragmentName = fragmentName.replace(/\[(\w+)\]/g, '($1)');
    fragmentName = fragmentName.replace(/^\./, '');
    var a = fragmentName.split('.');
    while (a.length) {
        var n = a.shift();
        var arrayExpr = n.match(/(\w+)\(([^)]*)\)/);
        if (arrayExpr) {
            object = object[arrayExpr[1]](arrayExpr[2]);
        } else if (n in object) {
            object = object[n];
        } else {
            throw new Error('Undefined fragment "' + n + '" in "' + fragmentName + '"');
        }
    }
    return object;
};

var fragments = function (text)
{
    'use strict';

    var mapping = {
        contacts: {
            saveButton: element.bind(null, by.css('#saveButton')),
            editButton: element.bind(null, by.css('#editButton')),
            deleteButton: element.bind(null, by.css('#deleteButton')),
            table: element.bind(null, by.css('#contactsTable')),
            tName: element.bind(null, by.css('td[data-name="tName"]')),
            tEmail: element.bind(null, by.css('td[data-name="tEmail"]')),
            tPhone: element.bind(null, by.css('td[data-name="tPhone"]'))
        },

        startModal: {
            mInput: element.bind(null, by.css('#startModalInput')),
            mOk: element.bind(null, by.css('#startOk')),
            mHide: element.bind(null, by.css('#mStartHide'))
        },

        main: {
            walCurrency: element.bind(null, by.css('#walCurrency')),
            walletShow: element.bind(null, by.css('#walletShow')),
            cKey: element.bind(null, by.css('span[data-name="cKey"]')),
            tRates: element.bind(null, by.css('#tRates')),
            tBuy: element.bind(null, by.css('a[data-name="tRatesBuy"]')),
            tSell: element.bind(null, by.css('a[data-name="tRatesSell"]')),
            reset: element.bind(null, by.css('#resetButton')),
            random: element.bind(null, by.css('#random'))
        },

        buy: {
            currencyValue: element.bind(null, by.css('#currencyValue')),
            buyButton: element.bind(null, by.css('#buyButton')),
            errorDiv: element.bind(null,by.css('#errorDiv')),
            wCurrency: element.bind(null, by.css('#wCurrency')),
            wPln: element.bind(null,by.css('#wCurrency')),
            backButton: element.bind(null, by.css('#backButton'))
        },
        sell: {
            currencyValue: element.bind(null, by.css('#currencyValue')),
            sellButton: element.bind(null, by.css('#sellButton')),
            errorDiv: element.bind(null,by.css('#errorDiv')),
            wCurrency: element.bind(null, by.css('#wCurrency')),
            wPln: element.bind(null,by.css('#wCurrency')),
            backButton: element.bind(null, by.css('#backButton'))
        },

        confirmModal: {
            ok: element.bind(null,by.css('#confirmOk'))
        }

    };


    return byString(mapping, text);
};

module.exports = fragments;


