import '../Components/Button/button';
import '../Components/Button/styles.css'

import { html } from 'lit-html';


export default {
    title: 'Example/toolkitButton',
}

const Template = ({label, state, disabled, icon}) => 
    html`<toolkit-button state=${state} disabled=${disabled} label=${label} icon=${icon} ></toolkit-button>`;

//Stories

export const Primary = Template.bind({});
Primary.args = {label: 'lorem ipsum', disabled: true, state:'primary', icon:'icons/icon.svg'};