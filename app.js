/**
 * @param {import('probot').Probot} app
 */
 module.exports = (app) => {
  app.on("issues.opened", async (context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    return context.octokit.issues.createComment(
      context.issue({ body: "Hello, World!" })
    );
  });
};