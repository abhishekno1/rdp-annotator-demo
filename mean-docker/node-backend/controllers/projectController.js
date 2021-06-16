const projectModel = require('../models/projectModel');

const projectController = {
    getImages: function(req, res) {
        projectModel.getImages(req, res).then((result) => {
            res.send(result)
        })
    },

    getImage: function(req, res) {
        projectModel.getImage(req, res).then((result) => {
            res.send(result)
        })
    },

    saveImage: function(req, res) {
        projectModel.saveImage(req, res).then((result) => {
            res.send(result)
        })
    },

    checkUser: function(req, res) {
        projectModel.checkUser(req, res).then((result) => {
            res.send(result)
        })
    },

    checkSession: function(req, res) {
        projectModel.checkSession(req, res).then((result) => {
            res.send(result)
        })
    }
}

module.exports = projectController