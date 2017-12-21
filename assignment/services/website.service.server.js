module.exports = function (app) {
  var ApplicationModel = require('../model/website/website.model.server');

  app.get('/api/user/:userId/application', findAllApplicationsForUser);
  app.post('/api/user/:userId/application', createApplication);
  app.get('/api/application/:appId', findApplicationById);
  app.delete('/api/application/:appId', deleteApplication);
  app.put('/api/application/:appId', updateApplication);
  app.put('/api/application/:appId/page', addPageToApplication);

  function findAllApplicationsForUser(req, res) {
    var userId = req.params['userId'];
    ApplicationModel.findAllApplicationsForUser(userId)
      .then(function (websites) {
        res.json(websites);
      });
  }

  function createApplication(req, res) {
    console.log("inside web of website server");
    var application = req.body;
    ApplicationModel.createApplicationForUser(application.developerId, application)
      .then(function (website) {
        res.json(website);
      })
  }

  function deleteApplication(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.deleteApplication(appId)
      .then(function (status) {
        res.json(status);
      })
  }

  function updateApplication(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.updateApplication(appId, req.body)
      .then(function (status) {
        res.json(status);
      })
  }

  function findApplicationById(req, res) {
    var appId = req.params['appId'];
    ApplicationModel.findApplicationById(appId)
      .then(function (website) {
        res.json(website);
      })
  }

  function addPageToApplication(req, res) {
      var appId = req.params['appId'];
      var page = req.body;
      ApplicationModel.findApplicationById(appId)
          .then(function (application) {
            if(application['pages']){
                application['pages'] = page;
            }
            else{
              application['pages'] = page;
            }
            console.log(application);
              res.json(application);
          })
  }
}
