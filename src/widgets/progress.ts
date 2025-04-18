import { Window, Widget, RoleType } from "../core/ui";
import { Rect } from "../core/ui";

class ProgressBar extends Widget {
    private _rectBackground: Rect;
    private _rectForeground: Rect;
    private _progress: number = 0;
    private _maxProgress: number = 100;
    private _barWidth: number = 300;
    private _barHeight: number = 25;
    private _onIncrement?: (value: number) => void;
    private _onStateChange?: () => void;
    private fontSize: number = 18;
    private defaultHeight: number = 300;
    private defaultWidth: number = 12;
    private _foreColor: string = "#A881A1";
    private _backColor: string = "#F2CEEA";
    y: number;
    x: number;

    constructor(parent: Window) {
        super(parent);
        this.width = this._barWidth;
        this.height = this._barHeight;
        this.role = RoleType.none;
        this.render();

        console.log("[ProgressBar] Initialized");
    }

    render(): void {
        if (this._group) return;

        this._group = (this.parent as Window).window.group();

        this._rectBackground = this._group.rect(this._barWidth, this._barHeight).fill(this._backColor);
        this._rectForeground = this._group.rect(0, this._barHeight).fill(this._foreColor);

        console.log("[ProgressBar] Rendered");
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 3);
        
        this.registerEvent(eventrect);
    }

    set progressBarWidth(value: number) {
        console.log(`[ProgressBar] Width set to ${value}`);
        this._barWidth = value;
        this.width = value;

        if (this._rectBackground && this._rectForeground) {
            this._rectBackground.width(value);
            this.updateForeground();
        }
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this._group) {
            this._group.translate(x, y);
            console.log(`[ProgressBar] Moved to x:${x}, y:${y}`);
        }
    }

    set foreColor(value: string) {
        console.log(`[ProgressBar] Foreground color set to ${value}`);
        this._foreColor = value;
        if (this._rectForeground) {
            this._rectForeground.fill(value);
        }
    }

    set backColor(value: string) {
        console.log(`[ProgressBar] Background color set to ${value}`);
        this._backColor = value;
        if (this._rectBackground) {
            this._rectBackground.fill(value);
        }
    }

    increment(value: number): void {
        this._progress = Math.min(this._maxProgress, Math.max(0, value));
        this.updateForeground();

        console.log(`[ProgressBar] Incremented to ${this._progress}`);

        if (this._onIncrement) {
            console.log(`[ProgressBar] Triggering onIncrement with value: ${this._progress}`);
            this._onIncrement(this._progress);
        }

        if (this._onStateChange) {
            console.log("[ProgressBar] Triggering onStateChange");
            this._onStateChange();
        }
    }

    get getIncrementValue(): number {
        console.log(`[ProgressBar] Getting increment value: ${this._progress}`);
        return this._progress;
    }

    set setIncrementValue(value: number) {
        console.log(`[ProgressBar] Setting increment value to ${value}`);
        this.increment(value);
    }

    onIncrement(callback: (value: number) => void): void {
        this._onIncrement = callback;
        console.log(`[ProgressBar] onIncrement event handler attached`);
    }

    onStateChange(callback: () => void): void {
        this._onStateChange = callback;
        console.log("[ProgressBar] onStateChange event handler attached");
    }

    private updateForeground(): void {
        const width = (this._progress / this._maxProgress) * this._barWidth;
        this._rectForeground.width(width);
        console.log(`[ProgressBar] Foreground updated to width: ${width}`);
    }

    idleupState() {
        this.backcolor = '#A881A1';
        console.log("[ProgressBar] idleupState triggered");
    }

    idledownState() {
        this.backcolor = '#F2CEEA';
        console.log("[ProgressBar] idledownState triggered");
    }

    pressReleaseState() {
        this.backcolor = '#545EEA';
        console.log("[ProgressBar] pressReleaseState triggered");
    }

    pressedState() {
        this.backcolor = '#545EEA';
        console.log("[ProgressBar] pressedState triggered");
    }

    hoverState() {
        this.backcolor = '#C5B5C2';
        console.log("[ProgressBar] hoverState triggered");
    }

    hoverPressedState() {
        this.backcolor = '#BCE7EB';
        console.log("[ProgressBar] hoverPressedState triggered");
    }

    pressedoutState() {
        this.backcolor = '#684761';
        console.log("[ProgressBar] pressedoutState triggered");
    }

    moveState() {
        this.backcolor = '#FF36D7';
        console.log("[ProgressBar] moveState triggered");
    }

    keyupState(keyEvent?: KeyboardEvent) {
        if (keyEvent) {
            this.fontSize = 20;
            this.defaultHeight = 40;
            this.backcolor = '#AF59E9';
            console.log(`[ProgressBar] keyupState triggered by key: ${keyEvent.key}`);
        } else {
            console.log("[ProgressBar] keyupState triggered");
        }
    }
}

export { ProgressBar };
