var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var db  = require('../models.server');

var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.updateWebsite = updateWebsite;

module.exports = WebsiteModel;


function findWebsiteById(id) {
  return WebsiteModel.findOne({_id: id});
}

function createWebsiteForUser(userId, website) {
  console.log("inside web of model");
  website.developerId = userId;
  return WebsiteModel.create(website)
    .then();
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({developerId: userId});
}

function deleteWebsite(id) {
  return WebsiteModel.remove({_id: id});
}

function updateWebsite(id, website) {
  console.log('inside update of web');
  return WebsiteModel.update({_id: id}, website);
}
