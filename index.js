const userData = {
  user: [
    {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    },
    {
      id: 2,
      email: "janet.weaver@reqres.in",
      first_name: "Janet",
      last_name: "Weaver",
      avatar: "https://reqres.in/img/faces/2-image.jpg",
    },
    {
      id: 3,
      email: "emma.wong@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "https://reqres.in/img/faces/3-image.jpg",
    },
    {
      id: 4,
      email: "eve.holt@reqres.in",
      first_name: "Eve",
      last_name: "Holt",
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    },
    {
      id: 5,
      email: "charles.morris@reqres.in",
      first_name: "Charles",
      last_name: "Morris",
      avatar: "https://reqres.in/img/faces/5-image.jpg",
    },
    {
      id: 6,
      email: "tracey.ramos@reqres.in",
      first_name: "Tracey",
      last_name: "Ramos",
      avatar: "https://reqres.in/img/faces/6-image.jpg",
    },
    {
      id: 7,
      email: "michael.lawson@reqres.in",
      first_name: "Michael",
      last_name: "Lawson",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
    },
    {
      id: 8,
      email: "lindsay.ferguson@reqres.in",
      first_name: "Lindsay",
      last_name: "Ferguson",
      avatar: "https://reqres.in/img/faces/8-image.jpg",
    },
    {
      id: 9,
      email: "tobias.funke@reqres.in",
      first_name: "Tobias",
      last_name: "Funke",
      avatar: "https://reqres.in/img/faces/9-image.jpg",
    },
    {
      id: 10,
      email: "byron.fields@reqres.in",
      first_name: "Byron",
      last_name: "Fields",
      avatar: "https://reqres.in/img/faces/10-image.jpg",
    },
    {
      id: 11,
      email: "george.edwards@reqres.in",
      first_name: "George",
      last_name: "Edwards",
      avatar: "https://reqres.in/img/faces/11-image.jpg",
    },
    {
      id: 12,
      email: "rachel.howell@reqres.in",
      first_name: "Rachel",
      last_name: "Howell",
      avatar: "https://reqres.in/img/faces/12-image.jpg",
    },
    {
      id: 13,
      email: "shelby.peters@reqres.in",
      first_name: "Tracey",
      last_name: "Ramos",
      avatar: "",
    },
    {
      id: 14,
      email: "bruce.jones@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "",
    },
    {
      id: 15,
      email: "victoria.wilson@reqres.in",
      first_name: "Victoria",
      last_name: "Wilson",
      avatar: "",
    },
    {
      id: 16,
      email: "john.smith@reqres.in",
      first_name: "John",
      last_name: "Smith",
      avatar: "",
    },
    {
      id: 17,
      email: "sarah.doe@reqres.in",
      first_name: "Sarah",
      last_name: "Doe",
      avatar: "",
    },
    {
      id: 18,
      email: "daniel.brown@reqres.in",
      first_name: "Daniel",
      last_name: "Brown",
      avatar: "",
    },
    {
      id: 19,
      email: "linda.johnson@reqres.in",
      first_name: "Linda",
      last_name: "Johnson",
      avatar: "",
    },
    {
      id: 20,
      email: "william.williams@reqres.in",
      first_name: "William",
      last_name: "Williams",
      avatar: "",
    },
    {
      id: 21,
      email: "susan.brown@reqres.in",
      first_name: "Susan",
      last_name: "Brown",
      avatar: "",
    },
    {
      id: 22,
      email: "james.davis@reqres.in",
      first_name: "James",
      last_name: "Davis",
      avatar: "",
    },
    {
      id: 23,
      email: "patricia.jackson@reqres.in",
      first_name: "Patricia",
      last_name: "Jackson",
      avatar: "",
    },
    {
      id: 24,
      email: "robert.smith@reqres.in",
      first_name: "Emma",
      last_name: "Wong",
      avatar: "",
    },
    {
      id: 25,
      email: "john.smith@reqres.in",
      first_name: "John",
      last_name: "Smith",
      avatar: "",
    },
    {
      id: 26,
      email: "john.smith@reqres.in",
      first_name: "John",
      last_name: "Smith",
      avatar: "",
    },
    {
      id: 27,
      email: "john.smith@reqres.in",
      first_name: "John",
      last_name: "Smith",
      avatar: "",
    },
    {
      id: 28,
      email: "john.smith@reqres.in",
      first_name: "John",
      last_name: "Smith",
      avatar: "",
    },
  ],
};

const profileContainer = document.getElementById("profileContainer");
const userDropdown = document.getElementById("userDropdown");
const usersPerPage = 3;
let currentPage = 1;

const allUsers = userData.user;
let filteredUsers = [];

function createProfileCard(user) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("profile-card");

  const profileImage = document.createElement("img");
  profileImage.src = user.avatar;
  profileImage.alt = `${user.first_name} ${user.last_name}`;
  profileImage.classList.add("profile-image");

  const userDetails = document.createElement("div");
  userDetails.classList.add("user-details");
  userDetails.innerHTML = `
        <p>ID: ${user.id}</p>
        <p>Name: ${user.first_name} ${user.last_name}</p>
        <p>Email: ${user.email}</p>
        `;

  profileCard.appendChild(profileImage);
  profileCard.appendChild(userDetails);

  return profileCard;
}

const totalUsers = userData.user.length;
const totalPages = Math.ceil(totalUsers / usersPerPage);
const pagination = document.getElementById("pagination");

function createPaginationButtons(totalPages) {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.id = `page-${i}`;
    button.addEventListener("click", () => {
      currentPage = i;
      displayPage(currentPage);
    });
    pagination.appendChild(button);
  }
}

function filterUsersByFullName(firstName, lastName) {
  filteredUsers = allUsers.filter(
    (user) => user.first_name === firstName && user.last_name === lastName
  );
}

// Create dropdown filter by name on select it should only show these names

function updateDropdown() {
  userDropdown.innerHTML = '<option value="">Select User</option>';
  const uniqueNames = {};

  userData.user.forEach((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    if (!uniqueNames[fullName]) {
      uniqueNames[fullName] = user.id;

      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = fullName;
      userDropdown.appendChild(option);
    }
  });
}

userDropdown.addEventListener("change", () => {
  const selectedUserId = userDropdown.value;
  if (selectedUserId === "") {
    filteredUsers = allUsers;
  } else {
    const selectedUser = allUsers.find(
      (user) => user.id === parseInt(selectedUserId, 10)
    );
    if (selectedUser) {
      const firstName = selectedUser.first_name;
      const lastName = selectedUser.last_name;
      filterUsersByFullName(firstName, lastName);
    }
  }
  const filteredPages = Math.ceil(filteredUsers.length / usersPerPage);
  createPaginationButtons(filteredPages);

  // console.log("filtr", filteredPages);

  displayPage(currentPage);
});

function displayPage(page) {
  profileContainer.innerHTML = "";
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

  usersToDisplay.forEach((user) => {
    const profileCard = createProfileCard(user);
    profileContainer.appendChild(profileCard);
  });

  if (filteredUsers.length <= usersPerPage) {
    pagination.style.display = "none";
  } else {
    pagination.style.display = "block";
  }
}

filteredUsers = allUsers;
createPaginationButtons(Math.ceil(allUsers.length / usersPerPage));
displayPage(currentPage);
updateDropdown();
