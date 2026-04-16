// Smooth Scroll for Navbar Items
document.querySelectorAll(".navbar-item-a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  });
});

// Smooth Scroll for Home Link
document
  .querySelector(".navbar-item-a-first")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  });

// Home Carousel
const homeImages = document.querySelectorAll(".home-pic");
const homeIndicators = document.querySelectorAll(".indicator");
const homeCarouselWrapper = document.querySelector(".carousel-images");
let homeIndex = 0;
let homeAutoSlide;

function updateHomeCarousel() {
  homeCarouselWrapper.style.transform = `translateX(${-homeIndex * 100}%)`;

  homeIndicators.forEach((indicator, idx) => {
    indicator.classList.toggle("active", idx === homeIndex);
  });
}

function startHomeAutoSlide() {
  homeAutoSlide = setInterval(() => {
    homeIndex = (homeIndex + 1) % homeImages.length;
    updateHomeCarousel();
  }, 3000);
}

function resetHomeAutoSlide() {
  clearInterval(homeAutoSlide);
  startHomeAutoSlide();
}

document.querySelector(".left-arrow").addEventListener("click", () => {
  clearInterval(homeAutoSlide);
  homeIndex = (homeIndex - 1 + homeImages.length) % homeImages.length;
  updateHomeCarousel();
  resetHomeAutoSlide();
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  clearInterval(homeAutoSlide);
  homeIndex = (homeIndex + 1) % homeImages.length;
  updateHomeCarousel();
  resetHomeAutoSlide();
});

homeIndicators.forEach((indicator, idx) => {
  indicator.addEventListener("click", () => {
    clearInterval(homeAutoSlide);
    homeIndex = idx;
    updateHomeCarousel();
    resetHomeAutoSlide();
  });
});

// Initialize Home Carousel
startHomeAutoSlide();

// Project Carousel
const projectCarousel = document.querySelector("#project-carousel");
const projectWrapper = projectCarousel.querySelector(".carousel-wrapper");
const projectSlides = projectCarousel.querySelectorAll(".carousel-slide");
const projectDotsContainer = projectCarousel.querySelector(".carousel-dots");
let projectIndex = 0;
let projectAutoSlide;

// Create Dots for Project Carousel
projectSlides.forEach((_, idx) => {
  const dot = document.createElement("div");
  dot.dataset.index = idx;
  dot.className = "carousel-dot";
  dot.addEventListener("click", () => {
    projectIndex = idx;
    updateProjectCarousel();
    resetProjectAutoSlide();
  });
  projectDotsContainer.appendChild(dot);
});

function updateProjectCarousel() {
  projectWrapper.style.transform = `translateX(-${projectIndex * 100}%)`;
  updateProjectDots();
}

function updateProjectDots() {
  const dots = projectDotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("dot-active", idx === projectIndex);
  });
}

function startProjectAutoSlide() {
  projectAutoSlide = setInterval(() => {
    projectIndex = (projectIndex + 1) % projectSlides.length;
    updateProjectCarousel();
  }, 5000);
}

function resetProjectAutoSlide() {
  clearInterval(projectAutoSlide);
  startProjectAutoSlide();
}

// Initialize Project Carousel
updateProjectCarousel();
startProjectAutoSlide();

/// Wait until the page is loaded to ensure everything is initialized
document.addEventListener("DOMContentLoaded", function () {
  // Get elements for appointment, login, and register pop-ups
  const popupForm = document.getElementById("appointment-popup");
  const loginPopup = document.getElementById("login-popup");
  const registerPopup = document.getElementById("register-popup");

  const postButton = document.getElementById("post-button");
  const closePopup = document.getElementById("close-popup");

  const loginBtn = document.querySelector(".search-bar button"); // Assuming the Login button is inside the search-bar div
  const closeLoginPopup = document.getElementById("close-login-popup");

  const registerBtn = document.querySelector(".register-link"); // Assuming the Register button or link is correctly defined
  const closeRegisterPopup = document.getElementById("close-register-popup");

  // Ensure popups are initially hidden
  popupForm.style.display = "none";
  loginPopup.style.display = "none";
  registerPopup.style.display = "none";

  // Placeholder: Replace with actual login status check
  const isLoggedIn = false; // Example: Set this dynamically based on your app's logic

  // Pop-up Appointment form or redirect to login
  postButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (isLoggedIn) {
      popupForm.style.display = "flex"; // Show the pop-up if logged in
    } else {
      alert("You need to log in first to make an appointment."); // Optional alert
      loginPopup.style.display = "flex"; // Redirect to login pop-up
    }
  });

  // Close pop-up on close button click for appointment
  closePopup.addEventListener("click", function () {
    popupForm.style.display = "none"; // Hide the pop-up on close button click
  });

  // Close pop-up when clicking outside the form for appointment
  window.addEventListener("click", function (e) {
    if (e.target === popupForm) {
      popupForm.style.display = "none"; // Hide if clicked outside
    }
  });

  // Pop-up Login form
  loginBtn.addEventListener("click", () => {
    loginPopup.style.display = "flex"; // Show login pop-up
  });

  // Close the login pop-up when close button (X) is clicked
  closeLoginPopup.addEventListener("click", () => {
    loginPopup.style.display = "none"; // Hide the login pop-up
  });

  // Close login pop-up when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === loginPopup) {
      loginPopup.style.display = "none"; // Hide if clicked outside
    }
  });

  // Pop-up Register form
  registerBtn.addEventListener("click", () => {
    registerPopup.style.display = "flex"; // Show register pop-up
  });

  // Close the register pop-up when close button (X) is clicked
  closeRegisterPopup.addEventListener("click", () => {
    registerPopup.style.display = "none"; // Hide register pop-up
  });

  // Close register pop-up when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === registerPopup) {
      registerPopup.style.display = "none"; // Hide if clicked outside
    }
  });
});


