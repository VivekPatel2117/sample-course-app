// import React, { useEffect, useState } from "react";
// import { courseCard as CourseCard } from "../components/courseCard";
// import axios from "axios";
// import { errorAlert as ErrorAlert } from "../components/errorAlert";
// import { Navbar } from "../components/Navbar";
// export default function Listing() {
//   const [data, setData] = useState([]);
//   const [isError, setIsError] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const getCourses = async () => {
//     try {
//       const response = await axios.get("/api/courses/");
//       if (response.status === 200) {
//         setData(response.data);
//         setFilteredData(response.data);
//         return;
//       }
//       setIsError(true);
//     } catch (error) {
//       setIsError(true);
//     }
//   };

//   const handleInput = (value) => {
//     if (value === "") {
//       setFilteredData(data);
//       return;
//     }

//     const lowerCaseQuery = value.toLowerCase();
//     setSearchInput(value);

//     // Prioritize results that start with the query first
//     const startsWithMatches = data.filter(
//       (i) =>
//         i.name.toLowerCase().startsWith(lowerCaseQuery) ||
//         i.instructor.toLowerCase().startsWith(lowerCaseQuery)
//     );

//     // Then include results where the query appears anywhere
//     const includesMatches = data.filter(
//       (i) =>
//         (i.name.toLowerCase().includes(lowerCaseQuery) ||
//           i.instructor.toLowerCase().includes(lowerCaseQuery)) &&
//         !startsWithMatches.includes(i) // Exclude already matched items
//     );

//     // Combine both results (startsWith matches first)
//     setFilteredData([...startsWithMatches, ...includesMatches]);
//   };

//   useEffect(() => {
//     getCourses();
//   }, []);

//   return (
//     <div className="">
//       <Navbar handleInput={handleInput} />
//       <div className="grid w-full p-6">
//         {isError && <ErrorAlert />}
//         {filteredData.length > 0 ? (
//           <div className="grid gap-4">
//             {filteredData.map((item, index) => (
//               <CourseCard
//                 img={item.thumbnail}
//                 key={index}
//                 id={item.id}
//                 courseName={item.name}
//                 instructorName={item.instructor}
//                 description={item.description}
//                 duration={item.duration}
//               />
//             ))}
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { courseCard as CourseCard } from "../components/courseCard";
import axios from "axios";
import { errorAlert as ErrorAlert } from "../components/errorAlert";
import { Navbar } from "../components/Navbar";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Connect to WebSocket server

export default function Listing() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const getCourses = async () => {
    try {
      const response = await axios.get("/api/courses/");
      if (response.status === 200) {
        setData(response.data);
        setFilteredData(response.data);
        return;
      }
      setIsError(true);
    } catch (error) {
      setIsError(true);
    }
  };

  const handleInput = (value) => {
    if (value === "") {
      setFilteredData(data);
      return;
    }

    const lowerCaseQuery = value.toLowerCase();
    setSearchInput(value);

    const startsWithMatches = data.filter(
      (i) =>
        i.name.toLowerCase().startsWith(lowerCaseQuery) ||
        i.instructor.toLowerCase().startsWith(lowerCaseQuery)
    );

    const includesMatches = data.filter(
      (i) =>
        (i.name.toLowerCase().includes(lowerCaseQuery) ||
          i.instructor.toLowerCase().includes(lowerCaseQuery)) &&
        !startsWithMatches.includes(i)
    );

    setFilteredData([...startsWithMatches, ...includesMatches]);
  };

  useEffect(() => {
    getCourses();

    // Listen for real-time course updates
    socket.on("courseLikesUpdated", (updatedCourses) => {
      setData(updatedCourses);
      setFilteredData(updatedCourses);
    });

    return () => {
      socket.disconnect(); // Cleanup socket connection on unmount
    };
  }, []);

  return (
    <div className="">
      <Navbar handleInput={handleInput} />
      <div className="grid w-full p-6">
        {isError && <ErrorAlert />}
        {filteredData.length > 0 ? (
          <div className="grid gap-4">
            {filteredData.map((item, index) => (
              <CourseCard
                img={item.thumbnail}
                key={index}
                id={item.id}
                courseName={item.name}
                instructorName={item.instructor}
                description={item.description}
                duration={item.duration}
                likes={item.likes} 
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
