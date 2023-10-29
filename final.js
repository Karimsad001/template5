// Toggling Sidebar And Spinning The Gear
let toggle = document.querySelector(".toggle i");
let sidebar = document.querySelector(".settings-box");
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  toggle.classList.toggle("fa-spin");
});
// Switching Randomly Background
let landing = document.querySelector(".landing");
let imgArray = ["01.png", "02.png", "03.png", "04.png", "05.png"];
// Random Background Option
let backgroundOption = true;
// variable to control interval
let backInterval;

// Define the randomizeImg function in the global scope
function randomizeImg() {
  if (backgroundOption === true) {
    backInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length) + 1;
      landing.style.backgroundImage = `url("imgs/0${randomNumber}.png")`;
      landing.style.transition = "0.3s";
    }, 1000);
  }
}

// Switch Backgrounds
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove the "now" class from all children
    e.target.parentElement.querySelectorAll(".now").forEach((el) => {
      el.classList.remove("now");
    });
    // Add the "now" class to the clicked span
    e.target.classList.add("now");
    if (e.target.dataset.back === "yes") {
      backgroundOption = true;
      // Call randomizeImg after defining it in the global scope
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Check In Local Storage If There Are Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove all active class from spans
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("now");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("now");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("now");
  }

  // Call randomizeImg after setting backgroundOption
  randomizeImg();
}

// Switch Colors

let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  // Remove now class from all childrens
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("now");
    // add now class on element with data-color === localstorage(mainColors)
    if (ele.dataset.color === mainColors) {
      ele.classList.add("now");
    }
  });
}
let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //Set color on root element
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Setting value in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove now class from all childrens
    e.target.parentElement.querySelectorAll(".now").forEach((el) => {
      el.classList.remove("now");
      // add now class on self
      e.target.classList.add("now");
    });
  });
});

// Select Skill Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  //window height
  let windowHeight = this.innerHeight;
  //window scroll top
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = `${skill.dataset.size}%`;
    });
  }
};

// Create Popup With the Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay element
    let overlay = document.createElement("div");
    //add class to overlay
    overlay.className = "popup-overlay";
    //append overlay to the body
    document.body.appendChild(overlay);
    //create popup box with image
    let popup = document.createElement("div");
    //add class to popup box
    popup.className = "popup-box";
    //create iamge
    let popupImg = document.createElement("img");
    //set img src
    popupImg.src = img.src;
    //append img to to popup
    popup.appendChild(popupImg);
    //append popup to the body
    document.body.appendChild(popup);

    if (img.alt !== null) {
      // Create heading
      let imgHeading = document.createElement('h3');
      // Create text for heading
      let imgText = document.createTextNode(img.alt); // Use document.createTextNode
      // Append text to the heading
      imgHeading.appendChild(imgText);
      // Append heading to the popup box
      popup.prepend(imgHeading);
    }
    //create close span
    let closeBtn = document.createElement('span');
    //create text for btn
    let x = document.createTextNode('x');
    //append text to btn
    closeBtn.appendChild(x)
    //add class to btn
    closeBtn.className = 'close';
    //append x to popup
    popup.appendChild(closeBtn);
  });
});
// close popup
document.addEventListener('click', function (e) {
  if (e.target.className === 'close') {
    //remove current popup
    e.target.parentNode.remove();
    //remove overlay
    this.documentElement.querySelector('.popup-overlay').remove();

  }
});

// Select all bullets
let bullets = document.querySelectorAll('.nav-bullets .bullet');
// Select all links
let links = document.querySelectorAll('.links a');
//function to scroll to the section selected
function scrollToSomeWhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener('click',(e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

scrollToSomeWhere(bullets);
scrollToSomeWhere(links);

function handleActive(ev) {
  //remove class now from all childrens
  ev.target.parentElement.querySelectorAll('.now').forEach(element => {
    element.classList.remove('now');
  });
  //add class now on itself
  ev.target.classList.add('now');
}

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullets_option');
if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove('now');
  });
  if(bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block';
  } else {
    bulletsContainer.style.display = 'none';
  }
}
bulletsSpan.forEach(span => {
  span.addEventListener('click', (e) => {
    if (span.dataset.display === 'yes') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets_option", 'block');
      document.querySelector('.bullets_option .yes').classList.add('now');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'none');
      document.querySelector('.bullets_option .no').classList.add('now');
    }
    
    // Remove the "now" class from all children of the parent container
    e.target.parentElement.querySelectorAll(".now").forEach((el) => {
      el.classList.remove("now");
    });
    
    // Add the "now" class to the clicked span
    span.classList.add("now");
  });
});

//reset options

document.querySelector('.reset-options').onclick = function() {
  localStorage.removeItem('bullets_option');
  localStorage.removeItem('color_option');
  localStorage.removeItem('background_option');
  window.location.reload();
}
//toggle menu
toggleMenu = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');
toggleMenu.onclick = function(e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle('menu-active');
  tLinks.classList.toggle('open');
};
tLinks.onclick = function(e){
  e.stopPropagation();
}
//click anywhere outside  menu and toggle menu
document.addEventListener('click', (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    // check if menu is open
    if(tLinks.classList.contains('open')) {
      toggleMenu.classList.toggle('menu-active');
      tLinks.classList.toggle('open');
    }
  }

});

