import { IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import { Window, Widget, RoleType, EventArgs } from "../core/ui";
import { Rect, Text, Line } from "../core/ui";

class RadioButton extends Widget {
    private _circle: Rect;
    private _dot?: Rect;
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

    private _circleColor: string = "#F2CEEA";
    private _borderColor: string = "#B1569F";
    private _dotColor: string = "#B1569F";
    private _textColor: string = "black";

    constructor(parent: Window, groupName: string) {
        super(parent);
        this.width = 250;
        this.height = 30;
        this._input = "Radio option";
        this._groupName = groupName;
        this.role = RoleType.radiobutton;
        this.selectable = false;

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
                .fill(this._dotColor)
                .radius(6)
                .x(cx)
                .y(cy);
        }
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._group.translate(this.x || 0, this.y || 0);

        this._circle = this._group.rect(24, 24)
            .fill(this._circleColor)
            .stroke({ color: this._borderColor, width: 2 })
            .radius(12);
        this._circle.x(0).y(0);

        this._text = this._group.text(this._input).x(30).y(2).fill(this._textColor);
        this.outerSvg = this._group;

        let eventRect = this._group.rect(this.width, this.height).opacity(0).attr('id', 4);
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
        RadioButton._groupRegistry[this._groupName].forEach(rb => {
            if (rb !== this) {
                rb._isChecked = false;
                rb.drawRadioDot();
            }
        });

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

    onSelect(callback: () => void): void {
        this._onClickHandler = callback;
    }

    setSelected(selected: boolean): void {
        this._isChecked = selected;
        this.drawRadioDot();
    }

    set circleColor(value: string) {
        this._circleColor = value;
        if (this._circle) {
            this._circle.fill(value);
        }
    }

    set borderColor(value: string) {
        this._borderColor = value;
        if (this._circle) {
            this._circle.stroke({ color: value, width: 2 });
        }
    }

    set dotColor(value: string) {
        this._dotColor = value;
        this.drawRadioDot();
    }

    set textColor(value: string) {
        this._textColor = value;
        if (this._text) {
            this._text.fill(value);
        }
    }

    idleupState(): void {
        this._circleColor = '#A881A1';
    }
    idledownState(): void {
        this._circleColor = '#F2CEEA';
    }
    pressReleaseState(): void {
        this._circleColor = '#545EEA';
    }
    pressedState(): void {
        this._circleColor = '#545EEA';
    }
    hoverState(): void {
        this._circleColor = '#C5B5C2';
    }
    hoverPressedState(): void {
        this._circleColor = '#BCE7EB';
    }
    pressedoutState(): void {
        this._circleColor = '#684761';
    }
    moveState(): void {
        this._circleColor = '#FF36D7';
    }
    keyupState(keyEvent?: KeyboardEvent): void {
        if (keyEvent) {
            this._circleColor = '#AF59E9';
        }
    }
}

export { RadioButton };
