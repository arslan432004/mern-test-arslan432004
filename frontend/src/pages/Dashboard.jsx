import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
  });

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    await axios.post("http://localhost:5000/api/courses", course);
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Student CMS</h2>
        <p className="opacity-80">Dashboard</p>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Course Dashboard
        </h1>

        {/* Create Form */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Create New Course
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Course Name"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) =>
                setCourse({ ...course, courseName: e.target.value })
              }
            />

            <input
              placeholder="Description"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) =>
                setCourse({
                  ...course,
                  courseDescription: e.target.value,
                })
              }
            />

            <input
              placeholder="Instructor"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) =>
                setCourse({
                  ...course,
                  instructor: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={createCourse}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Add Course
          </button>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">
                {c.courseName}
              </h3>
              <p className="text-gray-600 mt-2">
                {c.courseDescription}
              </p>
              <p className="text-gray-500 mt-2">
                Instructor: {c.instructor}
              </p>

              <button
                onClick={() => deleteCourse(c._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;