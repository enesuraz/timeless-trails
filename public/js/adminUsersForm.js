// form message
import { formMessage } from "./messages";

// Update or Delete User
async function handleAsync(route, form, inputs) {
  try {
    const headers = inputs ? { "Content-Type": "application/json" } : {};
    const body = inputs ? JSON.stringify(inputs) : "";
    const res = await fetch(`/api/v1/users/${route}`, {
      method: inputs ? "PATCH" : "DELETE",
      body,
      headers,
    });
    const data = await res.json();

    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    if (data.status === "success") {
      if (inputs) {
        formMessage(
          form,
          ["success", "open"],
          "Updated data successfully!!!",
          false
        );
      } else {
        formMessage(
          form,
          ["success", "open"],
          "Deleted data successfully!!!",
          true
        );
      }
    }
  } catch (err) {
    formMessage(form, ["open"], err.message, false);
  }
}

export function handleAdminUsersSubmit(e) {
  e.preventDefault();
  const id = e.target.id.split("-")[1];
  const username = document.getElementById(`username-${id}`).value;
  const email = document.getElementById(`email-${id}`).value;
  const role = document.getElementById(`role-${id}`).value;
  if (role === "admin") {
    formMessage(
      e.target,
      ["open"],
      "Deleted this functionality because this is test environment :)",
      false
    );
    return;
  }
  const inputs = { name: username, email, role };
  handleAsync(id, e.target, inputs);
}

export function handleAdminUsersDelete(e) {
  const form = e.target.closest(".form--users");
  const id = form.id.split("-")[1];
  handleAsync(id, form);
}
