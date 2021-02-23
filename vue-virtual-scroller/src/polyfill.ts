declare global {
	interface Window {
    requestAnimFrame: any;
    mozRequestAnimationFrame: any;
    oRequestAnimationFrame: any;
    msRequestAnimationFrame: any;
  }
}


const polyfill = () => {
  if (typeof window === 'undefined') return;
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(a) {
        window.setTimeout(a, 1e3 / 60);
      }
    );
  })();
}

export default polyfill;