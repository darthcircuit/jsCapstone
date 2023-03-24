const loginData = {
  email: "john@devpipeline.com",
  password: "password",
};

const stringifiedLogin = JSON.stringify(loginData);

const allUsers = [];

const fetchRemoteUsers = async () =>
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

const renderAllUsers = async () => {
  const users = await fetchRemoteUsers();

  users.forEach((user) => {
    allUsers.push(user);
    renderUser(user);
  });
};

const renderUser = (u) => {
  const existingName = document.getElementById(`${u._id}`);

  const sidebar = document.getElementById("sidebar");

  u.weight = u.weight >= 0 ? u.weight : 1;

  const nameWrapper = document.createElement("div");
  nameWrapper.className = "name-wrapper";
  nameWrapper.id = `${u._id}`;

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";
  const renderedName = `${u.first_name[0].toUpperCase()}${u.first_name.slice(
    1
  )} ${u.last_name[0].toUpperCase()}.`;

  nameText = document.createTextNode(renderedName);

  nameDiv.appendChild(nameText);
  nameWrapper.appendChild(nameDiv);

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button-wrapper";

  const minusWeight = document.createElement("button");
  minusWeight.appendChild(document.createTextNode("-1"));
  minusWeight.addEventListener("click", (e) => {
    if (u.weight > 0) {
      e = updateWeight(u._id, -1);
    } else {
      u.weight = 0;
    }
  });

  const plusWeight = document.createElement("button");
  plusWeight.appendChild(document.createTextNode("+1"));
  plusWeight.addEventListener("click", (e) => {
    e = updateWeight(u._id, 1);
  });

  const count = document.createElement("span");
  count.className = "count";

  count.appendChild(document.createTextNode(`${u.weight}`));

  buttonWrapper.appendChild(minusWeight);
  buttonWrapper.appendChild(count);
  buttonWrapper.appendChild(plusWeight);

  nameWrapper.appendChild(buttonWrapper);

  // console.log(`Existing Name: ${existingName}`);

  if (existingName) {
    // existingName.className = "name-wrapper";
    // existingName.id = `${u._id}`;
    existingName.replaceWith(nameWrapper);
  } else {
    sidebar.appendChild(nameWrapper);
  }
};

async function getUserByID(id) {
  for (user of allUsers) {
    if (user._id === id) {
      return user;
    }
  }
}

async function updateWeight(id, updateValue) {
  const userObj = await getUserByID(id);
  userObj.weight += updateValue;
  renderUser(userObj);
}

renderAllUsers();
// updateWeight("6418c21ae0d2fe0f4f6dd5d2", -26);
