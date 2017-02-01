/*global require,protractor, by, browser*/
var q = require('q');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var Promise = require('bluebird');

chai.use(chaiAsPromised);
/*jshint -W079 */
var expect = chai.expect;
var fragments = require('./fragments.js');

module.exports = function ()
{
    'use strict';

    function clearAndType(webElement, text)
    {
        text = text.replace(/\\n/g, protractor.Key.ENTER);
        return webElement.getAttribute('type').then(function (type)
        {
            if ('date' !== type) {
                return webElement.clear().then(function ()
                {
                    return webElement.sendKeys(text);
                });
            } else {
                return webElement.sendKeys(text);
            }
        });
    }

    this.Then(/^pause$/, function ()
    {
        browser.pause(5860);
        return q.delay(500);
    });

    this.When(/^I wait "([^"]*)" seconds for/, function (seconds, callback)
    {
        setTimeout(function ()
        {
            callback();
        }, seconds * 1000);
    });


    this.When(/^I browse to the "([^"]*)"$/, function (url, callback)
    {
        return browser.get(url).then(function ()
        {
            return browser.sleep(3000).then(callback);
        });
    });


    this.When(/^I browse to the absolute "([^"]*)" url$/, function (url, callback)
    {
        browser.ignoreSynchronization = true;
        browser.get(url).then(callback);
        browser.ignoreSynchronization = false;
    });


    this.Then(/^the current URL should be "([^"]*)"$/, function (url, callback)
    {
        return browser.waitForAngular().then(function ()
        {
            return browser.getCurrentUrl().then(function (browserUrl)
            {
                var urlWithoutProtocol, indexOfFirstSlash;
                indexOfFirstSlash = (urlWithoutProtocol = browserUrl.split(browserUrl.split('//')[0] + '//')[1]).indexOf('/');
                expect(urlWithoutProtocol.substring(indexOfFirstSlash)).to.equal(url);
                callback();
            });
        });
    });

    this.Then(/^I should be directed to "([^"]*)"$/, function (url, callback)
    {
        expect(browser.getCurrentUrl()).to.eventually.match(new RegExp(url.replace('/', '\/').replace('?', '\\?') + '$')).and.notify(callback);
    });

    this.When(/^I enter "([^"]*)" into "([^"]*)" field$/, function (text, name, callback)
    {
        var webElement = fragments(name)();
        return clearAndType(webElement, text).then(callback);
    });

    this.When(/^I click "([^"]*)"$/, function (name, callback)
    {
        return browser.actions().mouseMove(fragments(name)()).perform().then(function ()
        {
            return fragments(name)().click().then(function ()
            {
                return browser.waitForAngular();
            }).then(function ()
            {
                callback();
            });
        });
    });

    this.Then(/^I click "(\d+)" element "([^"]*)" of "([^"]*)" parent$/, function (nth, innerElement, Element, callback)
    {
        nth = parseInt(nth, 10) - 1;

        fragments(Element)().all(fragments(innerElement)().locator()).get(nth).click().then(callback);
    });

    this.Then(/^I click "([^"]*)" in row "(\d+)" of "([^"]*)" table$/, function (element, row, table, callback)
    {
        row = parseInt(row, 10);
        var rowElement = fragments(table)().element(by.css('tbody tr:nth-of-type(' + row + ')'));
        table = table.split('.');
        table.pop();
        table.push(element);
        var columnElement = fragments(table.join('.'))();
        rowElement.element(columnElement.locator()).click().then(function ()
        {
            Promise.delay().then(callback);
        });
    });

    this.Then(/^I should see the "([^"]*)" element$/, function (name, callback)
    {
        expect(fragments(name)().getWebElement().isDisplayed()).to.eventually.be.true.and.notify(callback);
    });

    this.Then(/^I should not see the "([^"]*)" element$/, function (name, callback)
    {
        return fragments(name)().isPresent().then(function (result)
        {
            if (result) {
                expect(fragments(name)().isDisplayed()).to.eventually.be.false.and.notify(callback);
            } else {
                expect(q.when(result)).to.eventually.be.false.and.notify(callback);
            }
        });
    });

    this.Then(/^I should see "(.*)" in "([^"]*)"$/, function (expectedText, element, callback)
    {
        expect(fragments(element)().getText()).to.eventually.equal(expectedText).and.notify(callback);
    });

    this.Then(/^I should see \/(.*)\/ in "([^"]*)"$/, function (expectedText, element, callback)
    {
        expect(fragments(element)().getText()).to.eventually.match(new RegExp(expectedText)).and.notify(callback);
    });

    this.Then(/^I should see "(.*)" in "([^"]*)" column in row "(\d+)" of "([^"]*)" table$/, function (expectedText, columnName, row, table, callback)
    {
        row = parseInt(row, 10);
        var rowElement = fragments(table)().element(by.css('tbody tr:nth-of-type(' + row + ')'));
        table = table.split('.');
        table.pop();
        table.push(columnName);
        var columnElement = fragments(table.join('.'))();
        expect(rowElement.element(columnElement.locator()).getText()).to.eventually.equal(expectedText).and.notify(callback);
    });

};
