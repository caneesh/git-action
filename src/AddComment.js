const {graphql} = require('@octokit/graphql');
const {core} = require('@actions/core');


class AddComment {

  getOwnerAndRepo() {
    if (process.env.GITHUB_REPOSITORY) {
      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
      return {'owner': owner, 'repo': repo};

    } else {
      throw new Error('not able to obtain GITHUB_REPOSITORY from process.env');
    }

  }

  getGraphqlWithAuth() {
    const token = core.getInput('repo-token');
    return graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }

  addPullRequestCommentMutation() {
    return `mutation AddPullRequestComment($subjectId: ID!, $body: String!) {
  addComment(input:{subjectId:$subjectId, body: $body}) {
    commentEdge {
        node {
        createdAt
        body
      }
    }
    subject {
      id
    }
  }
}`;
  }


  getPullNumber() {
    if (process.env.GITHUB_REF) {
      return parseInt(process.env.GITHUB_REF.split('/')[2]);
    }

  }

  getGraphqlWithAuth() {
    const token = core.getInput('repo-token');
    return graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }

  findPullRequestQuery() {
    return `query FindPullRequestID ($owner: String!, $repo: String!, $pullNumber: Int!){
  repository(owner:$owner, name:$repo) {
    pullRequest(number:$pullNumber) {
      id
    }
  }
}`;
  }

  addCommentUsingSubjectId(pullRequestId, comment) {
    let obj = JSON.parse(JSON.stringify(pullRequestId));
    const graphqlWithAuth = this.getGraphqlWithAuth();
    graphqlWithAuth(this.addPullRequestCommentMutation(), {
        subjectId: obj.repository.pullRequest.id,
        body: comment,

      },
    );

  }


  addComment(comment) {
    const nameAndRepo = this.getOwnerAndRepo();
    const graphqlWithAuth = this.getGraphqlWithAuth(token);
    const findPullRequestIdQuery = this.findPullRequestQuery();
    graphqlWithAuth(findPullRequestIdQuery, {
        owner: nameAndRepo.owner,
        repo: nameAndRepo.repo,
        pullNumber: this.getPullNumber()
      }
    ).catch(err => {
      throw new Error(`not able to obtain pull request Id for the pull number ${this.getPullNumber()} , ${err}`);
    }).then(pullRequestId => this.addCommentUsingSubjectId(pullRequestId, comment)).finally(
      () =>{});
  }
}




export default AddComment;

