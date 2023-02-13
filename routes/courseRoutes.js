const express = require('express');
const courseRoutes = express.Router();
const courseController = require('../controllers/courseController');

courseRoutes.route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createNewCourse);

courseRoutes.route('/:id')
    .get(courseController.getCourseById);

module.exports = courseRoutes;