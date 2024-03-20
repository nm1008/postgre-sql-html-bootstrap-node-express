const baseURL = "http://localhost:3000/api/v1/users/";

let userId;

$(document).ready(() => {
  $.ajax({
    type: "GET",
    url: baseURL,
    success: (res) => {
      $("#table-body").empty();

      res.forEach((user) => {
        userId = user.user_id;
        console.log(userId);
        $("#table-body").append(`
          <tr>
            <th scope="row">${user.user_id}</th>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>
              <button class='btn btn-warning text-white' id="editPage">Edit</button>
              <button class='btn btn-danger text-white' onclick="deleteUser(${user.user_id})">Delete</button>
            </td>
          </tr> 
        `);
      });
    },
    error: (xhr, status, error) => {
      console.error("Error fetching user data:", error);
    },
  });
});

const renderPage = () => {
  $.ajax({
    type: "GET",
    url: baseURL,
    success: (res) => {
      $("#table-body").empty();

      res.forEach((user) => {
        userId = user.user_id;
        $("#table-body").append(`
          <tr>
            <th scope="row">${user.user_id}</th>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>
              <button class='btn btn-warning text-white' id="editPage">Edit</button>
              <button class='btn btn-danger text-white' onclick="deleteUser(${user.user_id})">Delete</button>
            </td>
          </tr> 
        `);
      });
    },
    error: (xhr, status, error) => {
      console.error("Error fetching user data:", error);
    },
  });
};

renderPage();

const addEmployee = (e) => {
  e.preventDefault();

  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();

  // console.log(firstName, lastName);
  console.log(userId);
  const user = {
    user_id: 4,
    first_name: firstName,
    last_name: lastName,
  };
  console.log(user);

  $.ajax({
    type: "POST",
    url: baseURL,
    data: user,
    headers: {
      Accept: "text/plain; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8",
    },
    success: (res) => {
      console.log(res);
    },
    error: (xhr, status, error) => {
      console.error("Error posting user data:", error);
    },
  });
};

const deleteUser = (userId) => {
  console.log(`delete ${userId}`);

  $.ajax({
    type: "DELETE",
    url: `${baseURL}${userId}`,
    headers: {
      Accept: "text/plain; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8",
    },
    success: (res) => {
      console.log(res);
    },
    error: (xhr, status, error) => {
      console.error("Error deleting user:", error);
    },
  });
};


