'use strict';

const Alexa = require('alexa-sdk');
const dynasty = require('dynasty')({});
const languageStrings = require('./languageStrings');
const addItem = require('./intentDelegates/addItem');

const APP_ID = "amzn1.ask.skill.8371afd6-d231-4b54-bf1d-5987733228cd";
const stewardItems = dynasty.table('Steward_Items');

const handlers = {

    'AddItem': function() { addItem.delegate(this, stewardItems) },

    'Affirmative': function() {
        const responses = this.t('AFFIRMATIVE_MESSAGE');
        const idx = Math.floor(Math.random() * responses.length);
        this.emit(':tell', responses[idx]);
    },

    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings.strings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
