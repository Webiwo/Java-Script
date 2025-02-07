const count = 10;
const apiKey = "xxxxxxxxxxxxxxxxxxxx";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let photosArr = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    alert("Ooops", error.message);
  }
};

const displayPhotos = () => {
  totalImages = photosArr.length;
  imagesLoaded = 0;
  photosArr.forEach((photo) => {
    const anchor = createElementWithAttributes("a", {
      href: photo.links.html,
      target: "_blank",
    });

    const img = createElementWithAttributes("img", {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
};

const createElementWithAttributes = (element, attributes) => {
  const item = document.createElement(element);
  for (const [key, val] of Object.entries(attributes)) {
    item.setAttribute(key, val);
  }
  return item;
};

const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
