var express = require('express');

var router = express.Router();
var Admin = require('../models/models.js').admin;
var Teacher = require('../models/models.js').teacher;
var Student = require('../models/models.js').student;

//all admin operation must pass in admin id
//================TEACHER OPERATION==========================//
router.route('/teachers/:stduentId')

    .get(function(req,res){
        Student.findById(req.params.stduentId).populate('teachers').exec(function(err,student){
            if(err)
                res.send(err);
            res.send(student.teachers);
        });
    });

//================STUDENT OPERATION==========================//
router.route('/admin/:stduentId')

    .get(function(req,res){
        Student.findById(req.params.stduentId).populate('admin').exec(function(err,student){
            res.send(student.admin);
        });
    });

module.exports = router;