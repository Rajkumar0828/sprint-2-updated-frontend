import React, { useEffect } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
// import '../Styles/Admincourse.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { connect } from 'react-redux';
import { fetchCoursesRequest } from '../actions/MyCourseAction';
// import Navigationbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Navbar1 from '../components/LearnerComponent/Navbar1';
import '../Styles/Mycourse.css'

const Admincourse = ({ fetchCourses, courses }) => {
 
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);
 
 
 
 
    if (courses.length === 0) {
        return <div>Loading courses...</div>;
    }
   
    return (
        <>
 
            <Container fluid className='coursepagebody'>
                <Row className='mb-5'>
                    <Col xs={12}>
                      <Navbar1/>
                    </Col>
                </Row>
                <Row className='pt-3 contentbody'>
                    {/* <Col xs={12} md={1} className='sidebar  mb-5'>
 
                    </Col> */}
                    <Col xs={12} md={12} className='landingcoursepage  mb-5'>
                        <Row>
                            {/* <Col><b><h4>Recently Added Courses</h4></b></Col>
                            <Col className='text-end  mt-2'><Link to='/adminviewallcourse'><Button variant="outline-primary">View All courses</Button></Link></Col> */}
                        </Row>
                        <div className='scrollable'>
                            {courses.map((course) => (
                                // <Card key={index} sx={{ maxWidth: 250, maxHeight: 250, mb:5,borderRadius:1}}>
 
                                <Card key={course.courseId} sx={{maxWidth: 250, maxHeight: 300, mb:5,borderRadius:2,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            // width="80"
                                            image={course.thumbnailimage}
                                            alt={course.title || 'Course image'}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {course.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {course.category}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {course.description}
                                            </Typography>                              
                                        </CardContent>
                                    </CardActionArea>
                                    <Button>View course</Button>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
 
const mapStateToProps = (state) => ({
    courses: state.course.courses,
});
 
const mapDispatchToProps = (dispatch) => ({
    fetchCourses: () => dispatch(fetchCoursesRequest()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Admincourse);