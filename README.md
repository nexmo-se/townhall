# Townhall
Cannot wait to deploy the Townhall application? You can directly click below `Deploy to Heroku` button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

To deploy yourself, you can scroll down to Deployment section

## Introduction
The townhall application is a reference code where you can easily deploy. This features.

  - Multiple Presenter -- you can have multiple person presenting in the townhall
  - Multiple Participant -- participant will be on `mute` by default. Participant can only hear presenter and moderator
  - Single Moderator -- moderator has a full control of presenter and participant video and audio.

Before you deploy this application, make you have Vonage Video API account with API Key and Secret. Because we will explore how great Vonage Video API is.

## Environment Variables
You need to setup some environment variables 

  - `PORT` -- this variable works only for manual deployment. Heroku deployment will automatically fill the value.
  - `API_KEY` -- your Vonage Video API - API Key
  - `API_SECRET` -- your Vonage Video API - API Secret
  - `DATABASE_URL` -- this variable works only for manual deployment. Heroku deployment will automatically fill the value.
  - `REACT_APP_ROOM_NAME` -- your room name for your townhall
  - `REACT_APP_PRESENTER_PIN` -- pin number for presenter to join in
  - `REACT_APP_MODERATOR_PIN` -- pin number for moderator to join in
  - `REACT_APP_PARTICIPANT_PIN` -- pin number for participant to join in

## architecture
This townhall application contains `backend` and `frontend`. However, the `backend` needs a database to store session information. You need to install `postgres` for the database. Any other than `postgres` will not work.

  - Backend -- we use `express`
  - Frontend -- we use `ReactJS`
  - Database -- we use `postgres`


## Deployment
This section is for manual deployment. It means you need to have a 
  
  - Linux machine with `SSH`. Make sure you can `SSH` to your machine.
  - `NodeJS` installed
  - `yarn` or `npm` installed
  - `postgres` installed 

Once you satisfy the requirements, you can proceed to below steps.
  
  - Clone and navigate inside this repository.
  - Rename `.env.example` to `.env` and fill in the environment variable.
  - Build the package by typing `yarn build` if you are using `yarn` or `npm run build` if you are using `npm`
  - Start the server `yarn start:express:prod` or `npm run start:express:prod`
  - Open your web browser. For example `http://localhost:5000`

The local deployment has been done. You can use various technology such as `ngrok` or `nginx` to make it public. Furthermore, for this demo to run smoothly in public, you need `https` or `SSL`. 

`ngrok` will automatically grant you `SSL` certificate. However, if `nginx` was choose as public deployment, you can use `Let's Encrypt` to get your free `SSL` certificate.