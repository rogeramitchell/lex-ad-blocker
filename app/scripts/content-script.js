(() => {
  // known list of "advertisement" query selector strings
  let adverts = [
    'a.switch-to-lightning',
    'div#adoptionDlg-IBILTasksCampaign',
    'div#tryLexDialog'
  ];
 
  // allow for incrementing badge number
  let incrementBadge = function(currentValue) {
    chrome.browserAction.setBadgeText(currentValue += 1);  
  }
  
  // create function to check adverts
  let checkAdverts = function() {

    // iterate over advert to find elements and remove from dom
    adverts.forEach(item => {
      let element = document.querySelector(item);
      if(element != null) {
        console.log('We just blocked an ad from Lightning Experience:' + item);
        element.parentElement.removeChild(element);
        console.log(chrome);
        // chrome.browserAction.getBadgeText({}, result => incrementBadge());
        
        if(item == 'div#tryLexDialog') {
          let overlay = document.querySelector('div.overlayBackground');
          overlay.parentElement.removeChild(overlay);
        }
      }
    });
  }

  // execute the checkAdverts function
  checkAdverts();

  // set up mutation observer to check for dom event updates
  let mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      checkAdverts();
    })
  })
  
  // observe for changes to the dom within body's subtree
  let body = document.querySelector('body');
  
  mutationObserver.observe(body, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });
})();