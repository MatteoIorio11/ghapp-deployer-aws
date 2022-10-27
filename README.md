# ghapp-deployer-aws
<h1>
Deployer of Probot app on AWS Lambda using AWS CLI 
</h1>
<body>
  <main>
    <section>
      <h2> How does it work? </h2>
      <p>
         This repository uses 3 different actions : 
      </p>
      <ul>
        <li> main.yml = for the creation of the Function's role </li>
        <li> create.yml = for the creation of the Function </li>
        <li> update.yml = for the update of the Function's code </li>
      </ul>
      <p>
        Every time that a pushed is done in to the repository, the "update.yml" action starts. If the function does not exists, this action will fail and automatically will starts the "main.yml" and then the "create.yml". If the function exists, the "update.yml" will not fails, the "main.yml" and "create.yml" will start but in this actions there is a check for the "update.yml", if it does not fail it means that the function exists and this 2 workflows will automatically fail by this check.
      </p>
    </section>
    <section>
      <h2> Create the AWS Function </h2>
        <p>
          In order to use this repository you <strong> must </strong> set this secrets :
        </p>
        <dl>
          <dt> Information for the authentication </dt>
          <dd> <strong> AWS_ACCESS_KEY_ID </strong> : you can find this information inside the IAM Configuration </dd>
          <dd> <strong> AWS_SECRET_ACCESS_KEY </strong> : you can find this information inside the IAM Configuration </dd>
          <dd> <strong> AWS_REGION </strong> : region for the auth </dd>
          <dt> Function settings </dt>
          <dd> <strong> AWS_FUNCTION_ROLE </strong> : this will be the name of the role </dd>
          <dd> <strong> LAMBDA_FUNCTION </strong> : this will be the name of your future function </dd>
          <dt> Values for the environmental variables </dt>
          <dd> <strong> AWS_GHAPP_ID </strong> : the github app id </dd>
          <dd> <strong> AWS_GHAPP_WEBHOOK_SECRET </strong> : the webhook secret </dd>
          <dd> <strong> AWS_GHAPP_PRIVATE_KEY </strong> : the private key of your application </dd>
          <dt> Configuration of the TRIGGER </dt>
          <dd> <strong> AWS_API_NAME </strong> : this will be the name of your http-api that will be used for the creation of the trigger </dd>
        </dl>
      <h3>Create the trigger</h3>
      <p>
          Once the create.yml execute all the jobs, the function will be created. The last step is to create a new 'Trigger'. 
      </p>
      <ol>
        <li> Log-in AWS </li>
        <li> Click on the search bar and type : Function. [in the voice LAMBDA] (after that you will see all the functions) </li>
        <li> Click on the function that you have just created, the name will be the same of your secret : LAMBDA_FUNCTION </li>
        <li> Go in the section : Configuration </li> 
        <li> Click on 'Triggers' </li>
        <li> Click on 'add trigger' </li>
        <li> Select an API-GATEWAY, click on 'Use existing API' and type the name of the API that you used in the secret : AWS_API_NAME, then 
        'Deployment stage' click on '$default' and thent in 'Security' select 'Open'. Click on add </li> 
      </ol>
        <h3>Attach the API-Gateway in to the GH Application </h3>
        <p>
            Once the API-Gateway is created, you have to copy the 'API endpoint' and put it inside your GitHub application's webhook_url. <i> Now you Function is ready to go </i>. The handler of your Function is : handler.webhooks, if in the future you want to change this you have to go to the section : 'Code' and set the new 'Handler' by clicking on 'Edit'.  
        </p>
      </ol>
    </section>
  
  <section>
    <h2> Update the code of your function </h2>
    <p>
      Every time a pushed is done, the action automatically runs the "update.yml". In this way your Function will always be updated. 
    </p>
  </section>
  </main>
</body>
