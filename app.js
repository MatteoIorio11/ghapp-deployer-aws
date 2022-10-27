/**
 * @param {import('probot').Probot} app
 */
 const jobFilter = process.env.JOB_FILTER;
 module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  app.on("issues.opened", async (context) => {
    return context.octokit.issues.createComment(
      context.issue({ body: "Always " + jobFilter + "!!!!" })
    );
  });
};