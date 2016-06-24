import '../styles/slideshow';
import detectEventType from 'detect-animation-end-helper';

const animationEventType = detectEventType();
let _zIndexIncr = 5;

function SlideshowImage(url) {
  this.element = document.createElement('div');
  this.element.classList.add('slide');
  this.element.style.backgroundImage = `url(${url})`;
  this.element.addEventListener(animationEventType, this.onTransitionEnd.bind(this));
};

SlideshowImage.prototype = {
  animateIn(onComplete) {
    const classList = this.element.classList;
    classList.remove('enter');
    classList.remove('enter-complete');

    setTimeout(() => this._animateInComplete(onComplete), 0);
  },

  _animateInComplete(onComplete) {
    this.element.classList.add('enter');
    this.element.style.zIndex = _zIndexIncr++;

    setTimeout(() => this.element.classList.add('enter-active'), 0);
    this.onCompleteListener = onComplete;
  },

  getElement() {
    return this.element;
  },

  onTransitionEnd(event) {
    this.element.classList.add('enter-complete');
    this.element.classList.remove('enter-active');
    this.onCompleteListener();
  }
};

function Slideshow(urls = []) {
  this._imageUrls = [];
  this._images = [];
  this.onImageAnimateComplete = this.onImageAnimateComplete.bind(this);

  // initialize
  urls.forEach(this.addImage);
}

Slideshow.prototype = {
  setElement(element) {
    this._element = element;
  },

  addImage(url) {
    this._imageUrls.push(url);
    const imageSlide = new SlideshowImage(url);
    this._element.appendChild(imageSlide.getElement());
    this._images.push(imageSlide);
  },

  begin() {
    this._index = 0;
    this.showCurrentImage();
  },

  next() {
    if (this._index + 1 >= this._imageUrls.length) {
      this._index = 0;
    } else {
      this._index++;
    }

    this.showCurrentImage();
  },

  onImageAnimateComplete() {
    this.next();
  },

  showCurrentImage() {
    const current = this.currentImage = this._images[this._index];
    setTimeout(() => {
      current.animateIn(this.onImageAnimateComplete);
    }, 0);

  }
};

export default Slideshow;
