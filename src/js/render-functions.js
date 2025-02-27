const gallery = document.querySelector('.list-images');
export function renderImages(images) {
  const markup = images
    .map(item => {
      return `<li>
    <a class='gallery-link' href='${item.largeImageURL}'>
    <img class='gallery-img' src='${item.webformatURL}' alt='${item.tags}'>
    <div class='image-info-block'>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Likes</span>
    <span class='image-value-parametr'>${item.likes}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Views</span>
    <span class='image-value-parametr'>${item.views}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Comments</span>
    <span class='image-value-parametr'>${item.comments}</span>
    </p>
    <p class='image-info-parametr'>
    <span class='image-name-parametr'>Downloads</span>
    <span class='image-value-parametr'>${item.downloads}</span>
    </p>
    </div>
    </a>
    </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
