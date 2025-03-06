import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { courseCard as CourseCard } from "../components/courseCard";
import { DashboardCard } from "../components/dashboardCard";
const Dashboard = () => {
  const courses = useSelector((state) => state.student.enrolledCourses);

  return (
    <div>
      <Navbar />
      <div className="grid p-4">
        <h1 className="text-3xl font-semibold">
          Enrolled Courses - {courses.length}
        </h1>
          {courses.length > 0 && (
            <div  className="grid lg:grid-cols-3 gap-4 justify-left">
            {courses.map((item, index) => (
              <div className="sm:w-full overflow-hidden">
               <DashboardCard 
                key={index}
                  id={item.id}
                  name={item.name}
                  instructor={item.instructor}
                  thumbnail={item.thumbnail}
                  description={item.description}
                  duration={item.duration}
                  progress={item.progress}
                  likes={item.likes}
                  location={item.location}
                />
                </div>
              ))}
              </div>
          )}
      </div>  
    </div>
  );
};

export default Dashboard;
