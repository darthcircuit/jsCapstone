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

async function spinWheel() {
  const numWheelSpins = randInt(25) + 1;

  let currentIter = 0;
  let winnerIndex = randInt(wheelNames.length);
  let winnerId;
  const domWinner = document.getElementById("winner");

  const startWheel = setInterval(() => {
    currentIter += 1;
    console.log(`Current Spin: ${currentIter}`);
    console.log(`Supposed Total Spins: ${numWheelSpins}`);

    console.log(wheelNames);

    console.log(winnerIndex);

    const winner = wheelNames[winnerIndex];
    domWinner.textContent = winner.renderedName;

    if (currentIter === numWheelSpins) {
      clearInterval(startWheel);
      wheelNames.splice(winnerIndex, 1);
      winnerId = winner._id;
      return;
    } else if (wheelNames.length <= 1) {
      populateWheel();
    }

    winnerIndex = randInt(wheelNames.length);
  }, 100);
  return winnerId;
}

renderAllUsers();

const findWinner = async () => {
  const winnerId = await spinWheel();
  console.log(winnerId);
};
const spinnerButton = document.getElementById("spinner-button");
spinnerButton.addEventListener("click", findWinner);
