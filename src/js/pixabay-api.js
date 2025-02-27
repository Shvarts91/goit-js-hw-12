import axios from 'axios';

export async function axiosImages(userRequest, page, perPage) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '48923193-3438f3437d6b65fcb88350802',
        q: `${userRequest}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    alert(error);
    error => console.log(error);
  }
}
