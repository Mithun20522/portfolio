window.addEventListener("load", () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".home-section").classList.add("active");
  // page loader
  document.querySelector(".page-loader").classList.add("fade-out");

  setTimeout(() => {
    document.querySelector(".page-loader").style.display = "none";
  }, 950);
});

// navbar toggler
const navToggler = document.querySelector(".nav-toggler");

navToggler.addEventListener("click", () => {
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});

function hideSection() {
  document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar() {
  document.querySelector(".header").classList.toggle("active");
}

// Active Section
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    //activate the overlay to prevent multiple clicks
    document.querySelector(".overlay").classList.add("active");
    navToggler.classList.add("hide");
    if (e.target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }
    setTimeout(() => {
      document
        .querySelector("section.active")
        .classList.remove("active", "fade-out");

      document.querySelector(e.target.hash).classList.add("active");

      window.scrollTo(0, 0);

      document.body.classList.remove("hide-scrolling");

      navToggler.classList.remove("hide");

      document.querySelector(".overlay").classList.remove("active");
    }, 500);
  }
});

// Active tabs
const tabsContainer = document.querySelector(".about-tabs"),
  aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("tab-item") &&
    !e.target.classList.contains("active")
  ) {
    tabsContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    const target = e.target.getAttribute("data-target");
    aboutSection
      .querySelector(".tab-content.active")
      .classList.remove("active");

    aboutSection.querySelector(target).classList.add("active");
  }
});

// portfolio item details popup
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-project-btn")) {
    togglePortfolioPopup();

    document.querySelector(".portfolio-popup").scrollTo(0, 0);

    portfolioItemsDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main").classList.toggle("fade-out");
}

document
  .querySelector(".pp-close")
  .addEventListener("click", togglePortfolioPopup);

//   hide popup when clicking outside X sign

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pp-inner")) {
    togglePortfolioPopup();
  }
});

function portfolioItemsDetails(portfolioItem) {
  document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(
    ".portfolio-item-thumbnail img"
  ).src;

  document.querySelector(".pp-header h3").innerHTML =
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(
    ".portfolio-item-details"
  ).innerHTML;
}

// contact me functionality
function sendMail() {
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userMessage = document.getElementById("userMessage");
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (
    userName.value === "" ||
    userEmail.value === "" ||
    userMessage.value === ""
  ) {
    alert("All fields are mandatory!");
    return;
  }
  const templateParams = {
    userName: userName.value,
    userEmail: userEmail.value,
    userMessage: userMessage.value,
  };

  emailjs.send("service_bmjlncn", "template_17xeoah", templateParams).then(
    function (response) {
      alert("Message Sent!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );

  userName.value = "";
  userEmail.value = "";
  userMessage.value = "";
}
const btn = document.getElementById("submitBtn");
btn.addEventListener("click", sendMail);
