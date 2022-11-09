# ghapp-deployer-aws
<h1>
Deployer of Probot app on AWS Lambda using AWS Sam
</h1>

-------------

<h2> How does it work? </h2>


This repository uses a template.yml for the creation of the Lambda. Every env variables is set during the deploy of the Lambda. This Function has already configured the API-Trigger, so in order to attach the Function to your app just copy the API-Endpoint inside your webhook URL.

It requires <strong>APP_ID</strong>, <strong>PRIVATE_KEY</strong> and <strong>WEBHOOK_SECRET</strong> crypted inside the environment, crypted with KMS. This function
automatically decrypt this variables and the create the probot in order to handle the event.

----------

<h2> Build and Deploy the function locally </h2>

Build the function:

```
  sam build
```

Deploy the function:

```
  sam deploy --stack-name NAME-OF-THE-STACK \
  --on-failure DELETE \
  --s3-bucket YOUR-S3-BUCKET \
  #?? OPTIONAL --tags map-migrated=d-server-01068mdjl5jze3 ?? \
  --no-confirm-changeset \
  --parameter-overrides 'awsRole="ROLE-FOR-THE-FUNCTION" \
  githubOwner="OWNER-OF-THE-REPO" \
  githubRepository="NAME-OF-THE-REPO" \
  githubWorkflowName="NAME-OF-THE-WORKFLOW" \
  githubBranch="NAME-OF-THE-BRANCH" \
  githubJobFilter="NAME-OF-THE-FILTER"'

```

Delete the stack:

```
  sam delete --stack-name NAME-OF-THE-STACK --no-prompts --region REGION-OF-THE-FUNCTION
```
-------

<h2> Update the code of your function </h2>

Every time a pushed is done, the action automatically runs the "deploy.yml". In this way your Function will always be updated. 