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
            <button type="button" class='btn btn-success text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#viewEmployeeModal" onclick="viewEmployee(${user.user_id})">View</button>
            <button type="button" class='btn btn-warning text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="updateUser(${user.user_id})">Edit</button>
            <button class='btn btn-danger text-white fw-bold' onclick="deleteUser(${user.user_id})">Delete</button>
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
$("#addEmployeeForm").on("submit", (e) => {
  console.log('working add');
  e.preventDefault();
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const email = $("#email").val();
  const address = $("#address").val();
  const phoneNumber = $("#phone-number").val();

  const user = {
    user_id: userId,
    first_name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    last_name: lastName.charAt(0).toUpperCase() + lastName.slice(1),
    email: email,
    address: address,
    phone_number: phoneNumber,
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
  console.log('working edit')
  console.log(`this is user ${userId}`);
  editUserId = userId;

  $.ajax({
    type: "GET",
    url: `${baseURL}${editUserId}`,
    success: (res) => {
      res.map((user) => {
        $("#upd-first-name").val(`${user.first_name}`);
        $("#upd-last-name").val(user.last_name);
        $("#upd-email").val(user.email);
        $("#upd-address").val(user.address);
        $("#upd-phone-number").val(user.phone_number);
      });
    },
  });

  $("#edit").click(() => {
    const updateFirstName = $("#upd-first-name").val();
    const updateLastName = $("#upd-last-name").val();
    const updateEmail = $("#upd-email").val();
    const updateAddress = $("#upd-address").val();
    const updatePhoneNumber = $("#upd-phone-number").val();

    const updateUser = {
      user_id: editUserId,
      first_name:
        updateFirstName.charAt(0).toUpperCase() + updateFirstName.slice(1),
      last_name:
        updateLastName.charAt(0).toUpperCase() + updateLastName.slice(1),
      email: updateEmail,
      address: updateAddress,
      phone_number: updatePhoneNumber,
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

// GET USER BY ID
const getUserById = (userId) => {};

//VIEW employee

const viewEmployee = (userId) => {
  console.log(userId);

  $.ajax({
    type: "GET",
    url: `${baseURL}${userId}`,
    success: (res) => {
      res.map((user) => {
        $("#view-employee").empty();
        $("#view-employee").append(`
        <div class="row text-center align-items-center ">
          <div class="col-md-12">
            <h3>${user.first_name} ${user.last_name}</h3>
            <h6>Employee# ${user.user_id}</h6>
          </div>
        </div>
        <div class="row ms-3 my-5">
          <div class="d-flex gap-2">
            <b>Email: </b><span>${user.email}</span>
          </div>    
          <div class="d-flex gap-2">
              <b>Address: </b><span>${user.address}</span>
          </div>
          <div class="d-flex gap-2">
              <b>Phone Number: </b><span>${user.phone_number}</span>
          </div
        </div>
       `);
      });
    },
  });
};

//random code langsss
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
