# dummy-ghapp-deployer
Deployer of Probot app on aws lambda 

– AWS SETUP 
<ol> 
  <li>You have to create a lambda function on AWS.</li>
  <li> Create another IAM, set the credential to Access Key - Programmatic Access.
      <ul> PERMISSIONS :
      <li> Administrator Access </li>
      <li> AWSLambda_Ful Acces </li> </ul>
  </li>
⇒ store the keys for later, you will need them for the various secrets in the REPO 

  <li> You have to create a TRIGGER for the lambda function, the trigger has to be : API Gateway, when you are doing this set the  authorization at NONE. Once you have created the API Trigger, you will see a API ENDPOINT like this : API endpoint: https://ffhxge8j75.execute-api.us-east-1.amazonaws.com/default/dummy-function, copy this link and put it in the << Webhook URL >> of your app. </li> 
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

– REPO SETUP (you can see the mine, It is very easy, most of the file are useless because theory are from the AUTO-ME-BOT)
Use the release.yml (here is mine, I removed some useless things and changed what we zip )
Create all the necessary secrets : 
AWS_ACCESS_KEY_ID 
AWS_SECRET_ACCESS_KEY 
AWS_REGION 
LAMBDA_FUNCTION → the name of your function 
Also create a DEPLOY KEY ( I do not know if this is useful or not)
Create a app.js
Create a handler.js
Create a package.json for all the dependencies 
(You can copy the one inside auto-me-bot, maybe most of the packages are useless but I really do not care the most important things is that works ahahahahha)

---

–DEPLOY THE LAMBDA 
Go to “Actions”
Click on “Release”
Click on “Run Workflow” and you App will be deployed on AWS ^_^ 
