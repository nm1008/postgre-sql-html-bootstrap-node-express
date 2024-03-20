const baseURL = "http://localhost:3000/api/v1/users/";

let userId;
let editUserId;

//RENDER PAGE
$.ajax({
  type: "GET",
  url: baseURL,
  success: (res) => {
    $("#table-body").empty();
    if (res.length === 0) {
      userId = 1;
      console.log(userId);
      $("#table").remove();
      $("#spanUser").html(`
        <h1>No users</h1>
      `);
    }

    res.forEach((user) => {
      userId = user.user_id;
      $("#table-body").append(`
        <tr>
          <td>${user.user_id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td> 
          <td>
            <button type="button" class='btn btn-warning text-white mx-3' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="updateUser(${user.user_id})">Edit</button>
            <button class='btn btn-danger text-white' onclick="deleteUser(${user.user_id})">Delete</button>
          </td>
        </tr>
      `);
      userId++;
    });
  },
  error: (xhr, status, error) => {
    console.error("Error fetching user data:", error);
  },
});

//ADD USER
$("#form").on("submit", (e) => {
  e.preventDefault();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();

  const user = {
    user_id: userId,
    first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1),
  };

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
  location.reload();
});

//UPDATE USER
const updateUser = (userId) => {
  console.log(`this is user ${userId}`);
  editUserId = userId;

  $.ajax({
    type: "GET",
    url: `${baseURL}${editUserId}`,
    success: (res) => {
      res.map((user) => {
        $("#upd-first-name").val(`${user.first_name}`);
        $("#upd-last-name").val(user.last_name);
      });
    },
  });

  $("#edit").click(() => {
    const updateFirstName = $("#upd-first-name").val();
    const updateLastName = $("#upd-last-name").val();

    const updateUser = {
      user_id: editUserId,
      first_name: updateFirstName.charAt(0).toUpperCase() + updateFirstName.slice(1),
      last_name: updateLastName.charAt(0).toUpperCase() + updateLastName.slice(1),
    };

    $.ajax({
      type: "PUT",
      url: `${baseURL}${editUserId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updateUser),
      dataType: "json",
      success: (res) => {
        console.log(res);
        location.reload();
      },
    });
  });
};

//DELETE USER
const deleteUser = (userId) => {
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
  location.reload();
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
