export default function renderHTML({component}){
    const divElement =  document.createElement('div');
         divElement.id="main-container";
         divElement.setAttribute("tabindex","0");
         divElement.innerHTML =   `
         <input class="search-element" type ="text" id="searchElement" placeholder="Search by ${component}...">
         <img id="loop" src="./icons/search.svg"></img>
 `;
 return divElement;
 } 