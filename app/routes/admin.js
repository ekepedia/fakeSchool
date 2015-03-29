var express = require('express');

var router = express.Router();
var Admin = require('../models/models.js').admin;
var Teacher = require('../models/models.js').teacher;
var Student = require('../models/models.js').student;

//all admin operation must pass in admin id
//================TEACHER OPERATION==========================//
router.route('/teachers/:adminId')

    .get(function(req,res){
        Admin.findById(req.params.adminId).populate('teachers').exec(function(err,admin){
            res.send(admin.teachers);
        });
    })

    .post(function(req,res){
        Admin.findById(req.params.adminId).populate('teachers').exec(function(err,admin){
            var teacher = new Teacher();
            teacher.name = req.body.name;
            teacher.admin = admin;
            teacher.save(function(err){
                if (err)
                    res.send(err);
                console.log('Saving teacher ...');
                console.log(admin.teacher);
                admin.teachers.push(teacher);
                admin.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({ message: 'Teacher: '+teacher.name+' created!' });
                    console.log('Success!: Teacher Saved\n');
                });
                
            })
        });
    })

    .delete(function(req,res){

        Admin.findById(req.params.adminId).populate('teachers').exec(function(err,admin){

            Teacher.findById(req.body.id, function(err,teacher){

                Teacher.remove({id: req.body.name},function(err){

                    if(err)
                        red.send(err);

                    admin.teachers.splice(admin.teachers.indexOf(teacher),1);

                    admin.save(function(err){

                        if(err)
                            res.send(err);
                        res.send("Teacher: " + req.body.name +" successfully removed.");

                    });
                });
            });
        });

    });

//================STUDENT OPERATION==========================//
router.route('/students/:adminId')

    .get(function(req,res){
        Admin.findById(req.params.adminId).populate('students').exec(function(err,admin){
            res.send(admin.students);
        });
    })

    .post(function(req,res){
        Admin.findById(req.params.adminId).populate('students').exec(function(err,admin){
            var student = new Student();
            student.name = req.body.name;
            student.save(function(err){
                if (err)
                    res.send(err);
                console.log('Saving student ...');
                admin.students.push(student);
                admin.save(function(err){
                    if(err)
                        res.send(err);
                    res.json({ message: 'Student: '+student.name+' created!' });
                    console.log('Success!: Student Saved\n');
                });
            })
        });
    })

    .delete(function(req,res){

        Admin.findById(req.params.adminId).populate('students').exec(function(err,admin){

            Student.findById(req.body.id, function(err,student){

                Student.remove({id: req.body.name},function(err){

                    if(err)
                        red.send(err);

                    admin.students.splice(admin.students.indexOf(student),1);

                    admin.save(function(err){

                        if(err)
                            res.send(err);
                        res.send("Student: " + req.body.name +" successfully removed.");

                    });
                });
            });
        });

    });

module.exports = router;