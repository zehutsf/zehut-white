import '../styles/main';
import loadImage from './loadImage';
import Slideshow from './slideshow';

// Initialize
const images = [
  require('../images/background-01.jpg'),
  require('../images/background-02.jpg'),
  require('../images/background-03.jpg')
];

document.addEventListener('DOMContentLoaded', () => {
  const show = new Slideshow();
  show.setElement(document.querySelector('.background'));

  images.forEach((url, index) => {
    loadImage(url).then(img => {
      show.addImage(url);
      if (index === 0) {
        show.begin();
      }
    });
  });
});