const sectionData = {
    section: {
      showArrows: true,
      showPageDots: true,
    },
    slideData: [
      {
        title: "Women's Apparel",
        description: "Elevate your wardrobe with our limited-time fashion offer!",
        image: "https://veena-theme-fashion.myshopify.com/cdn/shop/files/1.png?v=1705665890&width=2000",
        buttonLabel: "Explore More",
        buttonLink: "#",
        style: {
          textAlignment: "center",
          contentPosition: "center-center"
        },
      },
      {
        title: "Trendy Classics",
        description: "Discover Signature Look: Fashion Forward and Fabulous!",
        image: "https://veena-theme-fashion.myshopify.com/cdn/shop/files/4.png?v=1705665890&width=2000",
        buttonLabel: "Shop Now",
        buttonLink: "#",
        style: {
          textAlignment: "right",
          contentPosition: "bottom-right"
        },
      },
      {
        title: "Modern Elegance",
        description: "Step into the World of Style with the Latest Fashion Trends Unveiled!",
        image: "https://veena-theme-fashion.myshopify.com/cdn/shop/files/3.png?v=1705665898&width=2000",
        buttonLabel: "Explore Now",
        buttonLink: "#",
        style: {
          textAlignment: "left",
          contentPosition: "top-center"
        },
      }
    ]
  };

  document.addEventListener('DOMContentLoaded', function () {
const splideList = document.querySelector('.splide__list');
const positionDropdown = document.getElementById('position-dropdown');

// Create slides
sectionData.slideData.forEach((slide, index) => {
  const slideElement = document.createElement('li');
  slideElement.classList.add('splide__slide');
  slideElement.style.backgroundImage = `url('${slide.image}')`;

  // Create content container
  const contentElement = document.createElement('div');
  contentElement.classList.add('slide-content');

  // Apply initial position class
  const positionClass = slide.style.contentPosition;
  slideElement.classList.add(positionClass);

  // Apply text alignment class
  const textAlignmentClass = `text-${slide.style.textAlignment}`;
  contentElement.classList.add(textAlignmentClass);

  // Add title
  const titleElement = document.createElement('h5');
  titleElement.textContent = slide.title;
  contentElement.appendChild(titleElement);

  // Add description
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = slide.description;
  contentElement.appendChild(descriptionElement);

  // Add button
  const buttonElement = document.createElement('a');
  buttonElement.href = slide.buttonLink;
  buttonElement.textContent = slide.buttonLabel;
  contentElement.appendChild(buttonElement);

  slideElement.appendChild(contentElement);
  splideList.appendChild(slideElement);
});

const splide = new Splide('#image-carousel', {
  type: sectionData.section.showArrows ? 'loop' : 'fade',
  pagination: sectionData.section.showPageDots,
  arrows: sectionData.section.showArrows,
//   autoplay: true
}).mount();

// Set dropdown default value based on the first slide's content position
positionDropdown.value = sectionData.slideData[0].style.contentPosition;

// Function to update the position class on a slide
function updateSlidePosition(slide, positionClass) {
    
  // Remove all position classes
  slide.classList.remove(
    'top-left', 'top-center', 'top-right',
    'center-left', 'center-center', 'center-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  );

  // Add the selected position class
  slide.classList.add(positionClass);
}

// Function to update the text alignment class on a slide
function updateTextAlignment(content, alignmentClass) {
  // Remove all alignment classes
  content.classList.remove('text-left', 'text-center', 'text-right');

  // Add the selected alignment class
  content.classList.add(alignmentClass);
}

// Update dropdown and slide position on slide change
splide.on('moved', function () {
  const activeSlide = document.querySelector('.splide__slide.is-active');
  const activeIndex = splide.index;

  // Get the current position class of the active slide
  const activePosition = sectionData.slideData[activeIndex].style.contentPosition;

  // Update the dropdown to match the active slide's position
  positionDropdown.value = activePosition;
  

  // Ensure the active slide has the correct position applied
  updateSlidePosition(activeSlide, activePosition);

  // Update the text alignment of the active slide
  const activeContent = activeSlide.querySelector('.slide-content');
  const activeTextAlignment = `text-${sectionData.slideData[activeIndex].style.textAlignment}`;
  updateTextAlignment(activeContent, activeTextAlignment);
});

// Dropdown to change content position for the active slide
positionDropdown.addEventListener('change', function (event) {
  const selectedPosition = event.target.value;
  const activeIndex = splide.index;

  const activeSlide = document.querySelector('.splide__slide.is-active');

  // Update the position class on the active slide
  updateSlidePosition(activeSlide, selectedPosition);

  // Update the position in the slideData array to reflect the change
  sectionData.slideData[activeIndex].style.contentPosition = selectedPosition;
});
});
