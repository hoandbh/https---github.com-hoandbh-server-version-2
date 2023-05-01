//V
const courseDal = require("../dal/courseDal");

class CourseController {

  getAllCourses = async (req, res) => {
    const courses = await courseDal.getAllCourses();
    if (!courses?.length)
      return res.status(204).json({ message: 'No courses found' })
    res.json(courses);
  }
  
  createNewCourse = async (req, res) => {
    const details = req.body;
    if(!details.name)
      return res.status(400).json({ message: 'Course Name is required' });
    const course = await courseDal.createNewCourse(details);
    if (course)
      return res.status(201).json(course);
    return res.status(400);
  }

  getCourseById =  async (req, res) => {
    const id = req.params.id;
    var course = await courseDal.getCourseById(id);
    if(course)
      res.json(course);
    else
      res.status(204).send();
  }

  deleteCourse = async (req, res) => {
    const id = req.params.id;
    //to check if corse exist
    await courseDal.deleteCourse(id);
    res.json(`Course ID ${id} deleted`);
  }

}

const courseController = new CourseController();
module.exports = courseController;

