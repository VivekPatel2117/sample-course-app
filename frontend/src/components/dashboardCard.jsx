import React from "react";
import { Progress } from "./progress";
import { useDispatch } from "react-redux";
import { markCourseAsCompleted } from "../redux/slice/studentSlice";
import { useNavigate } from "react-router-dom";

export const DashboardCard = ({
  id,
  likes,
  name,
  instructor,
  progress,
  thumbnail,
  duration,
  description,
  location,
}) => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const handleMarkAsCompleted = () => {
    dispatch(markCourseAsCompleted(id));
  };
  
  const handleNavigation = () => {
    naviagte(`/courses/${id}`);
  };
  return (
    <div>
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:justify-between sm:gap-4">
          <div className="cursor-pointer" onClick={handleNavigation}>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {name}
            </h3>
            <p className="mt-1 text-xs font-medium text-gray-600">
              By {instructor}
            </p>
          </div>

          <div className="lg:relative absolute top-0 right-0 lg:m-0 m-4 sm:block sm:shrink-0">
            <img
              alt=""
              src={thumbnail}
              className="size-16 rounded-lg object-cover shadow-xs"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-pretty text-gray-500">{description}</p>
        </div>

        <dl className="mt-6 flex gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Duration</dt>
            <dd className="text-xs text-gray-500">{duration}</dd>
          </div>

          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">Location</dt>
            <dd className="text-xs text-gray-500">{location}</dd>
          </div>
          {likes && (
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">Likes</dt>
              <dd className="text-xs text-gray-500">{likes}</dd>
            </div>
          )}
          <div className="flex flex-col-reverse">
            <dt className="text-sm font-medium text-gray-600">
              <button
                className="bg-amber-300 px-2 py-1 rounded"
                onClick={handleMarkAsCompleted}
              >
                Mark as Completed
              </button>
            </dt>
            <dd className="text-xs text-gray-500">
              {progress === 100 ? "Completed" : "In Progress"}
            </dd>
          </div>
        </dl>
        <br />
        <div>
          <Progress value={progress} />
        </div>
      </div>
    </div>
  );
};
