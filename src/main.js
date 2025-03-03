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
let gallery = new SimpleLightbox('.list-images a');
gallery.on('show.simplelightbox', function () {});

form.addEventListener('submit', async evt => {
  evt.preventDefault();
  input.blur();
  if (!input.value.trim()) return;

  clearListImages();
  page = 1;
  fetchAndRenderImages(input.value, true);
});

buttonMore.addEventListener('click', async () => {
  page++;
  fetchAndRenderImages(input.value, false);
});

async function fetchAndRenderImages(searchQuery, isNewSearch) {
  toggleLoader(true);
  toggleButtonMore(false);

  const { hits, totalHits } = await axiosImages(searchQuery, page, perPage);
  toggleLoader(false);

  if (!hits?.length) {
    showNotification(
      'Sorry, there are no images matching your search query. Please try again!',
      '#ef4040'
    );
    return;
  }

  listImages.classList.remove('visually-hidden');
  renderImages(hits);
  gallery.refresh();

  if (isLastPage(totalHits)) {
    showNotification(
      "We're sorry, but you've reached the end of search results.",
      'green'
    );
  } else {
    buttonMore.classList.remove('visually-hidden');
  }
  if (!isNewSearch) scrollPage();
}

function toggleLoader(state) {
  loader.classList.toggle('is-active', state);
}

function clearListImages() {
  return (listImages.innerHTML = '');
}

function isLastPage(totalHits) {
  const totalPages = Math.ceil(totalHits / perPage);
  return totalPages === page;
}

function showNotification(message, color) {
  iziToast.show({
    message,
    position: 'topRight',
    backgroundColor: color,
    messageColor: '#fafafb',
    messageSize: '16',
  });
}

function scrollPage() {
  const cardHeight =
    document.querySelector('li')?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2 + 72,
    behavior: 'smooth',
  });
}

function toggleButtonMore(state) {
  buttonMore.classList.toggle('visually-hidden', !state);
}
