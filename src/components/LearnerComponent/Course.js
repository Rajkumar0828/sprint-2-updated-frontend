import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '..//..//Styles/Course.css';
import { fetchCourses } from '../../middleware/CourseApi';
import { enrollRequest } from '../../actions/EnrollAction';

const CourseComponent = ({ enrolledCourses, loading, error, dispatch, search }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((coursesData) => {
      if (coursesData) {
        setCourses(coursesData);
      }
    });
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courses]);

  const enrollCourse = (courseId, learnerId) => {
    const maxCourses = 3;
    console.log(courseId);
    console.log(learnerId);
    const learnerCourses = enrolledCourses.filter(course => course.learnerId === learnerId);
    if (learnerCourses.length >= maxCourses) {
      alert('You have reached the course enrollment limit!');
      return;
    }
    const alreadyEnrolled = enrolledCourses.some(course => course.courseId === courseId && course.learnerId === learnerId);
    if (alreadyEnrolled) {
      alert('You have already enrolled in this course!');
      return;
    }
    dispatch(enrollRequest(courseId, learnerId));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
        alert('Enrollment successful!');

    }
}, [enrolledCourses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (filteredCourses.length === 0) {
    return <div><h3>No results found.</h3></div>;
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
            </div>
    </div>
    // <div className="container-fluid Servicemain">
    //   <div className="text-center">
    //     {/* Your other components or content */}
    //   </div>
    //   <div className="row">
    //     {filteredCourses.map((course, index) => (
    //       <div className="col-sm-4" key={index}>
    //         <div className="panel panel-default text-center">
    //           <div className="panel-heading">
    //             <img src={course.thumbnailimage} style={{ width: 100 }} alt={course.title} />
    //           </div>
    //           <div className="panel-body">
    //             <h3>{course.title}</h3>
    //             <p>{course.description}</p>
    //           </div>
    //           <div className="panel-footer">
    //             <p>Advanced Level</p>
    //             <h5>{course.duration} months</h5>
    //             <button
    //               className="btn btn-lg"
    //               onClick={() => enrollCourse(course.courseId, '')} // replace 'yourLearnerId' with actual learnerId
    //             >
    //               Enroll
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  enrolledCourses: state.enrolledCourses,
  loading: state.loading,
  error: state.error,
});

export default connect(mapStateToProps)(CourseComponent);