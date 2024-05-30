export const form = document.querySelector(".form");
export const updateForm = document.querySelector(".form--user-settings");
export const userImageFile = document.getElementById("photo");

// Show Image
const userImage = document.querySelector(".form__label--user-photo img");

export function handleUserImage() {
  const file = userImageFile.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    userImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Send Form Message
function formMessage(formName, classNameList, msg, reload) {
  const formError = formName.querySelector(".form__error");
  formError.innerHTML = msg;
  formError.classList.add(...classNameList);

  window.setTimeout(() => {
    formError.innerHTML = "";
    formError.classList.remove(...classNameList);
    if (reload) location.reload(true);
  }, 5000);
}

async function handleAsync(route, inputs) {
  try {
    // if profile image exists don't send headers
    const headers =
      route !== "update-me" ? { "Content-Type": "application/json" } : {};
    const res = await fetch(`/api/v1/users/${route}`, {
      method: route.includes("update") ? "PATCH" : "POST",
      body: route === "update-me" ? inputs : JSON.stringify(inputs),
      headers,
    });
    const data = await res.json();
    // if error
    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    if (data.status === "success") {
      // if success and update profile info
      if (route === "update-me") {
        formMessage(
          updateForm,
          ["success", "open"],
          "Updated data successfully!!!",
          true
        );
        // if success and update password
      } else if (route === "update-password") {
        formMessage(
          form,
          ["success", "open"],
          "Updated password successfully!!!",
          true
        );
        // Forgot Password
      } else if (route === "forgotPassword") {
        formMessage(
          form,
          ["success", "open"],
          "We sent reset password link to your email,Check your email box!!!",
          true
        );
        // Reset password
      } else if (route.includes("resetPassword")) {
        formMessage(
          form,
          ["success", "open"],
          "Changed Password Successfully",
          false
        );
        window.setTimeout(() => {
          location.assign("/");
        }, 6000);
      }
      // Other forms
      else {
        location.assign("/");
      }
    }
  } catch (err) {
    // if err and update profile info
    if (route === "update-me") {
      formMessage(updateForm, ["open"], err.message, false);
      // other forms
    } else {
      formMessage(form, ["open"], err.message, false);
    }
  }
}

export function handleUserSubmit(e) {
  e.preventDefault();
  let inputs = {};
  // if signup or login add email and password
  if (e.target.id === "signup" || e.target.id === "login") {
    inputs = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
  }
  // if signup add name and passwordConfirm values
  if (e.target.id === "signup") {
    inputs.name = document.getElementById("username").value;
    inputs.passwordConfirm = document.getElementById("passwordConfirm").value;
    handleAsync("signup", inputs);
  }
  // if login send direct handleAsync
  else if (e.target.id === "login") {
    handleAsync("login", inputs);
  }
  // if change settings rearrange inputs,sent form data
  else if (e.target.id === "changeSettings") {
    inputs = new FormData();
    inputs.append("name", document.getElementById("name").value);
    inputs.append("email", document.getElementById("email").value);
    inputs.append("photo", document.getElementById("photo").files[0]);
    handleAsync("update-me", inputs);
  }
  // if change password raerrange inputs
  else if (e.target.id === "changePassword") {
    inputs = {
      currentPassword: document.getElementById("oldPassword").value,
      password: document.getElementById("newPassword").value,
      passwordConfirm: document.getElementById("newPassword confirm").value,
    };
    handleAsync("update-password", inputs);
  }
  // if forgot password
  else if (e.target.id === "forgot") {
    handleAsync("forgotPassword", {
      email: document.getElementById("email").value,
    });
  }
  // if Reset password
  else if (e.target.id === "reset") {
    inputs = {
      password: document.getElementById("password").value,
      passwordConfirm: document.getElementById("passwordConfirm").value,
    };

    const token = window.location.pathname.split("/")[3];
    handleAsync(`resetPassword/${token}`, inputs);
  }
}

// Logout Functionality
export async function handleLogout(e) {
  try {
    const res = await fetch(`/api/v1/users/logout`);

    const data = await res.json();

    if (data.status === "success") location.assign("/");
  } catch (err) {
    alert(err.message);
  }
}

export async function handleDeleteUser() {
  try {
    const res = await fetch(`/api/v1/users/delete-me`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.status === "success") location.assign("/login");
  } catch (err) {
    alert(err.message);
  }
}
