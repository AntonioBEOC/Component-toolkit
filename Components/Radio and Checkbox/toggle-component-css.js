export default function renderCSS(){
    const cssElement = document.createElement('link');
    cssElement.href =  `styles/toggle-component.css`;
    cssElement.rel = `stylesheet`;
return cssElement;
} 