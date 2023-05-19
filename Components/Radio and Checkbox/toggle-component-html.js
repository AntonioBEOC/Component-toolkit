export default function renderHTML({type,status}){

    
    let checkboxSpanUncheked =   `<span id="unchecked" class ="check ${status == 'true' ? 'hide' : ''}"></span>
                                 <span id="checked" class ="c-checked ${status == 'true' ? '' : 'hide'}">
                                    <span class ="check-mark"></span>
                                 </span>`               
    let radioSpanUnchecked = `<span id="unchecked" class ="radio">
                                <span id="checked" class ="r-checked ${status == 'true' ? '' : 'hide'}"></span>
                            </span>`;

    const divElement =  document.createElement('div');
         divElement.id="main-container";
         divElement.setAttribute("tabindex","0");
         divElement.innerHTML =   `
            <label> 
                ${type == 'checkbox' ? checkboxSpanUncheked : radioSpanUnchecked}
                <slot>Placeholer</slot>
            </label>
 `;

 return divElement;
 } 