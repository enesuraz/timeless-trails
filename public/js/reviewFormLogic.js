import { formMessage } from "./messages";

// --------------------- Make Rate -------------------
export function makeStartRate(buttons, rate) {
  buttons.forEach((el, i) => {
    const hrefAttribute = `/assets/icons.svg#icon-star${rate >= i + 1 ? "" : "-outlined"}`;
    el.querySelector("use").setAttribute("href", hrefAttribute);
  });
}

// ----------------- Create Review ----------------------
async function handleAsyncReview(route, id, inputs, form) {
  const path =
    route === "review" || route === "delete"
      ? `/api/v1/reviews/${id}`
      : `/api/v1/tours/${id}/reviews`;

  let method;
  if (route === "review") method = "PATCH";
  if (route === "delete") method = "DELETE";
  if (route === "tour") method = "POST";

  const body = inputs ? JSON.stringify(inputs) : "";

  try {
    const res = await fetch(path, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    if (data.status === "success" && (route === "review" || route === "tour")) {
      formMessage(
        form,
        ["success", "open"],
        route === "review"
          ? "Updated Review Successfully"
          : "Created Review Successfully",
        true
      );
    }

    if (data.status === "success" && route === "delete") {
      alert("Deleted successfully");
      window.setTimeout(() => {
        location.reload(true);
      }, 3000);
    }
  } catch (err) {
    if (err.message.includes("Duplicate"))
      err.message = "You can not create more than 1 review";
    if (form) formMessage(form, ["open"], err.message, false);
    else alert(err.message);
  }
}

export function handleSubmitReview(e) {
  e.preventDefault();

  const id = e.target.id.split("-");
  const starRate = e.target.querySelectorAll(
    "use[href='/assets/icons.svg#icon-star']"
  ).length;
  const review = document.getElementById("review").value;
  const inputs = { rating: starRate, review };
  handleAsyncReview(id[0], id[1], inputs, e.target);
}

// ----------------- Delete Review ----------------------
export function handleDeleteReview(e) {
  e.preventDefault();
  handleAsyncReview("delete", e.target.dataset.id);
}
