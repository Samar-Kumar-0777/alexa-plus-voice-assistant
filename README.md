# Alexa+ AI Voice Assistant

An advanced, generative AI-powered voice assistant created for the **Build, Ship, Shape: Amazon Developer Hackathon**.

## Overview
Alexa+ enhances standard voice interaction by leveraging AWS Lambda backend execution and generative AI capabilities to provide intelligent responses, daily task summaries, and hands-free productivity assistance.

## Features
- **Generative AI Responses:** Handles complex user inquiries through direct AI integration.
- **Productivity Summaries:** Quick voice commands for daily schedules and routine planning.
- **Robust Event Handling:** Modular Alexa Skills Kit (ASK SDK v2) request and error handling.

## Tech Stack
- **Voice Platform:** Alexa Skills Kit (ASK SDK v2)
- **Backend:** Node.js, AWS Lambda
- **HTTP Client:** Axios
- **Schema:** Custom Interaction Model JSON

## Project Files
- `index.js`: Core AWS Lambda request handlers and AI service integration.
- `package.json`: Dependency manifests (`ask-sdk-core`, `axios`).
- `interaction_model.json`: Custom interaction model, intents, slots, and sample utterances.

## How to Deploy
1. **Interaction Model:** Copy `interaction_model.json` into the JSON Editor in the Alexa Developer Console and click **Build Model**.
2. **Lambda Backend:** Copy `index.js` and `package.json` into the Code tab of the Alexa Developer Console and click **Deploy**.
3. **Testing:** Enable skill testing in the **Test** tab and test using the phrase `"open alexa plus"`.
4.
