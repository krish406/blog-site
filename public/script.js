const createButton = document.querySelector("#create-button");
const createDialog = document.querySelector("#create-dialog");
const closeDialog = document.querySelector("#close-dialog");

const editButton = document.querySelectorAll(".edit-button");
const editDialog = document.querySelector("#edit-dialog");
const closeEditDialog = document.querySelector("#close-edit-dialog");
const submitEditDialog = document.querySelector("#submit-edits");

createButton.addEventListener("click", () => {
  createDialog.showModal();
});

closeDialog.addEventListener("click", () => {
  createDialog.close();
});

let getBlog = async function (id) {
  const url = `/load-edit/${id}`;
  let response = await fetch(url);
  let obj = await response.json();
  return obj;
};

editButton.forEach((button) => {
  button.addEventListener("click", () => {
    editDialog.showModal();
    let blogObj = getBlog(button.dataset.id);
    blogObj.then((result) => {
      editDialog.querySelector("input[name='post-title']").value = result.title;
      editDialog.querySelector("textarea[name='post-content']").value = result.content;
      editDialog.setAttribute("currentID", button.dataset.id);
    })
  });
});

submitEditDialog.addEventListener("click", (e) => {
  e.preventDefault();
  const ID = editDialog.getAttribute("currentID");
  console.log(ID);
});

closeEditDialog.addEventListener("click", (e) => {
  e.preventDefault();
  editDialog.close();
});
