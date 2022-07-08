"use strict";

// refs
const bodyRef = document.querySelector("body");
const mobileMenuRef = document.querySelector(".hero__mobile-menu");
const openMenuBtnRef = document.querySelector("#open-menu");
const closeMenuBtnRef = document.querySelector("#close-menu");

const partnersListRef = document.querySelector(".partners__card-list");
const activeTabRef = document.querySelector(".partners__radio[checked]");
const partnerName = document.querySelector(".partners__user-name");
const partnerPosition = document.querySelector(".partners__user-position");
const partnerText = document.querySelector(".partners__text");

const modalBackdropRef = document.querySelector(".backdrop");
const closeModalBtnRef = document.querySelector(".modal__close-btn");
const swiperSlidesRef = document.querySelector(".swiper-wrapper");
const modalImgRef = document.querySelector(".modal__img");
const nameFieldRef = document.querySelector("#field-name");
const positionFieldRef = document.querySelector("#field-position");
const phoneFieldRef = document.querySelector("#field-phone");
const emailFieldRef = document.querySelector("#field-email");

// menu
openMenuBtnRef.addEventListener("click", () => {
  bodyRef.style.cssText = `
        overflow: hidden;
        height: 100vh;
    `;
  mobileMenuRef.classList.add("menu-is-open");
});

closeMenuBtnRef.addEventListener("click", () => {
  bodyRef.style.cssText = "";
  mobileMenuRef.classList.remove("menu-is-open");
});

const setPartnerData = (ref) => {
  const { name, position, text } = ref.dataset;

  partnerName.textContent = name;
  partnerPosition.textContent = position;
  partnerText.textContent = `“${text}”`;
};

setPartnerData(activeTabRef);

partnersListRef.addEventListener("click", (e) => {
  const { target } = e;

  target.nodeName === "IMG"
    ? setPartnerData(target.previousElementSibling)
    : target.nodeName === "LI"
    ? setPartnerData(target.children[0])
    : null;
});

// swiper modal
swiperSlidesRef.addEventListener("click", (e) => {
  const { target } = e;

  if (target.nodeName === "BUTTON") {
    const { name, position, phone, email, photo } = target.dataset;

    modalImgRef.src = photo;
    nameFieldRef.textContent = name;
    positionFieldRef.textContent = position;
    phoneFieldRef.textContent = phone;
    emailFieldRef.textContent = email;

    modalBackdropRef.classList.add("is-open");
  }
});

closeModalBtnRef.addEventListener("click", () => {
  modalBackdropRef.classList.remove("is-open");
});
