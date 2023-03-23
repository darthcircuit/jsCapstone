const loginData = {
  email: "john@devpipeline.com",
  password: "password",
};

const stringifiedLogin = JSON.stringify(loginData);

const getUsers = async () =>
  fetch("https://devpipeline-mock-api.onrender.com/api/auth/login", {
    method: "POST",
    body: stringifiedLogin,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.users;
    })
    .catch((err) => console.error(err));

const renderUsers = async () => {
  const users = await getUsers();

  const sidebar = document.getElementById("sidebar");
  users.forEach((n) => {
    const nameWrapper = document.createElement("div");
    nameWrapper.className = "name-wrapper";

    const nameDiv = document.createElement("div");
    nameDiv.className = "name";
    const renderedName = `${n.first_name[0].toUpperCase()}${n.first_name.slice(
      1
    )} ${n.last_name[0].toUpperCase()}.`;

    nameText = document.createTextNode(renderedName);

    nameDiv.appendChild(nameText);
    nameWrapper.appendChild(nameDiv);
    sidebar.appendChild(nameWrapper);

    const buttonWrapper = document.createElement("div");
    buttonWrapper.className = "button-wrapper";

    const minusWeight = document.createElement("button");
    minusWeight.appendChild(document.createTextNode("-1"));

    const plusWeight = document.createElement("button");
    plusWeight.appendChild(document.createTextNode("+1"));

    const count = document.createElement("span");
    count.id = `${n._id}`;
    count.className = "count";

    count.appendChild(document.createTextNode("1"));

    buttonWrapper.appendChild(minusWeight);
    buttonWrapper.appendChild(count);
    buttonWrapper.appendChild(plusWeight);

    nameWrapper.appendChild(buttonWrapper);
  });
};

renderUsers();
// const cacheUsers = () => {
//   writeTextFile("../localStore/users.json", JSON.stringify(users));
// };

/* 

Structure of Names Wrapper to build:

<div class="names-wrapper">
  <div class="name">Name 1</div>

  <div class="button-wrapper">
    <button>-1</button>
    <span id="count">0</span>
    <button>+1</button>
  </div>
  
</div>

*/

// for (let user in users) {
//   console.log(user);
// }
