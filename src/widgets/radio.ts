// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Line} from "../core/ui";

class RadioButton extends Widget {
    private _circle: Rect; // Outer circle of the radio button
    private _dot?: Rect;   // Inner filled circle for selection
    private _text: Text;
    private _input: string;
    private _isChecked: boolean = false;
    private _onToggleHandler?: (checked: boolean) => void;
    private _onClickHandler?: () => void;
    private _groupName: string;
    private defaultWidth: number = 80;
    private defaultHeight: number = 30;
    private static _groupRegistry: { [key: string]: RadioButton[] } = {};
    private fontSize: number = 18;
    y: number;
    x: number;
    color: string;

    constructor(parent: Window, groupName: string) {
        super(parent);
        this.width = 250;
        this.height = 30;
        this._input = "Radio option";
        this._groupName = groupName;
        this.role = RoleType.radiobutton;
        this.selectable = false;

        // Register in group
        if (!RadioButton._groupRegistry[groupName]) {
            RadioButton._groupRegistry[groupName] = [];
        }
        RadioButton._groupRegistry[groupName].push(this);

        this.render();
    }

    private drawRadioDot(): void {
        if (this._dot) {
            this._dot.remove();
        }

        if (this._isChecked) {
            const cx = +this._circle.x() + 6;
            const cy = +this._circle.y() + 6;

            this._dot = this._group.rect(12, 12)
                .fill("#B1569F")
                .radius(6)
                .x(cx)
                .y(cy);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._group.translate(this.x || 0, this.y || 0);

        this._circle = this._group.rect(24, 24).fill("#F2CEEA").stroke({ color: "#B1569F", width: 2 }).radius(12);
        this._circle.x(0).y(0);

        this._text = this._group.text(this._input).x(30).y(2).fill("black");

        this.outerSvg = this._group;

        let eventRect = this._group.rect(this.width, this.height).opacity(0);
        this.registerEvent(eventRect);

        eventRect.on("click", () => {
            if (!this._isChecked) {
                this.select();
            }

            if (this._onClickHandler) {
                this._onClickHandler();
            }

            requestAnimationFrame(() => {
                this.update();
            });
        });
        eventRect.on("mouseover", () => this.hoverState());
        eventRect.on("mouseout", () => this.idleupState());
        eventRect.on("click", () => {
            if (!this._isChecked) this.select();
            this.pressedState();
        });

        this.drawRadioDot();
    }

    private select(): void {
        // Uncheck all other buttons in the same group
        RadioButton._groupRegistry[this._groupName].forEach(rb => {
            if (rb !== this) {
                rb._isChecked = false;
                rb.drawRadioDot();
            }
        });

        // Check this one
        this._isChecked = true;
        this.drawRadioDot();

        if (this._onToggleHandler) {
            this._onToggleHandler(true);
        }
    }

    onClick(callback: () => void): void {
        this._onClickHandler = callback;
    }

    onToggle(callback: (checked: boolean) => void): void {
        this._onToggleHandler = callback;
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

    get isChecked(): boolean {
        return this._isChecked;
    }

    set isChecked(value: boolean) {
        this._isChecked = value;
        this.drawRadioDot();
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this._group) {
            this._group.translate(x, y);
        }
    }
    
    // RadioButton.ts
    onSelect(callback: () => void): void {
        this._onClickHandler = callback;
    }

    setSelected(selected: boolean): void {
        this._isChecked = selected;
        this.drawRadioDot();
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

export {RadioButton};