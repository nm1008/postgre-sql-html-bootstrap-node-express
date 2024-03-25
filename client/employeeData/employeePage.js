const baseURL = "http://localhost:3000/api/v1/users/";

let userId;
let editUserId;
let viewAllBtn = false;
const input = document.querySelector("#phone");
var updateInput = document.querySelector("#upd-phone-number");

// INTL TEL INPUT
var iti = window.intlTelInput(input, {
  separateDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.5/build/js/utils.js",
});

var updateIti = window.intlTelInput(updateInput, {
  separateDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@20.0.5/build/js/utils.js",
});

//RENDER PAGE
$.ajax({
  type: "GET",
  url: baseURL,
  success: (res) => {
    $("#table-body").empty();
    if (res.length === 0) {
      userId = 1;
      // console.log(userId);
      $("#viewAll").hide();
      $("#spanUser").html(`
        <h1 class="text-center my-5">No users</h1>
      `);
    }

    res.forEach((user) => {
      userId = user.user_id;

      $("#table-body").append(`
        <tr>
          <td class="fw-bold">${user.user_id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td> 
          <td>
            <button type="button" class='btn btn-success text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#viewEmployeeModal" onclick="viewEmployee(${user.user_id})">View</button>
            <button type="button" class='btn btn-warning text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="updateUser(${user.user_id})">Edit</button>
            <button class='btn btn-danger text-white fw-bold' onclick="deleteUser(${user.user_id})">Delete</button>
          </td>
        </tr>
      `);
      userId++;
      $("#viewAll").hide();
    });
  },
  error: (xhr, status, error) => {
    console.error("Error fetching user data:", error);
  },
});

//ADD USER
$("#add").click(() => {
  const firstName = $("#first-name").val();
  const lastName = $("#last-name").val();
  const email = $("#email").val();
  const address = $("#address").val();
  const phoneNumber = `${iti.getSelectedCountryData().dialCode}${$(
    "#phone"
  ).val()}`;

  if (
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    address === "" ||
    phoneNumber === ""
  ) {
    alert("Please fill out the input fields");
    return $("#addEmployeeModal").modal("hide");
  }

  const user = {
    user_id: userId,
    first_name:
      stringCleanser(firstName).charAt(0).toUpperCase() + firstName.slice(1),
    last_name:
      stringCleanser(lastName).charAt(0).toUpperCase() + lastName.slice(1),
    email: stringCleanser(email),
    address: stringCleanser(address),
    phone_number: stringCleanser(phoneNumber),
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
      if (res) {
        Swal.fire({
          title: "Good job!",
          text: "User has been updated",
          icon: "success",
        }).then(() => {
          location.reload();
        });
        $("#addEmployeeModal").modal("hide");
      }
    },
  });
});

//UPDATE USER
const updateUser = (userId) => {
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
        $("#upd-phone-number").val("PH");
      });
    },
  });

  $("#edit").click(() => {
    const updateFirstName = $("#upd-first-name").val();
    const updateLastName = $("#upd-last-name").val();
    const updateEmail = $("#upd-email").val();
    const updateAddress = $("#upd-address").val();
    const updatePhoneNumber = $("#upd-phone-number").val();

    if (
      updateFirstName === "" ||
      updateLastName === "" ||
      updateEmail === "" ||
      updateAddress === "" ||
      updatePhoneNumber === ""
    ) {
      alert("Please fill out the input fields");
      return $("#editUserModal").modal("hide");
    }

    const updateUser = {
      user_id: editUserId,
      first_name:
        stringCleanser(updateFirstName).charAt(0).toUpperCase() +
        updateFirstName.slice(1),
      last_name:
        stringCleanser(updateLastName).charAt(0).toUpperCase() +
        updateLastName.slice(1),
      email: stringCleanser(updateEmail),
      address: stringCleanser(updateAddress),
      phone_number: stringCleanser(updatePhoneNumber),
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
        if (res) {
          Swal.fire({
            title: "Good job!",
            text: "User has been updated",
            icon: "success",
          }).then(() => {
            location.reload();
          });
          $("#editUserModal").modal("hide");
        }
      },
    });
  });
};

//DELETE USER
const deleteUser = (userId) => {
  Swal.fire({
    title: "Do you want to delete this user?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "DELETE",
        url: `${baseURL}${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        success: (res) => {
          if (res) {
          }
        },
        error: (xhr, status, error) => {
          console.error("Error deleting user:", error);
        },
      });

      Swal.fire({
        title: "Deleted!",
        text: "This user has been deleted",
        icon: "success",
      }).then(() => {
        location.reload();
      });
    }
  });
};

// GET USER BY ID
const getUserById = (userId) => {};

//VIEW employee
const viewEmployee = (userId) => {
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
              <b>Phone Number: </b><span>+${user.phone_number}</span>
          </div
        </div>
       `);
      });
    },
  });
};

//get user by name
$("#search").click(() => {
  const searchFirstName = $("#search-first-name").val();
  const searchLastName = $("#search-last-name").val();

  if (searchFirstName.length <= 2 || searchLastName.length <= 2) {
    alert("Please fill out the input fields");
    return $("#searchEmployeeModal").modal("hide");
  }

  const searchUser = {
    first_name:
      stringCleanser(searchFirstName).charAt(0).toUpperCase() +
      searchFirstName.slice(1),
    last_name:
      stringCleanser(searchLastName).charAt(0).toUpperCase() +
      searchLastName.slice(1),
  };

  $.ajax({
    type: "POST",
    url: `${baseURL}search`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(searchUser),
    success: (res) => {
      // console.log(res);
      $("#table-body").empty();
      res.forEach((user) => {
        $("#table-body").append(`
          <tr>
          <td class="fw-bold">${user.user_id}</td>
          <td>${user.first_name}</td>
          <td>${user.last_name}</td> 
          <td>
            <button type="button" class='btn btn-success text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#viewEmployeeModal" onclick="viewEmployee(${user.user_id})">View</button>
            <button type="button" class='btn btn-warning text-white mx-2 fw-bold' data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="updateUser(${user.user_id})">Edit</button>
            <button class='btn btn-danger text-white fw-bold' onclick="deleteUser(${user.user_id})">Delete</button>
          </td>
          </tr>
        `);
      });

      $("#search-first-name").val("");
      $("#search-last-name").val("");
      $("#searchEmployeeModal").modal("hide");

      $("#viewAll").show();
    },
  });
});

//DUUUHH??
const stringCleanser = (string) => {
  return string.replace(/([^a-z0-9 ._-]+)/gi, "");
};

//#viewAll Button
$("#viewAll").click(() => {
  location.reload();
  $("#viewAll").hide();
});

const username = $("#userUsername").value();
const password = $("#userPassword").value();

$("#loginForm").click(() => {
  console.log("login form");
});

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
