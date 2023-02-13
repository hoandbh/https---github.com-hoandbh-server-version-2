const courseDal = require("../dal/courseDal");

class CourseController {

    getAllCourses = async (req, res) => {
        const courses = await courseDal.getAllCourses();
        if (!courses?.length)//איך יכול להיות null??
            return res.status(400).json({ message: 'No messages found' })
        res.json(courses);
    }
    
    createNewCourse = async (req, res) => {
        const content = req.body;//חייבים לעשות וליציה
        const course = courseDal.createNewCourse(content);
        if (course)//how can be null????
            res.status(201).json({ message: 'New course created' });
        else
            res.status(400);
    }

    getCourseById =  async (req, res) => {
        const id = req.params.id;
        var course = await courseDal.getCourseById(id);
        if(course)
            res.json(course);
        else
            res.status(204).send();//!!!!
    }

}

const courseController = new CourseController();

module.exports = courseController;