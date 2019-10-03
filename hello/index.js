const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');
const tools = new Toolkit()

try {
    const repo = github.context.repo;
    const requestEvent  = JSON.stringify(core.getInput('event'), undefined, 2);

    const  token = tools.token;
    const body  = JSON.stringify(core.getInput('body'), undefined, 2);
    const str = repo.repo.toString();
    const owner = repo.owner.toString();
    const eventName = github.context.eventName.toString();
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`repo as owner is ${owner}`);
    console.log(`repo as string is ${str}`);
    console.log(`repo as eventName is ${eventName}`);
    console.log(`Token is ${token}`)





    // `who-to-greet` input defined in action metadata file
    const environment = core.getInput("env");
    console.log(environment);
    console.log(`Environment is ${environment}`);
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow

    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}