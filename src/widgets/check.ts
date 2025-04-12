// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Line} from "../core/ui";

class Checkbox extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _check: Line[] = [];
    private _input: string;
    private _isChecked: boolean = false;
    private _onToggleHandler?: (checked: boolean) => void;
    private defaultText: string= "checked this box";
    private fontSize: number = 18;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private _onClickHandler?: () => void;

    constructor(parent:Window){
        super(parent);
        this.width = 150;
        this.height = 30;
        this._input = this.defaultText;
        this.role = RoleType.checkbox;
        this.render();
        this.selectable = false;
    }

    private drawCheckmark(): void {
        const x = +this._rect.x();
        const y = +this._rect.y();

        this._check.forEach(line => line.remove());
        this._check = [];

        if (this._isChecked) {
                const line1 = this._group.line(x + 4, y + 12, x + 10, y + 18).stroke({width: 2, color: "black"});
                const line2 = this._group.line(x + 10, y + 18, x + 20, y + 5).stroke({width: 2, color: "black"});
                this._check.push(line1, line2);
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

    set backcolor(color: string) {
        if (this._rect) {
            this._rect.fill(color);
        }
    }
    
    set forecolor(color: string) {
        if (this._text) {
            this._text.fill(color);
        }
    }

    get label(): string {
        return this._input;
    }
    
    set label(value: string) {
        this._input = value;
        if (this._text) {
            this._text.text(value);
        }
    }
    

    // render(): void {
    //     this._group = (this.parent as Window).window.group();
    //     this._rect = this._group.rect(24, 24).fill("#fff").stroke({color: "#000", width: 2}).radius(4);
    //     this._rect.x(0).y(0);
    //     this._text = this._group.text(this._input)
    //         .x(30) // Push it to the right of the checkbox
    //         .y(2)  // Adjust vertical alignment
    //         .font({ size: this.fontSize, anchor: "start", leading: "1.2em" });
    //     let eventRect = this._group.rect(this.width, this.height).opacity(0);
    //     this.registerEvent(eventRect);

    //     eventRect.on("click", () => {
    //         this._isChecked = !this._isChecked;
    //         this.drawCheckmark();
    //         if (this._onToggleHandler) {
    //             this._onToggleHandler(this._isChecked);
    //         }
    //     });
    //     this.drawCheckmark();
    // }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(24, 24).fill("#fff").stroke({color: "#000", width: 2}).radius(4);
        this._rect.stroke("black");
        this._text = this._group.text(this._input).x(30).y(2).fill("black");
        // Set the outer svg element 
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to 
        // prevent selection cursor and to handle mouse events
        let eventRect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);

        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(eventRect);
        
        eventRect.on("click", () => {
            this._isChecked = !this._isChecked;
            this.drawCheckmark();
        
            if (this._onToggleHandler) {
                this._onToggleHandler(this._isChecked);
            }
        
            if (this._onClickHandler) {
                this._onClickHandler();
            }
        
            requestAnimationFrame(() => {
                this.update();
            });
        });
        
    }

    onClick(callback: () => void): void {
        this._onClickHandler = callback;
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#A881A1';
        this._rect.animate(200).scale(1.1);
        this._rect.radius(10);
    }
    idledownState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#F2CEEA';
        this._rect.animate(200).opacity(0.7).opacity(1);
    }
    pressReleaseState(): void {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
        this._rect.animate(100).scale(1);
    }

    pressedState(): void {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
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

export {Checkbox};