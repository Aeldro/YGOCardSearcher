class Component {
  constructor(template, cssFileUrl, htmlFileUrl) {
    this.template = template;
    this.cssFileUrl = cssFileUrl;
    this.htmlFileUrl = htmlFileUrl;
  }

  async init() {
    this.template = await this.getHtml();
    await this.loadStyles();
    return this;
  }

  async getHtml() {
    const response = await fetch(this.htmlFileUrl);

    const html = await response.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(html, "text/html");

    return doc.body.firstElementChild;
  }

  async loadStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = this.cssFileUrl;
    document.head.appendChild(link);
  }
}

export { Component };
