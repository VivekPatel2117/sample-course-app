import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function CourseDetails() {
  const { id } = useParams();
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [course, setCourse] = useState({});
  const [isError, setIsError] = useState(false);
  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };
  const handleGetData = async () => {
    try {
      const response = await axios.get(`/api/courses?id=${id}`);
      if (response.status === 200) {
        setCourse(response.data[0]);
        console.log(response.data[0]);
        return;
      }
      setIsError(true);
    } catch (error) {
      setIsError(true);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      <Navbar />

      {Object.keys(course).length > 0 && (
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
              <span className="font-semibold">Instructor:</span>{" "}
              {course.instructor}
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
            <p>
              <span className="font-semibold">Enrollment Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  course.enrollmentStatus === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {course.enrollmentStatus}
              </span>
            </p>
            <div>
              <h2 className="text-lg font-semibold">Prerequisites</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {course.prerequisites.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            {/* Syllabus (Expandable) */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Syllabus</h2>
              {course.syllabus.map((week) => (
                <div key={week.week} className="border mb-2">
                  <button
                    onClick={() => toggleWeek(week.week)}
                    className="w-full text-left p-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                  >
                    <span>
                      Week {week.week}: {week.topic}
                    </span>
                    <span className="text-gray-500">
                      {expandedWeek === week.week ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedWeek === week.week && (
                    <div className="p-3 bg-white">{week.content}</div>
                  )}
                </div>
              ))}
            </div>
            {/* Student List */}
            <div>
              <h2 className="text-lg font-semibold">Enrolled Students</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {course.students.map((student) => (
                  <li key={student.id}>
                    {student.name} -{" "}
                    <span className="text-blue-600">{student.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
