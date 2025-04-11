import {Window} from "./core/ui"
import {Button} from "./widgets/button"
import {Heading} from "./widgets/heading"

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
