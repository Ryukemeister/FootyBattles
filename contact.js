"use strict";

const toggleBtn = document.querySelector(".hamburger-btn");
const crossBtn = document.querySelector(".cross-icon");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", function () {
  sidebar.classList.add("active");
});

crossBtn.addEventListener("click", function () {
  sidebar.classList.remove("active");
});
