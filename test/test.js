document.addEventListener("DOMContentLoaded", function () {

    // Helper function to run tests inside an iframe
    function runTestsOnIframe(iframeSrc, tests) {
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.style.display = 'none';  // Hide iframe
        document.body.appendChild(iframe);

        iframe.onload = function () {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            QUnit.module(`Tests for ${iframeSrc}`, function () {
                tests(iframeDoc);  // Run the tests for the iframe's document
            });
        };
    }

    // Test for index.html
    runTestsOnIframe('../index.html', function (iframeDoc) {
        QUnit.test("Check if navigation bar exists", function (assert) {
            const nav = iframeDoc.querySelector("nav");
            assert.ok(nav, "Navigation bar should be present.");
        });

        QUnit.test("Verify main heading text", function (assert) {
            const heading = iframeDoc.querySelector("h1");
            assert.equal(heading.textContent, "Welcome to Cooking with Chloe.", "Main heading text should match.");
        });

        QUnit.test("Recipe section contains at least one article", function (assert) {
            const recipes = iframeDoc.querySelectorAll(".recipes article");
            assert.ok(recipes.length > 0, "There should be at least one recipe in the section.");
        });
    });

    // Test for grocery.html
    runTestsOnIframe('../grocery.html', function (iframeDoc) {
        QUnit.test("Check if grocery form exists", function (assert) {
            const form = iframeDoc.querySelector("#grocery-form");
            assert.ok(form, "Grocery list form should be present.");
        });

        QUnit.test("Check if 'Load Grocery List' button exists", function (assert) {
            const loadButton = iframeDoc.querySelector("#load-data");
            assert.ok(loadButton, "'Load Grocery List' button should be present.");
        });

        QUnit.test("Check if grocery table exists", function (assert) {
            const table = iframeDoc.querySelector("#grocery-table");
            assert.ok(table, "Grocery list table should be present.");
        });

        QUnit.test("Check if 'Add Item' button exists", function (assert) {
            const addButton = iframeDoc.querySelector("#add-item");
            assert.ok(addButton, "'Add Item' button should be present.");
        });


    });


});
