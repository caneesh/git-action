'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("@octokit/graphql"),
    graphql = _require.graphql;

var _require2 = require('@actions/core'),
    core = _require2.core;

var AddComment = function () {
    function AddComment() {
        _classCallCheck(this, AddComment);
    }

    _createClass(AddComment, [{
        key: 'getOwnerAndRepo',
        value: function getOwnerAndRepo() {
            if (process.env.GITHUB_REPOSITORY) {
                var _process$env$GITHUB_R = process.env.GITHUB_REPOSITORY.split('/'),
                    _process$env$GITHUB_R2 = _slicedToArray(_process$env$GITHUB_R, 2),
                    owner = _process$env$GITHUB_R2[0],
                    repo = _process$env$GITHUB_R2[1];

                return { "owner": owner, "repo": repo };
            } else {
                throw new Error('not able to obtain GITHUB_REPOSITORY from process.env');
            }
        }
    }, {
        key: 'getGraphqlWithAuth',
        value: function getGraphqlWithAuth() {
            var token = core.getInput('repo-token');
            return graphql.defaults({
                headers: {
                    authorization: 'token ' + token
                }
            });
        }
    }, {
        key: 'addPullRequestCommentMutation',
        value: function addPullRequestCommentMutation() {
            return 'mutation AddPullRequestComment($subjectId: ID!, $body: String!) {\n  addComment(input:{subjectId:$subjectId, body: $body}) {\n    commentEdge {\n        node {\n        createdAt\n        body\n      }\n    }\n    subject {\n      id\n    }\n  }\n}';
        }
    }, {
        key: 'getPullNumber',
        value: function getPullNumber() {
            if (process.env.GITHUB_REF) {
                return parseInt(process.env.GITHUB_REF.split('/')[2]);
            }
        }
    }, {
        key: 'getGraphqlWithAuth',
        value: function getGraphqlWithAuth() {
            var token = core.getInput('repo-token');
            return graphql.defaults({
                headers: {
                    authorization: 'token ' + token
                }
            });
        }
    }, {
        key: 'findPullRequestQuery',
        value: function findPullRequestQuery() {
            return 'query FindPullRequestID ($owner: String!, $repo: String!, $pullNumber: Int!){\n  repository(owner:$owner, name:$repo) {\n    pullRequest(number:$pullNumber) {\n      id\n    }\n  }\n}';
        }
    }, {
        key: 'addCommentUsingSubjectId',
        value: function addCommentUsingSubjectId(pullRequestId, comment) {
            var obj = JSON.parse(JSON.stringify(pullRequestId));
            var graphqlWithAuth = this.getGraphqlWithAuth();
            graphqlWithAuth(this.addPullRequestCommentMutation(), {
                subjectId: obj.repository.pullRequest.id,
                body: comment

            });
        }
    }, {
        key: 'addComment',
        value: function addComment(comment) {
            var _this = this;

            var nameAndRepo = this.getOwnerAndRepo();
            var graphqlWithAuth = this.getGraphqlWithAuth(token);
            var findPullRequestIdQuery = this.findPullRequestQuery();
            graphqlWithAuth(findPullRequestIdQuery, {
                owner: nameAndRepo.owner,
                repo: nameAndRepo.repo,
                pullNumber: this.getPullNumber()
            }).catch(function (err) {
                throw new Error('not able to obtain pull request Id for the pull number ' + _this.getPullNumber() + ' , ' + err);
            }).then(function (pullRequestId) {
                return _this.addCommentUsingSubjectId(pullRequestId, comment);
            }).finally(function () {});
        }
    }]);

    return AddComment;
}();

exports.default = AddComment;