// ygoApiService.js

async function getData(url, searchBy, searchValue) {
  const response = await fetch(url + `?${searchBy}=${searchValue}`);
  const data = await response.json();
  return data;
}

export { getData };
