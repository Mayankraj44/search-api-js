import "./styles.css";
const api = `https://randomuser.me/api`;
const addUser = document.getElementById("add-btn");
const mainApp = document.getElementById("app");
const userList = document.getElementById("userlist");
const searchfilter = document.getElementById("search");
const sortDesc = document.getElementById("sort-desc");
const sortAsc = document.getElementById("sort-asc");
const appState = [];

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();

  const user = userJson.results[0];
  const newUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(newUser);
  console.log(appState);
  domRender(appState);
});

const domRender = (stateArray) => {
  userList.innerHTML = "";
  stateArray.forEach((obj) => {
    const userEle = document.createElement("div");
    userEle.innerHTML = `<div>
  Name :${obj.title} ${obj.name}  
  <ol>
  <li>${obj.gender}</li>
  <li>${obj.email}</li>
  </ol>
  </div>`;
    userList.appendChild(userEle);
  });
};

searchfilter.addEventListener("keyup", (e) => {
  // console.log(e);
  const filterArray = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchfilter.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchfilter.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchfilter.value.toLowerCase())
  );
  domRender(filterArray);
});
class User {
  constructor(title, fname, lname, gender, email) {
    this.title = title;
    this.name = `${fname} ${lname}`;
    this.gender = gender;
    this.email = email;
  }
}

sortDesc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
  domRender(appStateCopy);
});

sortAsc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
  domRender(appStateCopy);
});
