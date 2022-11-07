# tic_excercise

## Installation
App generated with .NET Core react template.  

* Clone repo.  
* Navigate to the 'savings-calculator' folder and running 'dotnet build' command.  
* Upon successful build, run 'dotnet run watch' command.  
* React app should spin up on https port 5001.  

## Note
'Environment.cs' is git-ignored so API keys are not saved in source code. Will provide file separetely.

## Assumptions / Clarifications
No refresh token is issued by token endpoint, so assuming that each api call needs to retrieve a new token?
Can save token client side, but with no refresh token would need to:

* Keep track of time delta client side, exclude auth header after 3600 seconds and retrieve new token *or* 
* Let Server hit API endpoint and get an unauthorised error, then handle this error, retrive new token, then resend request

Not ideal. Based on testing, speed overhead for grabbing token is about a second. Probably not worth implementing either of the aboveoptions in alloted time.
