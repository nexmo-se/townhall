# Townhall
Cannot wait to deploy the Townhall application? You can directly click below `Deploy to Heroku` button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Introduction
The townhall application is a reference code where you can easily deploy. This features.

  - Multiple Presenter -- you can have multiple person presenting in the townhall
  - Multiple Participant -- participant will be on `mute` by default. Participant can only hear presenter and moderator
  - Single Moderator -- moderator has a full control of presenter and participant video and audio.

Before you deploy this application, make you have Vonage Video API account with API Key and Secret. Because we will explore how great Vonage Video API is.

## Environment Variables
You need to setup some environment variables 

  - `API_KEY` -- your Vonage Video API - API Key
  - `API_SECRET` -- your Vonage Video API - API Secret
  - `REACT_APP_ROOM_NAME` -- your room name for your townhall
  - `REACT_APP_PRESENTER_PIN` -- pin number for presenter to join in
  - `REACT_APP_MODERATOR_PIN` -- pin number for moderator to join in
  - `REACT_APP_PARTICIPANT_PIN` -- pin number for participant to join in