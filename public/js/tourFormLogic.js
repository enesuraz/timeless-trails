// ---------------- Form Message -------------
import { formMessage } from "./messages";

export const tourForm = document.querySelector(".form--tour");

// -------------------Locations Funcionalities----------------------
export function generateLocationsMarkup(items, el) {
  let markup = ``;
  items.forEach((item, i) => {
    const uuid = Math.random()
      .toString(36)
      .substring(2, 2 + 2);
    markup += `
            <div class='form__group--location'>
            <div class='location-group'>
                <label for='description-${uuid}' class='form__label'>Description</label>
                <input type='text' class='form__input form__input--description' value='${item.description}' id='description-${uuid}'/>
            </div>
            <div class='location-group'>
                <label for='coordinates-${uuid}' class='form__label'>Coordinates</label>
                <input type='text' class='form__input form__input--coordinates' value='${item.coordinates}' id='coordinates-${uuid}'/>
            </div>
            <div class='location-group'>
                <label for='day-${uuid}' class='form__label'>Day</label>
                <input type='text' class='form__input form__input--day' value='${item.day}' id='day-${uuid}'/>
            </div>
            <button type='button' class='form__delete form__delete--location' onclick="deleteLocationItem(event)" data-locations='${JSON.stringify(items)}' data-order='${i}'>Delete</button>
            </div>
        `;
  });

  const parentElement = el.closest(".form__group--locations");
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("beforeend", markup);
}

export function handleAddLocationsClick(e) {
  e.preventDefault();
  const uuid = Math.random()
    .toString(36)
    .substring(2, 2 + 2);
  const markup = `
    <div class='form__group--location'>
    <div class='location-group'>
        <label for='description-${uuid}' class='form__label'>Description</label>
        <input type='text' class='form__input form__input--description' id='description-${uuid}' placeholder='Batman'/>
    </div>
    <div class='location-group'>
        <label for='coordinates-${uuid}' class='form__label'>Coordinates</label>
        <input type='text' class='form__input form__input--coordinates' placeholder='32,42' id='coordinates-${uuid}'/>
    </div>
    <div class='location-group'>
        <label for='day-${uuid}' class='form__label'>Day</label>
        <input type='text' class='form__input form__input--day' placeholder='5' id='day-${uuid}'/>
    </div>
    </div>
    `;

  const parentElement = e.target
    .closest(".form__group")
    .querySelector(".form__group--locations");
  parentElement.insertAdjacentHTML("beforeend", markup);
}

function locationInputs(className) {
  return Array.from(document.querySelectorAll(`.${className}`))
    .map((el) => el.value)
    .filter((el) => el !== "");
}

// --------------- Add User Funcionalities -------------------
export let guides = [];
const selectUsers = document.getElementById("users");
const usersContainer = document.querySelector(".form__users");

Array.from(document.querySelectorAll(`.form__delete--user`))?.map((el) =>
  guides.push(JSON.parse(el.dataset.user))
);

export function handleAddUser() {
  const value = selectUsers.value.split("-");
  if (guides.includes(value[0])) return;
  const markup = `
    <div class='form__user'>
       <span>${value[1]}</span>
       <span>${value[2]}</span>
        <button class='form__delete form__delete--user' type='button' onclick="deleteUser(event)" data-user=${value[0]}>Delete</button>
    </div>
  `;
  usersContainer.insertAdjacentHTML("beforeend", markup);
  guides.push(value[0]);
}

// --------------- Show Images ---------------
const photosContainer = document.querySelector(".form__images");
const coverImageContainer = document.querySelector(".form__cover-image");

export function handlePhotosFile() {
  if (
    Object.keys(photosFile.files).length < 4 ||
    Object.keys(photosFile.files).length > 4
  ) {
    formMessage(form, ["open"], "Please specify 4 images", false);
    return;
  }
  photosContainer.innerHTML = "";
  Object.values(photosFile.files).forEach((el) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      const markup = `
        <img src="${e.target.result}"/>
      `;
      photosContainer.insertAdjacentHTML("beforeend", markup);
    };
    reader.readAsDataURL(el);
  });
}

export function handleCoverImage() {
  coverImageContainer.innerHTML = "";
  const file = coverImage.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    const markup = `
        <img src="${e.target.result}"/>
      `;
    coverImageContainer.insertAdjacentHTML("beforeend", markup);
  };
  reader.readAsDataURL(file);
}

// ---------------- Date -----------
const dateInput = document.querySelector(".form__input--date");
const datesContainer = document.querySelector(".form__group--dates-container ");
export let dates = [];

Array.from(document.querySelectorAll(`.form__delete--date`))?.map((el) =>
  dates.push(JSON.parse(el.dataset.date))
);

export function handleAddDate() {
  if (!dateInput.value) return;
  const value = new Date(dateInput.value);
  const isoDateValue = value.toISOString();
  if (dates.includes(isoDateValue)) return;
  const markup = `
  <div class='form__date'>
     <span>${value.toLocaleDateString("en-US")}</span>
      <button class='form__delete form__delete--date' type='button' onclick="deleteDate(event)" data-date=${isoDateValue}>Delete</button>
  </div>
`;

  datesContainer.insertAdjacentHTML("beforeend", markup);
  dates.push(isoDateValue);
}

