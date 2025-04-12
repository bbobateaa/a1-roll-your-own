// RadioButtonGroup.ts
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Line} from "../core/ui";
import { RadioButton } from "./radio";

class RadioButtonGroup extends Widget {
    private _buttons: RadioButton[] = [];
    private _selectedIndex: number = -1;
    private _onChange?: (index: number, label: string) => void;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private fontSize: number = 18;
    private _circle: Rect;
    private _labels: string[];
    x: number;
    y: number;


    constructor(parent: Window, labels: string[]) {
        super(parent);

        if (labels.length < 2) {
            throw new Error("RadioButtonGroup must have at least two options.");
        }

        this.width = 200;
        this.height = labels.length * 40;
        this.role = RoleType.group;
        this._labels = labels;
        this.render(); // call with no args

    }

    render(): void {
        const parentWindow = this.parent as Window;
        const group = parentWindow.window.group();
        this.outerSvg = group;

        this._labels.forEach((label, index) => {
            // RadioButtonGroup.ts
            const btn = new RadioButton(parentWindow, "myGroup"); // pass a common group name
            btn.label = label;
            btn.move(0, index * 40);

            btn.onSelect(() => {
                this.selectIndex(index);
                this._onChange?.(index, label);
            });

            this._buttons.push(btn);
            group.add(btn.outerSvg);
        });
    }

    selectIndex(index: number) {
        this._buttons.forEach((btn, i) => {
            btn.setSelected(i === index);
        });
        this._selectedIndex = index;
    }

    onChange(handler: (index: number, label: string) => void) {
        this._onChange = handler;
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    get selectedLabel(): string | null {
        return this._selectedIndex >= 0 ? this._buttons[this._selectedIndex].label : null;
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this.outerSvg) {
            this.outerSvg.move(x, y);
        }
    }    

        //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#A881A1';
        this._circle.radius(10);
    }
    idledownState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#F2CEEA';
    }
    pressReleaseState(): void {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
    }

    pressedState(): void {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
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

    }
    pressedoutState(): void {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#684761';
    }
    moveState(): void {
        this.fontSize = 100;
        this.defaultHeight = 100;
        this.backcolor = '#FF36D7';
        this.defaultWidth = 30;
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent) {
            this.fontSize = 20;
            this.defaultHeight = 40;
            this.backcolor = '#AF59E9';
        }
    }
}

export { RadioButtonGroup };
