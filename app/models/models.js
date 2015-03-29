mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminModel = new Schema({
    name: String,
    students: [{type: Schema.Types.ObjectId, ref:'Student'}],
    teachers: [{type: Schema.Types.ObjectId, ref:'Teacher'}]
});

var teacherModel = new Schema({
    name: String,
    students: [{type: Schema.Types.ObjectId, ref:'Student'}],
    admin: {type: Schema.Types.ObjectId, ref:'Admin'}
});

var studentModel = new Schema({
    name: String,
    teachers: [{type: Schema.Types.ObjectId, ref:'Teacher'}],
    admin: {type: Schema.Types.ObjectId, ref:'Admin'}
});

var userModel = new Schema({
    username: String,
    password: String,
    category: String,
    admin: {type: Schema.Types.ObjectId, ref:'Admin'},
    teacher: {type: Schema.Types.ObjectId, ref:'Teacher'},
    student: {type: Schema.Types.ObjectId, ref:'Student'},
    todos: [{type: Schema.Types.ObjectId, ref:'Student'}]
})

var groupModel = new Schema({
    teachers: [{type: Schema.Types.ObjectId, ref:'Teacher'}],
    students: [{type: Schema.Types.ObjectId, ref:'Student'}]
})

var classModel = new Schema({
    teachers: [{type: Schema.Types.ObjectId, ref:'Teacher'}],
    students: [{type: Schema.Types.ObjectId, ref:'Student'}]
})

var todoModel = new Schema({
    name: String,
    text: String
})

var bcrypt = require('bcrypt-nodejs');


// encrypt password
userModel.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
userModel.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var admin = mongoose.model('Admin', adminModel);
var teacher = mongoose.model('Teacher', teacherModel);
var student = mongoose.model('Student', studentModel);
var user = mongoose.model('User', userModel);
var group = mongoose.model('Group', groupModel);
var classs = mongoose.model('Class', classModel);
var todo = mongoose.model('Todo', todoModel);

module.exports = {
    admin: admin,
    teacher: teacher,
    student: student,
    user: user,
    clss: classs,
    group: group,
    todo: todo
};