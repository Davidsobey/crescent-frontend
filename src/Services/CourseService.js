const CourseService = {
  create,
  getAll
};

function create(courseName, courseDescription) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
    // body: JSON.stringify({
    //   name: courseName,
    //   description: courseDescription,
    //   category: 1,
    //   grade: 0,
    //   enrolledUserIds: null
    // })
  };

  return fetch(
    `https://crescenttesting.azurewebsites.net/api/Courses?Name=${courseName}&Description=${courseDescription}&CategoryId=1&Grade=0`,
    requestOptions
  ).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(
    "https://crescenttesting.azurewebsites.net/api/Courses",
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

export default CourseService;
