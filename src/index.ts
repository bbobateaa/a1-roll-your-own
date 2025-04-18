import { Window } from "./core/ui";
import { Button } from "./widgets/button";
import { Checkbox } from "./widgets/check";
import { NavBarWidget } from "./widgets/custom";
import { Heading } from "./widgets/heading";
import { ProgressBar } from "./widgets/progress";
import { RadioButtonGroup } from "./widgets/radioButtonGroup";
import { Scroll } from "./widgets/scroll";

let w = new Window(window.innerHeight-10,'100%');

let lbl1= new Heading(w);
lbl1.text = "Click the Button";
lbl1.tabindex = 1;
lbl1.fontSize = 25;
lbl1.move(10,20);


let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 20;
btn.move(12, 50);

btn.setRadius(20);
btn.setSize(50, 140);

btn.backcolor = '#B1569F';
btn.forecolor = 'white';
btn.setBorder("#734169", 5);
btn.onClick(() => {
    lbl1.text = "Button Clicked!";
})

let lbl2= new Heading(w);
lbl2.text = "Click the Checkbox";
lbl2.tabindex = 1;
lbl2.fontSize = 25;
lbl2.move(12,110);

let checkBox = new Checkbox(w);
checkBox.tabindex = 2;
checkBox.move(12, 150); 
checkBox.setSize(20, 20); 
checkBox.backcolor = '#B1569F';
checkBox.forecolor = 'black';
checkBox.setBorder("black", 1);
checkBox.label = "Click this CheckBox";
checkBox.onClick(() => {
    lbl2.text = "Checkbox Clicked!";
})

let lbl3 = new Heading(w);
lbl3.text = "Click Radiohead";
lbl3.fontSize = 25;
lbl3.move(12, 200);

const radioGroup = new RadioButtonGroup(w, ["Matcha", "Hojicha", "Jasmine"]);
radioGroup.move(12, 250);
radioGroup.backcolor = '#B1569F';
radioGroup.forecolor = '#B1569F';
radioGroup.onChange((index, label) => {
    console.log(`Selected index: ${index}, label: ${label}`);
    lbl3.text = `${label} was selected!`;

});

let lbl4 = new Heading(w);
lbl4.text = "Scroll bar";
lbl4.fontSize = 25;
lbl4.move(100, 400);

const scrollBar = new Scroll(w);
scrollBar.move(12, 400);
scrollBar.scrollHeight = 200;

scrollBar.onScroll((direction, position) => {
    lbl4.text = `Scroll bar\nDirection: ${direction}\nPosition: ${position}`;
});

const progressBar = new ProgressBar(w);
progressBar.move(12, 700);
progressBar.progressBarWidth = 800;
progressBar.setIncrementValue = 20;
progressBar.foreColor = '#B1569F';


let lbl5 = new Heading(w);
lbl5.fontSize = 25;
lbl5.move(12, 650);
lbl5.text = `Progress Bar: ${progressBar.getIncrementValue}%`;

let lbl6 = new Heading(w);
lbl6.fontSize = 25;
lbl6.move(12, 750);
lbl6.text = 'Navigation Bar (Custom Widget)';
const navBar = new NavBarWidget(w);
navBar.move(12, 800);
navBar.buttonColor = "#B1569F"