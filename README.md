# ghapp-deployer-aws
<h1>
Deployer of Probot app on AWS Lambda using AWS Sam
</h1>
<body>
  <main>
    <section>
      <h2> How does it work? </h2>
      <p>
         This repository uses a template.yml for the creation of the Lambda. Every env variables is set during the deploy of the Lambda. This Function has already configured the API-Trigger, so in order to attach the Function to your app just copy the API-Endpoint inside your webhook URL. 
         It requires APP_ID, PRIVATE_KEY and WEBHOOK_SECRET crypted inside the environment, crypted with KMS. This function
         automatically decrypt this variables and the create the probot in order to handle the event.
      </p>
      <h2> Deploy locally  </h2>
      </section>

        Build the function:

        '''
          sam build
        '''

        Deploy the function:
        
        '''
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
        '''

        Delete the stack:

        '''
          sam delete --stack-name NAME-OF-THE-STACK --no-prompts --region REGION-OF-THE-FUNCTION
        '''
  <section>
    <h2> Update the code of your function </h2>
    <p>
      Every time a pushed is done, the action automatically runs the "deploy.yml". In this way your Function will always be updated. 
    </p>
  </section>
  </main>
</body>
