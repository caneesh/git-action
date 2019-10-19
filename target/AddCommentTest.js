"use strict";

var _AddComment = require("../src/AddComment.js");

var _AddComment2 = _interopRequireDefault(_AddComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Add comment tests", function () {

    beforeEach(function () {
        process.env.GITHUB_REPOSITORY = 'someactionowner/actionname';
    });
    describe("getOwnerAndRepo", function () {

        it("should return Owner And Repo", function () {

            var value = new _AddComment2.default().getOwnerAndRepo();
            var obj = JSON.parse(JSON.stringify(value));
            expect(obj.owner).toBe("someactionowner");
        });
    });

    describe("addComment", function () {

        it("should return Owner And Repo", function () {

            var value = new _AddComment2.default().getOwnerAndRepo();
            var obj = JSON.parse(JSON.stringify(value));
            expect(obj.owner).toBe("someactionowner");
        });
    });
});