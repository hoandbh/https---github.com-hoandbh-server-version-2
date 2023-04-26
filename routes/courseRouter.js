const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');

courseRouter.route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createNewCourse);

courseRouter.route('/:id')
    .get(courseController.getCourseById)
    .delete(courseController.deleteCourse);

module.exports = courseRouter;