const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "";
// messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageTwo.textContent = "Loading...";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      // console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageTwo.textContent = data.forecast;
        messageOne.textContent = data.location;
      }
    });
  });
});
