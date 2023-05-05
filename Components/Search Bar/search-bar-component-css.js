export default function renderCSS(){
    const cssElement = document.createElement('link');
    cssElement.href =  `styles/search-bar-component.css`;
    cssElement.rel = `stylesheet`;
return cssElement;
} 