// ------------------ Form Message -------------------
export function formMessage(formName, classNameList, msg, reload) {
  const timeout = classNameList.includes("success") ? 3000 : 5000;
  const formError = formName.querySelector(".form__error");
  formError.innerHTML = msg;
  formError.classList.add(...classNameList);

  window.setTimeout(() => {
    formError.innerHTML = "";
    formError.classList.remove(...classNameList);
    if (reload) location.reload(true);
  }, timeout);
}
