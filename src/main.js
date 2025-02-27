import { axiosImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const input = document.querySelector('.input-form');
const listImages = document.querySelector('.list-images');
const loader = document.querySelector('.loader');
const buttonMore = document.querySelector('.button-more');

let page = 1;
const perPage = 40;

form.addEventListener('submit', async evt => {
  evt.preventDefault();
  input.blur();
  if (!input.value.trim()) {
    return;
  }

  clearListImages();
  buttonMore.classList.add('visually-hidden');
  loader.classList.add('is-active');

  const { hits, totalHits } = await axiosImages(input.value, page, perPage);

  loader.classList.remove('is-active');

  if (hits?.length === 0) {
    return iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      messageSize: '16',
    });
  }
  if (!hits) return;

  if (!isLastPage(totalHits)) {
    buttonMore.classList.remove('visually-hidden');
  } else {
    return iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: 'green',
      messageColor: '#fafafb',
      messageSize: '16',
    });
  }

  renderImages(hits);

  gallery.refresh();
});

buttonMore.addEventListener('click', async () => {
  page++;

  loader.classList.add('is-active');
  buttonMore.classList.add('visually-hidden');

  const { hits, totalHits } = await axiosImages(input.value, page);

  loader.classList.remove('is-active');
  renderImages(hits);
  if (!isLastPage(totalHits)) {
    buttonMore.classList.remove('visually-hidden');
  } else {
    return iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: 'green',
      messageColor: '#fafafb',
      messageSize: '16',
    });
  }

  gallery.refresh();
  const cardHeight = document
    .querySelector('li')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2 + 72,
    behavior: 'smooth',
  });
});

function clearListImages() {
  return (listImages.innerHTML = '');
}

let gallery = new SimpleLightbox('.list-images a');
gallery.on('show.simplelightbox', function () {});

function isLastPage(totalHits) {
  const totalPages = Math.ceil(totalHits / perPage);
  return totalPages === page;
}
