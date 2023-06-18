//V
const courseDal = require("../dal/courseDal");

class CourseController {

  getAllCourses = async (req, res, next) => {
    try{
    const courses = await courseDal.getAllCourses();
    if (!courses?.length)
      return res.status(204).json({ message: 'No courses found' })
    res.json(courses);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 
  
  createNewCourse = async (req, res, next) => {
    try{
    const { name, code } = req.body;
    if(!name || !code)
      return res.status(400).json({ message: 'All field are require' });
    const course = await courseDal.createNewCourse({ name, code });
    if (course)
      return res.status(201).json(course);
    return res.status(400);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  getCourseById =  async (req, res, next) => {
    try{
    const id = req.params.id;
    var course = await courseDal.getCourseById(id);
    if(course?.length)
      res.json(course);
    else
      res.status(204).send();
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

  deleteCourse = async (req, res, next) => {
    try{
    const id = req.params.id;
    //to check if corse exist
    await courseDal.deleteCourse(id);
    res.json(`Course ID ${id} deleted`);
   } catch (error) {
      throw new Error(error);
      next(error);
    }
  } 

} 

module.exports = new CourseController(); 
