import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import { Checkbox } from "./widgets/check";
import {Heading} from "./widgets/heading"
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
checkBox.move(12, 150); // Positioned right under the button
checkBox.setSize(20, 20); // Make sure it has size
checkBox.backcolor = '#B1569F';
checkBox.forecolor = 'black';
checkBox.setBorder("black", 1); // For debugging visibility
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

const scrollBar = new Scroll(w);
scrollBar.move(12, 300);

