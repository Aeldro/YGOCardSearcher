// ygoApiService.js

async function getData(url, searchBy, searchValue) {
  const response = await fetch(url + `?${searchBy}=${searchValue}`);
  const data = await response.json();
  return data;
}

async function getNumberOfCards(url, searchBy, searchValue) {
  const response = await fetch(url + `?${searchBy}=${searchValue}`);
  const data = await response.json();
  return data.data.length;
}

export { getData, getNumberOfCards };
