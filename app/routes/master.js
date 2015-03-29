var express = require('express');

var router = express.Router();
var Admin = require('../models/models.js').admin;
var User = require('../models/models.js').user;
var Todo = require('../models/models.js').todo;
var Teacher = require('../models/models.js').teacher;

router.route('/admins')
    .get(function(req,res){
        Admin.find(function(err, admins) {
            if (err)
                res.send(err);
            res.json(admins);
        });
    })

    .post(function(req,res){
        var admin = new Admin();      
        admin.name = req.body.name;
        console.log('Recieved Admin: '+ admin.name);
        admin.save(function(err) {
            if (err)
                res.send(err);
            console.log('Saving admin ...');
            res.json({ message: 'Admin: '+admin.name+' created!' });
            console.log('Success!: Admin Saved\n');
        });
    })

    .delete(function(req,res){
        Admin.remove({name: req.body.name}, function(err){
            if(err)
                red.send(err);
            res.send("Admin: " + req.body.name +" successfully removed.");
        });
    });

router.route('/users')
    .get(function(req,res){
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })

router.route('/todos')
    .get(function(req,res){
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    })

    .post(function(req,res){
        var todo = new Todo();      
        todo.name = req.body.name;
        todo.text = req.body.text;
        todo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Admin: '+todo.name+' created!' });
        });
    })

router.route('/teachers')
    .get(function(req,res){
        Teacher.find(function(err, teachers) {
            if (err)
                res.send(err);
            res.json(teachers);
        });
    })

module.exports = router;