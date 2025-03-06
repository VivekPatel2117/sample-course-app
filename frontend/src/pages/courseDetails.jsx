import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, unenrollCourse } from "../redux/slice/studentSlice";

export default function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.student.enrolledCourses);
  const [course, setCourse] = useState(null);
  const [isError, setIsError] = useState(false);

  // Ensure ID comparison works properly
  const courseId = String(id);
  const isEnrolled = enrolledCourses.some((c) => String(c.id) === courseId);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await axios.get(`/api/courses?id=${id}`);
        if (response.status === 200 && response.data.length > 0) {
          setCourse(response.data[0]);
          return;
        }
        setIsError(true);
      } catch (error) {
        setIsError(true);
      }
    };

    handleGetData();
  }, [id]);

  // Handle enrollment
  const handleEnrollment = () => {
    if (!course) return; // Ensure course data exists before dispatching
    if (!isEnrolled) {
      dispatch(enrollCourse(course));
    } else {
      dispatch(unenrollCourse(course.id));
    }
  };

  return (
    <div>
      <Navbar />
      {course && (
        <div className="w-full p-4">
          {/* Course Image */}
          <img
            src={course.thumbnail}
            alt={course.name}
            className="w-full h-64 object-contain rounded-lg"
          />

          {/* Course Info */}
          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{course.name}</h1>
            <p className="text-gray-600">{course.description}</p>
            <p>
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {course.duration}
            </p>
            <p>
              <span className="font-semibold">Schedule:</span> {course.schedule}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {course.location}
            </p>

            {/* Enrollment Status - Click to Enroll/Unenroll */}
            <p>
              <span className="font-semibold">Enrollment Status:</span>{" "}
              <button
                onClick={handleEnrollment}
                className={`px-2 py-1 rounded transition ${
                  isEnrolled
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {isEnrolled ? "Unenroll" : "Enroll"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
