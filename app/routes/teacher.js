var express = require('express');

var router = express.Router();
var Admin = require('../models/models.js').admin;
var Teacher = require('../models/models.js').teacher;
var Student = require('../models/models.js').student;

//all admin operation must pass in admin id
//================TEACHER OPERATION==========================//
router.route('/students/:teacherId')

    .get(function(req,res){
        Teacher.findById(req.params.teacherId).populate('students').exec(function(err,teacher){
            if(err)
                res.send(err);
            res.send(teacher.students);
        });
    });

//================STUDENT OPERATION==========================//
router.route('/admin/:teacherId')

    .get(function(req,res){
        Teacher.findById(req.params.teacherId).populate('admin').exec(function(err,teacher){
            res.send(teacher.admin);
        });
    });

module.exports = router;