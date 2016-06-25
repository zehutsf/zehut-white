import '../styles/main';
import loadImage from './loadImage';
import Slideshow from './slideshow';

// Initialize
const images = [
  require('../images/background-01.jpg'),
  require('../images/background-04.jpg'),
  require('../images/background-02.jpg')
  //require('../images/background-03.jpg')
];

document.addEventListener('DOMContentLoaded', () => {

  // Set up images
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

  // Set up form
  const formContainer = document.querySelector('.form-container');
  const form = document.getElementById('email-form');
  const emailInput = document.querySelector('input[name="email"]');

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailValue = emailInput.value;

    formContainer.classList.remove('error');

    if (!emailValue) {
      formContainer.classList.add('error');
      return;
    }

    fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailValue
      })
    }).then((resp) => {
      formContainer.classList.add('success');
    }).catch((err) => {
      formContainer.classList.add('error');
    });
  };

  form.addEventListener('submit', handleSubmit);

});