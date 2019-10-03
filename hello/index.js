const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('repo-token');
    const requestEvent = core.getInput('event');
    const body = core.getInput('body');
    console.log(`token is ${token}`);
    console.log(`requestEvent is ${requestEvent}`);
    console.log(`requestEvent is ${body}`);
    // `who-to-greet` input defined in action metadata file
    const environment = core.getInput("env");
    console.log(environment);
    console.log(`Environment is ${environment}`);
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