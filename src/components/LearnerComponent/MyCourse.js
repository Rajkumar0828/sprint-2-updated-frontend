import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '..//..//Styles/Course.css';
import SearchBar from './Searchbar';
import { fetchCourses } from '../../middleware/MyCourseApi';
import { enrollRequest } from '../../actions/EnrollAction'; // replace './actions' with the actual path to your actions file
 
const CourseComponent = ({ enrolledCourses, loading, error, dispatch, search, setSearch }) => {
    const [data, setData] = useState(null);
    // const [search, setSearch] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courses, setCourses] = useState([]);
 
    useEffect(() => {
        setFilteredCourses(
            courses.filter(course =>
                course.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, courses]);
 
  
 
        // Check enrollment limit
     
 
        // Check if already enrolled

 
 
 
    useEffect(() => {
        fetchCourses().then((courses) => {
            setCourses(courses);
        });
    }, []); // Empty dependency array
 
  
 
 
 
    if (loading) {
        return <div>Loading...</div>;
    }
 
 
    if(filteredCourses.length === 0)
    {
        return<div><h3>No results found.</h3></div>
    }
 
 
 
    return (
 
        <div>
            <div className="container-fluid Servicemain">
                <div className="text-center">
                    {/* Your other components or content */}
                </div>
                <div className="row">
                    {filteredCourses.map((course, index) => (
                        <div className="col-sm-4" key={index}>
                            <div className="panel panel-default text-center">
                                <div className="panel-heading">
                                <img src={course.thumbnailimage} style={{width:100}} alt={course.title} />
                                   
                                </div>
                                <div className="panel-body">
                                <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    {/* <h4>{course.level}</h4> */}
                                   
                                </div>
                                <div className="panel-footer">
                                    <p>Advanced Level</p>
                                    <h5>{course.duration} months</h5>
                                    <button
                                        className="btn btn-lg"
                                        onClick={() => enrollCourse(course.courseId)} // Use the enrollCourse function here
                                    >
                                        Enroll
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div></div>
    );
};
 
const mapStateToProps = (state) => ({
    enrolledCourses: state.enrolledCourses,
    loading: state.loading,
    error: state.error,
});
 
export default connect(mapStateToProps)(CourseComponent);