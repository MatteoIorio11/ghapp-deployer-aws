/**
 * @param {import('probot').Probot} app
 */
 const owner = process.env.OWNER; 
 const repo = process.env.REPO;
 const runners_workflow = process.env.WORKFLOW_FILE_NAME;
 const ref = process.env.BRANCH;
 const jobFilter = process.env.JOB_FILTER;
 
 module.exports = (app) => {
   app.on("workflow_job", async (context) => {
     if(context.payload.workflow_job.name !== null && context.payload.workflow_job.name.includes(jobFilter)){
       console.log(`Received event from job: ${context.payload.workflow_job.id}. Action: ${context.payload.action}. Name: ${context.payload.workflow_job.name}`);
       var action = context.payload.action === 'completed' ? context.payload.action : (context.payload.action === 'queued' ? "requested": null);
       
       if(action !== null){
         let job_name = context.payload.workflow_job.name;
         var label = context.payload.workflow_job.labels.join(',');
 
         console.log(`Triggering Workflow Dispatch for job: ${context.payload.workflow_job.id}. Action: ${action}. Name: ${context.payload.workflow_job.name}. Run id: ${context.payload.workflow_job.run_id.toString()}. Run attempt: ${context.payload.workflow_job.run_attempt.toString()}. Labels: ${label}`);
         if(action === 'completed'){
           console.log(`Job was running on: runner-id ${context.payload.workflow_job.runner_id}, runner-name: ${context.payload.workflow_job.runner_name}`);
         }
 
         context.octokit.actions.createWorkflowDispatch({
           owner: owner,
           repo: repo,
           workflow_id: runners_workflow,
           ref: ref,
           inputs: {
             action: action,
             run_id: context.payload.workflow_job.run_id.toString(),
             run_attempt: context.payload.workflow_job.run_attempt.toString(),
             job_id: context.payload.workflow_job.id.toString(),
             label: label
           }
         }); 
       }
     }
   });
 };