const createButton = document.querySelector("#create-button");
const createDialog = document.querySelector("#create-dialog");
const closeDialog = document.querySelector("#close-dialog");

createButton.addEventListener("click", () => {
  createDialog.showModal();
});

closeDialog.addEventListener("click", () => {
  createDialog.close();
});
