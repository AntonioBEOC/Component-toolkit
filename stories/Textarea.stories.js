import '../Components/Textarea/textarea';
import { html } from 'lit-html';

export default {
  title: "Library/Textarea",
};

const Template = ({rows, cols, label, helpertext}) => html`<toolkit-textarea rows=${rows} cols=${cols} label=${label} helpertext=${helpertext} ></toolkit-textarea>`;

//Stories

export const Primary = Template.bind({});
Primary.args = {rows: 5, cols: 30, label: 'Username', helpertext:'Help Text'};