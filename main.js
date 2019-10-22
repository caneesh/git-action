const _AddComment = require('./target/AddComment.js');


var _AddComment2 = _interopRequireDefault(_AddComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function run() {
  var value = new _AddComment2.default().addComment('Comment');

}

run().catch(err => console.log(err));