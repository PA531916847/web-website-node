console.log('static js is running');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
  document.querySelector('#errorMsg').textContent = 'loading...';
  document.querySelector('#forecastVal').textContent = '';
  e.preventDefault();
  const location = search.value;
  console.log(location);
  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        document.querySelector('#errorMsg').textContent = data.error;
        document.querySelector('#forecastVal').textContent = '';
      } else {
        document.querySelector('#errorMsg').textContent = '';
        document.querySelector('#forecastVal').textContent = data.forecast;
      }
    });
  });
});
