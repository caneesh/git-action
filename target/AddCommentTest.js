"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _AddComment = _interopRequireDefault(require("./AddComment.js"));

describe("Add comment tests", function () {
  beforeEach(function () {
    process.env.GITHUB_REPOSITORY = 'someactionowner/actionname';
  });
  describe("getOwnerAndRepo", function () {
    it("should return Owner And Repo", function () {
      var value = new _AddComment["default"]().getOwnerAndRepo();
      var obj = JSON.parse(JSON.stringify(value));
      expect(obj.owner).toBe("someactionowner");
    });
  });
  describe("addComment", function () {
    it("should return Owner And Repo", function () {
      var value = new _AddComment["default"]().getOwnerAndRepo();
      var obj = JSON.parse(JSON.stringify(value));
      expect(obj.owner).toBe("someactionowner");
    });
  });
});