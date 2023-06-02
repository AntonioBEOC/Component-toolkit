import ProgressBar from "../Components/ProgressBar/progress-bar";
export default {
    title: "Progress Bar",
    component: ProgressBar,
}


const Template = ({steps}) => html`<ProgressBar steps=${steps} />`;

export const FiveSteps = Template.bind({});

FiveSteps.args = {
    steps: "Step 1, Step 2, Step 3, Step 4, Step 5",
}

export const ThreeSteps = Template.bind({});

ThreeSteps.args = {
    steps: "Step 1, Step 2, Step 3",
}