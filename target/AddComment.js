// 'use strict';
//
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
//
// var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
//
// var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//
// function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//
// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//
// var _require = require('@octokit/graphql'),
//     graphql = _require.graphql;
//
// var _require2 = require('@actions/core'),
//     core = _require2.core;
//
// var AddComment = function () {
//   function AddComment() {
//     _classCallCheck(this, AddComment);
//   }
//
//   _createClass(AddComment, [{
//     key: 'getOwnerAndRepo',
//     value: function getOwnerAndRepo() {
//       if (process.env.GITHUB_REPOSITORY) {
//         var _process$env$GITHUB_R = process.env.GITHUB_REPOSITORY.split('/'),
//             _process$env$GITHUB_R2 = _slicedToArray(_process$env$GITHUB_R, 2),
//             owner = _process$env$GITHUB_R2[0],
//             repo = _process$env$GITHUB_R2[1];
//
//         return { 'owner': owner, 'repo': repo };
//       } else {
//         throw new Error('not able to obtain GITHUB_REPOSITORY from process.env');
//       }
//     }
//   }, {
//     key: 'getGraphqlWithAuth',
//     value: function getGraphqlWithAuth() {
//       var token = core.getInput('repo-token');
//       return graphql.defaults({
//         headers: {
//           authorization: 'token ' + token
//         }
//       });
//     }
//   }, {
//     key: 'addPullRequestCommentMutation',
//     value: function addPullRequestCommentMutation() {
//       return 'mutation AddPullRequestComment($subjectId: ID!, $body: String!) {\n  addComment(input:{subjectId:$subjectId, body: $body}) {\n    commentEdge {\n        node {\n        createdAt\n        body\n      }\n    }\n    subject {\n      id\n    }\n  }\n}';
//     }
//   }, {
//     key: 'getPullNumber',
//     value: function getPullNumber() {
//       if (process.env.GITHUB_REF) {
//         return parseInt(process.env.GITHUB_REF.split('/')[2]);
//       }
//     }
//   }, {
//     key: 'getGraphqlWithAuth',
//     value: function getGraphqlWithAuth() {
//       var token = core.getInput('repo-token');
//       return graphql.defaults({
//         headers: {
//           authorization: 'token ' + token
//         }
//       });
//     }
//   }, {
//     key: 'findPullRequestQuery',
//     value: function findPullRequestQuery() {
//       return 'query FindPullRequestID ($owner: String!, $repo: String!, $pullNumber: Int!){\n  repository(owner:$owner, name:$repo) {\n    pullRequest(number:$pullNumber) {\n      id\n    }\n  }\n}';
//     }
//   }, {
//     key: 'addCommentUsingSubjectId',
//     value: function addCommentUsingSubjectId(pullRequestId, comment) {
//       var obj = JSON.parse(JSON.stringify(pullRequestId));
//       var graphqlWithAuth = this.getGraphqlWithAuth();
//       graphqlWithAuth(this.addPullRequestCommentMutation(), {
//         subjectId: obj.repository.pullRequest.id,
//         body: comment
//
//       });
//     }
//   }, {
//     key: 'addComment',
//     value: function () {
//       var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(comment) {
//         var nameAndRepo, graphqlWithAuth, findPullRequestIdQuery, subjectId;
//         return regeneratorRuntime.wrap(function _callee$(_context) {
//           while (1) {
//             switch (_context.prev = _context.next) {
//               case 0:
//                 nameAndRepo = this.getOwnerAndRepo();
//                 graphqlWithAuth = this.getGraphqlWithAuth();
//                 findPullRequestIdQuery = this.findPullRequestQuery();
//                 _context.prev = 3;
//                 _context.next = 6;
//                 return this.getSubjectId(graphqlWithAuth, findPullRequestIdQuery, nameAndRepo);
//
//               case 6:
//                 subjectId = _context.sent;
//                 _context.next = 9;
//                 return this.addCommentUsingSubjectId(subjectId, comment);
//
//               case 9:
//                 _context.next = 13;
//                 break;
//
//               case 11:
//                 _context.prev = 11;
//                 _context.t0 = _context['catch'](3);
//
//               case 13:
//               case 'end':
//                 return _context.stop();
//             }
//           }
//         }, _callee, this, [[3, 11]]);
//       }));
//
//       function addComment(_x) {
//         return _ref.apply(this, arguments);
//       }
//
//       return addComment;
//     }()
//   }, {
//     key: 'getSubjectId',
//     value: function getSubjectId(graphqlWithAuth, findPullRequestIdQuery, nameAndRepo) {
//       graphqlWithAuth(findPullRequestIdQuery, {
//         owner: nameAndRepo.owner,
//         repo: nameAndRepo.repo,
//         pullNumber: this.getPullNumber()
//       });
//     }
//   }]);
//
//   return AddComment;
// }();
//
// exports.default = AddComment;

const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}