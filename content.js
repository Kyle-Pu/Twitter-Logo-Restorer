// content.js
(function () {
  const replaceTwitterLogo = () => {

    const logo_container = document.querySelector(
      '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-dnmrzs.r-1vvnge1 > h1 > a > div'
    );

    var svg_url = "";
    var png_url = "";
    var ico_url = "";

    // Avoid extension context invalidated error (see https://stackoverflow.com/questions/53939205/how-to-avoid-extension-context-invalidated-errors-when-messaging-after-an-exte#:~:text=Problems%20can%20arise%20if%20either,changes%20done%20more%20than%20once.)
    if (chrome.runtime?.id) {
      svg_url = chrome.runtime.getURL("images/icon.svg"); // SVG file contains all HTML to draw out SVG icon, neat
      png_url = chrome.runtime.getURL("images/icon.png");
      ico_url = chrome.runtime.getURL("images/icon.ico");
    }

    if (logo_container) {
      // Disconnect the observer temporarily to avoid infinite loop
      observer.disconnect();

      logo_container.style.width = "38px";
      logo_container.style.height = "38px";
      logo_container.style.paddingLeft = "10px";

      // Fetch and read the content of blue bird logo file
      fetch(svg_url)
        .then((response) => response.text())
        .then((svgContent) => {
          // Replace the content of the logo container with blue bird!
          logo_container.innerHTML = svgContent; // replaces all child elements on page, which is why we use the logo's immediate container
        });
    }

    // Restore the favicon too
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = ico_url;

  };

  const observeDOMChanges = () => {
    // Observe the DOM changes and call replaceTwitterLogo when needed
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  };

  // Listen for page changes and update the logo on new tweets or navigation
  const observer = new MutationObserver(replaceTwitterLogo);

  // Start observing the DOM changes
  observeDOMChanges();

})();
