import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

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
    setCourse({ courseName: "", courseDescription: "", instructor: "" });
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  const startEdit = (course) => {
    setEditingId(course._id);
    setEditData(course);
  };

  const updateCourse = async (id) => {
    await axios.put(
      `http://localhost:5000/api/courses/${id}`,
      editData
    );
    setEditingId(null);
    fetchCourses();
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Course Dashboard</h1>

      {/* Create */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create New Course
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Course Name"
            className="border p-3 rounded-lg"
            value={course.courseName}
            onChange={(e) =>
              setCourse({ ...course, courseName: e.target.value })
            }
          />

          <input
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={course.courseDescription}
            onChange={(e) =>
              setCourse({
                ...course,
                courseDescription: e.target.value,
              })
            }
          />

          <input
            placeholder="Instructor"
            className="border p-3 rounded-lg"
            value={course.instructor}
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
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Add Course
        </button>
      </div>

      {/* Course List */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            {editingId === c._id ? (
              <>
                <input
                  className="border p-2 w-full mb-2 rounded"
                  value={editData.courseName}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      courseName: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  value={editData.courseDescription}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      courseDescription: e.target.value,
                    })
                  }
                />
                <input
                  className="border p-2 w-full mb-2 rounded"
                  value={editData.instructor}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      instructor: e.target.value,
                    })
                  }
                />

                <button
                  onClick={() => updateCourse(c._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">
                  {c.courseName}
                </h3>
                <p className="text-gray-600 mt-2">
                  {c.courseDescription}
                </p>
                <p className="text-gray-500 mt-2">
                  Instructor: {c.instructor}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => startEdit(c)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(c._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;