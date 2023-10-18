const profileContainer = document.getElementById("profileContainer");
const previousButton = document.getElementById("page-1");
const nextButton = document.getElementById("page-2");
let currentPage = 1;

async function fetchData(page) {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data");
    return null;
  }
}

function createProfileCard(profile) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("profile-card");

  const profileImage = document.createElement("img");
  profileImage.src = profile.avatar;
  profileImage.alt = `${profile.first_name} ${profile.last_name}`;
  profileImage.classList.add("profile-image");

  const userDetails = document.createElement("div");
  userDetails.classList.add("user-details");
  userDetails.innerHTML = `
        <p>ID: ${profile.id}</p>
        <p>Name: ${profile.first_name} ${profile.last_name}</p>
        <p>Email: ${profile.email}</p>
    `;

  profileCard.appendChild(profileImage);
  profileCard.appendChild(userDetails);

  return profileCard;
}

async function displayPage(page) {
  const data = await fetchData(page);
  if (data) {
    profileContainer.innerHTML = "";
    data.data.forEach((user) => {
      const profileCard = createProfileCard(user);
      profileContainer.appendChild(profileCard);
    });
    // updatePagination(data)
    
    if (currentPage === 1) {
      previousButton.setAttribute("disabled", true);
    } else {
      previousButton.removeAttribute("disabled");
    }
    
    userDropdown.addEventListener("change", () => {
      const selectedUserId = userDropdown.value;
      filterProfiles(selectedUserId, page);
      console.log(selectedUserId)
      const filteredUsers = data.data.filter(
        (user) => user.id == selectedUserId
      );
      // console.log(filteredUsers.length);
      if (filteredUsers.length) {
        previousButton.style.display = "none";
        nextButton.style.display = "none";
      } else {
        previousButton.style.display = "block";
        nextButton.style.display = "block";
      }
    });
  }
}

nextButton.addEventListener("click", async () => {
  if (currentPage < 2) {
    currentPage++;
    displayPage(currentPage);
    fetchUsers(currentPage);
    previousButton.removeAttribute("disabled");
    if (currentPage === 2) {
      nextButton.setAttribute("disabled", true);
    }
  }
});

previousButton.addEventListener("click", async () => {
 if (currentPage > 1) {
    currentPage--
    displayPage(currentPage);
    fetchUsers(currentPage);
    nextButton.removeAttribute("disabled");
    if (currentPage === 1) {
      previousButton.setAttribute("disabled", true);
    }
  }
});

displayPage(currentPage);

// Create dropdown filter by name on select it should only show these names

const userDropdown = document.getElementById("userDropdown");
let data;

async function fetchData(page) {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`);
    const userData = await response.json();
    data = userData;
    return userData;
  } catch (error) {
    console.error("Error fetching data");
    return null;
  }
}

function fetchUsers(page) {
  fetch(`https://reqres.in/api/users?page=${page}`)
    .then((response) => response.json())
    .then((userData) => {
      data = userData;
      userDropdown.innerHTML = '<option value="All">All</option>';
      data.data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.text = `${user.first_name} ${user.last_name}`;
        userDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

fetchUsers();

// Function to filter and display user profiles based on the selected option in the dropdown
async function filterProfiles(selectedUserId, page) {
  profileContainer.innerHTML = "";

  if (selectedUserId === "All") {
    displayPage(page);
  } else {
    const selectedUser = data.data.find(
      (user) => user.id === parseInt(selectedUserId, 10)
    );

    if (selectedUser) {
      const profileCard = createProfileCard(selectedUser);
      profileContainer.appendChild(profileCard);
    }
  }
}

/* function updatePagination(data){
  const filteredUsers = data.data.length;
  if(filteredUsers < 6) {
    previousButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    previousButton.style.display = "block";
    nextButton.style.display = "block";
  }
} */

/* userDropdown.addEventListener("change", () => {
  const selectedUserId = userDropdown.value;
  filterProfiles(selectedUserId, currentPage);
}); */
