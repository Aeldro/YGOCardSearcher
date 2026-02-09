async function getComponent(url) {
  const response = await fetch(url);

  const html = await response.text();

  const parser = new DOMParser();

  const doc = parser.parseFromString(html, "text/html");

  return doc;
}

module.exports = getComponent;
