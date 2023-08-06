// content.js
(function () {
  const replaceTwitterLogo = () => {

    const logo = document.querySelector(
      '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-dnmrzs.r-1vvnge1 > h1 > a > div'
    );

    // const logo_g = document.querySelector(
    //   '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-dnmrzs.r-1vvnge1 > h1 > a > div > svg > g'
    //);

    var svg_url = "";
    var png_url = "";

    if (chrome.runtime?.id) {
      svg_url = chrome.runtime.getURL("icon.svg");
    }

    if (chrome.runtime?.id) {
      png_url = chrome.runtime.getURL("icon.png");
    }

    if (logo) {
      logo.style.width = "32px";
      logo.style.height = "32px";
      logo.style.backgroundSize = "cover";
      logo.style.backgroundColor = "blue";

      // Fetch and read the content of your logo.svg file
      fetch(svg_url)
        .then((response) => response.text())
        .then((svgContent) => {
          // Replace the content of the logo with your SVG content
          console.log(svgContent);
          logo.innerHTML = svgContent;
        });
    }

    // if (logo_g) {
    //   // Fetch and read the content of your logo.svg file
    //   fetch(svg_url)
    //     .then((response) => response.text())
    //     .then((svgContent) => {
    //       // Replace the content of the logo with your SVG content
    //       logo_g.innerHTML = svgContent;
    //     });
    // }
  };

  replaceTwitterLogo();

  // Listen for page changes and update the logo on new tweets or navigation
  const observer = new MutationObserver(replaceTwitterLogo);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
})();
