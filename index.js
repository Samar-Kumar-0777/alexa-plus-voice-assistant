const Alexa = require('ask-sdk-core');
const axios = require('axios');

// OpenAI API Key placeholder (can be configured in environment variables)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';

async function getAIResponse(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are Alexa+, an advanced, intelligent, and helpful AI voice assistant.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
        return 'I experienced a slight delay reaching my advanced AI servers, but I am online and ready to help you!';
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Alexa Plus! Powered by advanced generative AI. What would you like to ask or plan today?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('You can ask me any question or ask for a daily productivity summary.')
            .getResponse();
    }
};

const AskAIAgentIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskAIAgentIntent';
    },
    async handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const userQuery = (slots && slots.query && slots.query.value) ? slots.query.value : 'Give me a quick smart tip for today';
        
        const aiSpeech = await getAIResponse(userQuery);

        return handlerInput.responseBuilder
            .speak(aiSpeech)
            .reprompt('Is there anything else Alexa Plus can assist you with?')
            .getResponse();
    }
};

const QuickSummaryIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QuickSummaryIntent';
    },
    async handle(handlerInput) {
        const aiSummary = await getAIResponse('Summarize a productive day routine in 2 short sentences.');
        return handlerInput.responseBuilder
            .speak(`Here is your Alexa Plus smart briefing: ${aiSummary}`)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can ask Alexa Plus questions like: "Ask Alexa Plus to summarize my day" or ask any general knowledge query.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for using Alexa Plus. Have a great day!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, Alexa Plus ran into a processing error. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AskAIAgentIntentHandler,
        QuickSummaryIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
