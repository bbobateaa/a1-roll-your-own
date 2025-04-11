// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Button extends Widget{
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string= "Button";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private _onClickHandler?: () => void;

    constructor(parent:Window){
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
    }

    set fontSize(size:number){
        this._fontSize= size;
        this.update();
    }

    public setRadius(radius: number): void {
        if (this._rect) {
            this._rect.radius(radius);
        }
    }

    public setSize(height: number, width: number): void {
        if (this._rect) {
            this._rect.width(width);
            this._rect.height(height);
        }
    }

    setBorder(color: string, width: number): void {
        if (this._rect) {
            this._rect.stroke({ color: color, width: width });
        }
    }

    get label(): string {
        return this._input
    }

    set label(value: string) {
        this._input = value;
        if (this._text) {
            this._text.text(value);
            this.positionText();
        }
    }

    get size(): { width: number; height: number } {
        return {
            width: +this._rect.width(),
            height: +this._rect.height()
        };
    }
    
    set size(val: {width: number; height: number}) {
        this.setSize(val.height, val.width);
    }
    
    private positionText() {
        const rectX = +this._rect.x();
        const rectY = +this._rect.y();
        const rectWidth = +this._rect.width();
        const rectHeight = +this._rect.height();
    
        const box: Box = this._text.bbox();
        const centerX = rectX + (rectWidth / 2) - (box.width / 2);
        const centerY = rectY + (rectHeight / 2) - (box.height / 2);
    
        this._text.x(centerX);
        this._text.y(centerY);
    }
    
    
    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._text = this._group.text(this._input);
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventrect);

        eventrect.on('click', () => {
            if (this._onClickHandler) {
                this._onClickHandler();
            }
            requestAnimationFrame(() => {
                this.update();
            });
        });
    }

    override update(): void {
        if(this._text != null)
            this._text.font('size', this._fontSize);
            this._text.text(this._input);
            this.positionText();

        if(this._rect != null)
            this._rect.fill(this.backcolor);
        
        super.update();
    }
    
    pressReleaseState(): void{

        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void): void {
        this._onClickHandler = callback;
    }

    
    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#A881A1';
        this.move(15, 50);
        this._rect.animate(200).scale(1.1);
        this._rect.radius(10);
    }
    idledownState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#F2CEEA';
        this.move(25, 50);
        this._rect.animate(200).opacity(0.7).opacity(1);
    }
    pressedState(): void {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
        this.move(80, 50);
        this._rect.animate(100).scale(1);
    }
    hoverState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#C5B5C2';
    }
    hoverPressedState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#BCE7EB';
        this.move(100, 50);
        this._rect.animate(200).scale(1.1).scale(1);

    }
    pressedoutState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#684761';
        this._rect.animate(100).scale(0.6);
    }
    moveState(): void {
        this.fontSize = 100;
        this.defaultHeight = 100;
        this.backcolor = '#FF36D7';
        this.defaultWidth = 30;
        this._rect.animate(200).rotate(50);
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent) {
            this.fontSize = 20;
            this.defaultHeight = 40;
            this.backcolor = '#AF59E9';
        }

    }
}

export {Button}
