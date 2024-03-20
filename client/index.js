const baseURL = "http://localhost:3000/api/v1/users/";

let userId;
let editUserId;

//render page
$.ajax({
  type: "GET",
  url: baseURL,
  success: (res) => {
    $("#table-body").empty();
    // console.log(res.length)
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
          <th scope="row">${user.user_id}</th>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td>
          <td>
          <button type="button" class='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="updateUser(${user.user_id})">Edit</button>
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

//add user
$("#form").on("submit", (e) => {
  e.preventDefault();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();

  const user = {
    user_id: userId,
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
  location.reload();
});

// console.log(user);

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
      first_name: updateFirstName,
      last_name: updateLastName,
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
       location.reload()
      },
    });
  });

 
};

const deleteUser = (userId) => {
  // console.log(`delete ${userId}`);

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
