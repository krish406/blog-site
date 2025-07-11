const createButton = document.querySelector("#create-button");
console.log(createButton);
const createDialog = document.querySelector("#create-dialog");

createButton.addEventListener("click", () => {
  console.log("heheh");
  createDialog.showModal();
});

// Close dialog functionality
const closeDialog = document.querySelector("#close-dialog");
closeDialog.addEventListener("click", () => {
  createDialog.close();
});