// location feature for register form
const username = "lamuelbapilar";
window.onload = function () {
  loadRegions();
};

async function loadRegions() {
  const regionSelect = document.getElementById("region");

  try {
    const response = await fetch(
      `http://api.geonames.org/childrenJSON?geonameId=1694008&username=${username}`
    );
    const regions = await response.json();
    console.log("Regions fetched: ", regions);

    regions.geonames.forEach((region) => {
      let option = document.createElement("option");
      option.value = region.geonameId;
      option.text = region.name;
      regionSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching regions: ", error);
  }
}

async function loadProvinces() {
  const regionId = document.getElementById("region").value;
  const provinceSelect = document.getElementById("province");
  provinceSelect.innerHTML =
    '<option value="" disabled selected>Select Province</option>';

  try {
    const response = await fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${regionId}&username=${username}`
    );
    const provinces = await response.json();
    console.log("Provinces fetched: ", provinces);

    provinces.geonames.forEach((province) => {
      let option = document.createElement("option");
      option.value = province.geonameId;
      option.text = province.name;
      provinceSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching provinces: ", error);
  }
}

async function loadCities() {
  const provinceId = document.getElementById("province").value;
  const citySelect = document.getElementById("city");
  citySelect.innerHTML =
    '<option value="" disabled selected>Select City</option>';

  try {
    const response = await fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${provinceId}&username=${username}`
    );
    const cities = await response.json();
    console.log("Cities fetched: ", cities);

    cities.geonames.forEach((city) => {
      let option = document.createElement("option");
      option.value = city.geonameId;
      option.text = city.name;
      citySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching cities: ", error);
  }
}

async function loadBarangays() {
  const cityId = document.getElementById("city").value;
  const barangaySelect = document.getElementById("barangay");
  barangaySelect.innerHTML =
    '<option value="" disabled selected>Select Barangay</option>';

  try {
    const response = await fetch(
      `http://api.geonames.org/childrenJSON?geonameId=${cityId}&username=${username}`
    );
    const barangays = await response.json();
    console.log("Barangays fetched: ", barangays);

    barangays.geonames.forEach((barangay) => {
      let option = document.createElement("option");
      option.value = barangay.geonameId;
      option.text = barangay.name;
      barangaySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching barangays: ", error);
  }
}

//Form Pop-up

function showLinksPopup() {
  const linksContainer = document.getElementById("linksContainer");

  // Clear any existing buttons in the links container
  linksContainer.innerHTML = "";

  // Define static links for the library
  const links = [
    {
      label: "Amendment Form",
      url: "https://bplo.marikina.gov.ph/downloadable%20forms/AMMENDMENT%20FORM%201731557045.docx",
    },
    {
      label: "Business Permit Form",
      url: "https://bplo.marikina.gov.ph/downloadable%20forms/BUSINESS%20PERMIT%20APPLICATION%20FORM%201731557070.docx",
    },
    {
      label: "Contractor Form",
      url: "https://bplo.marikina.gov.ph/downloadable%20forms/CONTRACTOR%20FORM%201731557113.docx",
    },
    {
      label: "Special Permit Form",
      url: "https://bplo.marikina.gov.ph/downloadable%20forms/SPECIAL%20PERMIT%20FORM%201731557191.docx",
    },
    {
      label: "Retirement Form",
      url: "https://bplo.marikina.gov.ph/downloadable%20forms/RETIREMENT%20FORM%201731557166.docx",
    },
  ];

  // Generate buttons dynamically for each link
  links.forEach((link) => {
    const button = document.createElement("button");
    button.classList.add("link-button");
    button.textContent = link.label;
    button.onclick = () => window.open(link.url, "_blank");
    linksContainer.appendChild(button);
  });

  // Show the popup
  document.getElementById("popupForm").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}
