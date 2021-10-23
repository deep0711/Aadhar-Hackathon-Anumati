const express = require('express');
const Router = express.Router();

const pin_controller = require('../Controller/pin_control');
const consent_controller = require('../Controller/consent_control');
const address_controller = require('../Controller/address_control');
const token_controller = require('../Controller/token_control');

Router.post('/store-pin',pin_controller.storePin);
Router.post('/get-pin',pin_controller.getPin);

Router.post('/create-consent',consent_controller.createConsent);
Router.post('/update-consent',consent_controller.updateConsent);
Router.post('/get-consent-detail',consent_controller.getConsentDetails);

Router.post('/store-address',address_controller.storeAddress);
Router.post('/update-address',address_controller.updateAdress);
Router.post('/get-address',address_controller.getAdress);

Router.post('/fileupload',consent_controller.upload.array('file'), uploadFiles);

Router.post('/store-token',token_controller.storeToken);

function uploadFiles(req, res) {
    res.json(req.files[0].location + '?/\?' + req.files[0].originalname);
}

module.exports = Router;