/**
 * @param {import('probot').Probot} app
 */
 const owner = process.env.OWNER; 
 const repo = process.env.REPO;
 const runners_workflow = process.env.WORKFLOW_FILE_NAME;
 const ref = process.env.BRANCH;
 const jobFilter = process.env.JOB_FILTER;
 const app = process.env.APP_ID
 
 module.exports = (app) => {
  app.on("issues.opened", async (context) => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World !}
    const params = context.issue({ body: "Hello World! " + app });

    // Post a comment on the issue
    return context.octokit.issues.createComment(params);
  });
};