import React from 'react';
import Header from './HeaderComponent';
import Content from './ContentComponent';

const Course = ({ courses }) => {
  return (
    <div>
      {
        courses.map(course => (
          <div key={course.name}>
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        ))
      }
    </div>
  )
};

export default Course;