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
      </p>
     </section>
  <section>
    <h2> Update the code of your function </h2>
    <p>
      Every time a pushed is done, the action automatically runs the "deploy.yml". In this way your Function will always be updated. 
    </p>
  </section>
  </main>
</body>
