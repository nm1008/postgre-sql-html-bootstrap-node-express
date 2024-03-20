const baseURL = "http://localhost:3000/api/v1/users/";

let userId;

// $(document).ready(() => {
//   $.ajax({
//     type: "GET",
//     url: baseURL,
//     success: (res) => {
//       $("#table-body").empty();

//       res.forEach((user) => {
//         userId = user.user_id;
//         console.log(userId);
//         $("#table-body").append(`
//           <tr>
//             <th scope="row">${user.user_id}</th>
//             <td>${user.first_name}</td>
//             <td>${user.last_name}</td>
//             <td>
//               <button class='btn btn-warning text-white' id="editPage" onclick="updateUser(${user.user_id})" >Edit</button>
//               <button class='btn btn-danger text-white' onclick="deleteUser(${user.user_id})">Delete</button>
//             </td>
//           </tr>
//         `);
//       });
//     },
//     error: (xhr, status, error) => {
//       console.error("Error fetching user data:", error);
//     },
//   });
// });

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
            <button class='btn btn-warning text-white' onclick="updateUser(${user.user_id})">Edit</button>
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


//add user
$("#form").on("submit", (e) => {
  e.preventDefault();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();

  const user = {
    user_id: userId + 1,
    first_name: firstName,
    last_name: lastName,
  };

  console.log(user);

  $.ajax({
    url: baseURL,
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
    dataType: "json",
    success: (res) => {
      console.log(res);
    },
  });
  location.reload()
});

// console.log(user);

const updateUser = (userId) => {
  console.log(`this is user ${userId}`);

  $.ajax({
    type: "GET",
    url: `${baseURL}${userId}`,
    success: (res) => {
      res.map((user) => {
        $("#first-name").val(`${user.first_name}`);
        $("#last-name").val(user.last_name);
      });
    },
  });
};

const deleteUser = (userId) => {
  console.log(`delete ${userId}`);

  $.ajax({
    type: "DELETE",
    url: `${baseURL}${userId}`,
    headers: {
      "Content-Type": "application/json",
    },
    success: (res) => {
      console.log(res);
    },
    error: (xhr, status, error) => {
      console.error("Error deleting user:", error);
    },
  });
  location.reload()
};

// function ajaxPost(url, data, callback = null, successMessage = null) {
//   $.post(url, data, function (response) {
//    if (!response.success) {
//     showErrorMsg(response.message);
//     hideLoader();
//     return false;
//    }

//    if (response.success) {
//     showSuccessMsg(successMessage);

//     if (callback != null) {
//      callback(response);
//     }
//    } else {
//     showErrorMsg(response.message);
//    }
//   }).fail(function () {
//    showErrorMsg();
//    hideLoader();
//   }).always(function () {
//    enableSaveButtons();
//   });
//  }
