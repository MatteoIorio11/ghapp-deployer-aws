# dummy-ghapp-deployer
<h1>
Deployer of Probot app on AWS Lambda 
</h1>

<h2> – AWS SETUP </h2> 
<ol> 
  <li>You have to create a lambda function on AWS.</li>
  <li> Create another IAM, set the credential to Access Key - Programmatic Access.
      <ul> PERMISSIONS :
      <li> Administrator Access </li>
      <li> AWSLambda_Ful Acces </li> </ul>
  </li>
  
  
  <div id="key">
    ⇒ store the keys for later, you will need them for the various secrets in the REPO 
       </div>
  
  
  <li> You have to create a TRIGGER for the lambda function, the trigger has to be : API Gateway, when you are doing this set the  authorization at NONE. Once you have created the API Trigger, you will see a API ENDPOINT like this : API endpoint: https://ffhxge8j75.execute-api.us-east-1.amazonaws.com/default/{name-of-your-function}, copy this link and put it in the << Webhook URL >> of your app. </li> 
  <li> Create 3 environment variables for the function : 
  <ul>
    <li> APP_ID : the number of you app id </li>
      <li> PRIVATE:KEY : the private key of the github app </li>
      <li> WEBHOOK_SECRET : the secret of your webhook [OPTIONAL, you have to put this if you have a SECRET ] </ul></li>
  </li>
</ol>
<p>
After that, in the section CODE of your function, you will see a voice : Info Manager (index.handler or something like that I don’t remember), click on the button “Change/Modify” and set the Info manager as handler.webhooks
</p>

---

<h2> REPO SETUP </h2>
<ul>
  <li> Use the release.yml </li>
  <li><ul>Create all the necessary secrets : 
    <li> AWS_ACCESS_KEY_ID : <a href="#key" >VALUE GENERATED DURING THE CREATION OF THE NEW IAM </a>  </li>
    <li> AWS_SECRET_ACCESS_KEY <a href="#key" >VALUE GENERATED DURING THE CREATION OF THE NEW IAM </a>   </li>
    <li> AWS_REGION </li> 
    <li> LAMBDA_FUNCTION → the name of your function </li></ul>
  </li>
 <!-- <li> Also create a DEPLOY KEY </li>( I do not know if this is useful or not) -->
  <li>Create a app.js</li>
  <li>Create a handler.js</li>
  <li>Create a package.json for all the dependencies</li> 
  </ul>
  
  <!---
(You can copy the one inside auto-me-bot, maybe most of the packages are useless but I really do not care the most important things is that works ahahahahha)
-->


---

<h2>DEPLOY THE LAMBDA </h2>
<ol>
  <li>Go to “Actions”</li>
  <li>Click on “Release”</li>
  <li>Click on “Run Workflow” and you App will be deployed on AWS ^_^ </li>
  </ol>
  
