function app_dom_init(
    window
  , document
  ) {
  
  const getWindowAspectRatio = () => window.innerWidth / window.innerHeight;
  const getWindowInnerWidth = () => window.innerWidth;
  const getWindowInnerHeight = () => window.innerHeight;
  
  function documentAppend(element) {
    document.body.appendChild(element);  
  }
  
  return {
    getWindowAspectRatio : getWindowAspectRatio
  , getWindowInnerWidth  : getWindowInnerWidth
  , getWindowInnerHeight : getWindowInnerHeight
  , documentAppend       : documentAppend
  };
}
