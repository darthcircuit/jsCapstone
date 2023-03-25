const randInt = (topNum) => Math.floor(Math.random() * topNum);

const loginData = {
  email: "john@devpipeline.com",
  password: "password",
};

const stringifiedLogin = JSON.stringify(loginData);

const allUsers = [];
const wheelNames = [];
let lastWinner;

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

  u.renderedName = renderedName;
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

  populateWheel();
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

function* wheelNamesGen(numSpins) {
  let i = randInt(wheelNames.length);
  if (this.done) {
    // this.done = false;
    return wheelNames.splice(i, 1)[0];
  }
  while (true) {
    if (i < wheelNames.length) {
      yield wheelNames[i];
    } else {
      i = 0;
      yield wheelNames[i];
    }
  }
}

const populateWheel = async () => {
  wheelNames.length = 0;

  allUsers.forEach((u) => {
    if (u.weight > 0) {
      for (let i = 1; i <= u.weight; i++) {
        // wheelNames.push(`${u.renderedName}`);
        wheelNames.push(u);
      }
    }
  });
};

function spinWheel() {
  const numWheelSpins = randInt(20);
  console.log(wheelNames);
  const domWinner = document.getElementById("winner");
  let chosenName;
  for (let i = 1; i <= numWheelSpins; i++) {
    // wheelNamesGen(numWheelSpins).next();
    chosenName = wheelNamesGen(numWheelSpins).next();
    console.log(chosenName);
  }
  console.log(wheelNames);
  chosenName.done = true;
  const winner = wheelNamesGen().next();
  console.log(winner);

  domWinner.textContent = winner.value.renderedName;
}

// const randChoicePop = (iter) => iter[Math.floor(Math.random() * iter.length)];
// chosenName = randChoicePop(wheelNames);

renderAllUsers();
// updateWeight("6418c21ae0d2fe0f4f6dd5d2", -26);

const spinnerButton = document.getElementById("spinner-button");
spinnerButton.addEventListener("click", spinWheel);