// Check location coordinates
function checkLocationCoordinates(...inputs) {
  return inputs.length !== 2 || inputs.every((inp) => isFinite(inp));
}

// ------------------ Send Request -----------

async function handleAsync(route, inputs, method) {
  try {
    const res = await fetch(`/api/v1/tours/${route}`, {
      method: method,
      body: inputs,
    });
    const data = await res.json();
    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    if (data.status === "success") {
      formMessage(
        tourForm,
        ["success", "open"],
        "Updated data successfully!!!",
        false
      );

      window.setTimeout(() => {
        location.assign("/account/admin-tours");
      }, 6000);
    }
  } catch (err) {
    formMessage(tourForm, ["open"], err.message, false);
  }
}

export function handleTourSubmit(e) {
  e.preventDefault();

  // Locations
  const descriptions = locationInputs("form__input--description");
  const coordinates = locationInputs("form__input--coordinates");
  const days = locationInputs("form__input--day");

  if (
    descriptions.length !== coordinates.length ||
    descriptions.length !== days.length ||
    coordinates.length !== days.length
  ) {
    formMessage(
      tourForm,
      ["open"],
      "Please specify location values correctly!!!",
      false
    );
    return;
  }

  // Check Location coordinates
  coordinates.forEach((coord) => {
    if (!checkLocationCoordinates(coord)) {
      formMessage(
        tourForm,
        ["open"],
        "Please specify location coordinates correctly!!!",
        false
      );
      return;
    }
  });

  const locationsArray = descriptions.map((item, i) => {
    return {
      type: "Point",
      description: item,
      coordinates: [
        +coordinates[i].split(",")[0],
        +coordinates[i].split(",")[1],
      ],
      day: days[i],
    };
  });

  // Start Location
  const startDescription = document.getElementById("startDescription").value;
  const startAddress = document.getElementById("startAddress").value;
  const startCoordinates = document.getElementById("startCoordinates").value;

  // Check start location values
  if (!startAddress || !startDescription || !startCoordinates) {
    formMessage(
      tourForm,
      ["open"],
      "Please specify startlocation values correctly!!!",
      false
    );
    return;
  }

  // Start Location coordinates check

  if (!checkLocationCoordinates(startCoordinates.split(","))) {
    formMessage(
      tourForm,
      ["open"],
      "Please specify startLocation coordinates like placeholder!!!",
      false
    );
    return;
  }

  const startLocation = {
    type: "Point",
    description: startDescription,
    address: startAddress,
    coordinates: startCoordinates
      ? [+startCoordinates.split(",")[0], +startCoordinates.split(",")[1]]
      : [],
  };

  // Other Inputs
  const name = document.getElementById("name").value;
  const duration = document.getElementById("duration").value;
  const maxGroupSize = document.getElementById("maxGroupSize").value;
  const difficulty = document.getElementById("difficulty").value;
  const price = document.getElementById("price").value;
  const summary = document.getElementById("summary").value;
  const description = document.getElementById("description").value;
  const coverImage = document.getElementById("cover").files[0];

  // Check duration === day locations total
  if (days.reduce((acc, el) => acc + Number(el), 0) !== +duration) {
    formMessage(
      tourForm,
      ["open"],
      "Duration and total locations day must be equal",
      false
    );
    return;
  }

  // Create Form Data
  const inputs = new FormData();
  if (name) inputs.append("name", name);
  if (
    startLocation.address &&
    startLocation.description &&
    startLocation.coordinates
  )
    inputs.append("startLocation", JSON.stringify(startLocation));
  if (duration) inputs.append("duration", duration);
  if (maxGroupSize) inputs.append("maxGroupSize", maxGroupSize);
  if (difficulty) inputs.append("difficulty", difficulty);
  if (price) inputs.append("price", price);
  if (description) inputs.append("description", description);
  if (summary) inputs.append("summary", summary);
  if (coverImage) inputs.append("imageCover", coverImage);
  if (locationsArray.length > 0)
    inputs.append("locations", JSON.stringify(locationsArray));
  if (guides.length > 0) inputs.append("guides", JSON.stringify(guides));

  dates.forEach((el) => {
    inputs.append("startDates", el);
  });
  Object.values(document.getElementById("photos").files).forEach((el) => {
    inputs.append("images", el);
  });

  if (e.target.id === "create tour") {
    // Create Tour
    handleAsync("", inputs, "POST");
  } else {
    // Update Tour
    handleAsync(e.target.dataset.id, inputs, "PATCH");
  }
}

// Delete tour
export async function handleDeleteTour(e) {
  e.preventDefault();
  const tourId = e.target.dataset.id;
  try {
    const res = await fetch(`/api/v1/tours/${tourId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    if (data.status === "success") {
      alert("Successfully delete tour");

      window.setTimeout(() => {
        location.assign("/account/admin-tours");
      }, 6000);
    }
  } catch (err) {
    alert(err.message);
  }
}
