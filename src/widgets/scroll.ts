import { Window, Widget, RoleType } from "../core/ui";
import { Rect } from "../core/ui";
import '@svgdotjs/svg.draggable.js';

class Scroll extends Widget {
    private _rect: Rect;
    private defaultWidth: number = 12;
    private defaultHeight: number = 300;
    private _upButton: Rect;
    private _downButton: Rect;
    private _track: Rect;
    private _thumb: Rect;
    private fontSize: number = 18;
    private _thumbHeight: number = 40;
    private _scrollHeight: number = 200;
    private _thumbY: number = 30;
    private _onScroll?: (direction: "up" | "down", position: number) => void;
    private _trackColor: string = "#F2CEEA";
    private _thumbColor: string = "#B1569F";
    private _buttonColor: string = "#A881A1";
    x: number = 0;
    y: number = 0;

    constructor(parent: Window) {
        super(parent);
        this.height = this._scrollHeight;
        this.width = this.defaultWidth;
        this.role = RoleType.none;
        this.render();
        console.log("Scroll bar created with default height:", this._scrollHeight);
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 5);
        
        this.registerEvent(eventrect);

        this._upButton = this._group.rect(this.width, 30).fill(this._buttonColor);
        this._upButton.on("click", () => {
            this.scrollBy(-10);
            console.log("Up button clicked: Scrolling up");
        });

        this._track = this._group.rect(this.width, this.height - 60).fill(this._trackColor).y(this.y + 30);
        this._track.on("click", (e: MouseEvent) => {
            const mouseY = e.offsetY - this.y - 30;
            this.moveThumbTo(mouseY);
            console.log("Track clicked: Moving thumb to position", mouseY);
        });

        this._thumb = this._group.rect(this.width, this._thumbHeight).fill(this._thumbColor).y(this.y + this._thumbY);
        this._thumb.draggable().on("dragmove", (e) => {
            const event = e as CustomEvent;
            const trackTop = this.y + 30;
            const trackBottom = this.y + this.height - 30 - this._thumbHeight;
            const newY = Math.max(trackTop, Math.min(trackBottom, event.detail.box.y));
            const direction = newY > this.y + this._thumbY ? "down" : "up";

            this._thumb.y(newY);
            this._thumbY = newY - this.y;
            console.log(`Thumb moved: New position is ${this._thumbY}, direction: ${direction}`);
            this.triggerScrollEvent(direction);
        });

        this._downButton = this._group.rect(this.width, 30).fill(this._buttonColor).y(this.y + this.height - 30);
        this._downButton.on("click", () => {
            this.scrollBy(10);
            console.log("Down button clicked: Scrolling down");
        });
    }

    set trackColor(value: string) {
        this._trackColor = value;
        console.log("Track color changed to", value);
    }

    set thumbColor(value: string) {
        this._thumbColor = value;
        console.log("Thumb color changed to", value);
    }

    set buttonColor(value: string) {
        this._buttonColor = value;
        console.log("Button color changed to", value);
    }

    set scrollHeight(value: number) {
        this._scrollHeight = value;
        this.height = value;
        console.log("Scroll height changed to", value);
        if (this._track) {
            this._track.height(this.height - 60).y(this.y + 30);
        }

        if (this._thumb) {
            this._thumb.height(this._thumbHeight).y(this.y + this._thumbY);
        }

        if (this._downButton) {
            this._downButton.y(this.y + this.height - 30);
        }
    }

    get scrollPosition(): number {
        console.log("Current scroll position:", this._thumbY);
        return this._thumbY;
    }

    onScroll(callback: (direction: "up" | "down", position: number) => void): void {
        this._onScroll = callback;
        console.log("Scroll event handler set");
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        console.log(`Scroll bar moved to position (${x}, ${y})`);
        if (this._group) {
            this._group.move(x, y);
        }
        if (this._upButton) this._upButton.y(this.y);
        if (this._track) this._track.y(this.y + 30);
        if (this._thumb) this._thumb.y(this.y + this._thumbY);
        if (this._downButton) this._downButton.y(this.y + this.height - 30);
    }

    private scrollBy(delta: number): void {
        const newY = Math.max(30, Math.min(this.height - 30 - this._thumbHeight, this._thumbY + delta));
        const direction = delta > 0 ? "down" : "up";

        this._thumbY = newY;
        this._thumb.y(this.y + this._thumbY);
        console.log(`Scrolling by ${delta}: New thumb position ${this._thumbY}, direction: ${direction}`);
        this.triggerScrollEvent(direction);
    }

    private moveThumbTo(y: number): void {
        const trackTop = 0;
        const trackBottom = this.height - 60;
        const clampedY = Math.max(trackTop, Math.min(trackBottom, y));
        const direction = clampedY > this._thumbY ? "down" : "up";

        this._thumbY = clampedY;
        this._thumb.y(this.y + this._thumbY);
        console.log(`Thumb moved to ${this._thumbY}, direction: ${direction}`);
        this.triggerScrollEvent(direction);
    }

    private triggerScrollEvent(direction: "up" | "down" = "down") {
        if (this._onScroll) {
            console.log(`Scroll event triggered: ${direction} at position ${this._thumbY}`);
            this._onScroll(direction, this._thumbY);
        }
    }
    
    idleupState() {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#A881A1';
        console.log("Idle up state set");
    }

    idledownState() {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#F2CEEA';
        console.log("Idle down state set");
    }

    pressReleaseState() {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
        console.log("Press release state set");
    }

    pressedState() {
        this.fontSize = 10;
        this.defaultHeight = 80;
        this.defaultWidth = 80;
        this.backcolor = '#545EEA';
        console.log("Pressed state set");
    }

    hoverState() {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#C5B5C2';
        console.log("Hover state set");
    }

    hoverPressedState() {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#BCE7EB';
        console.log("Hover pressed state set");
    }

    pressedoutState() {
        this.fontSize = 20;
        this.defaultHeight = 40;
        this.backcolor = '#684761';
        console.log("Pressed out state set");
    }

    moveState() {
        this.fontSize = 100;
        this.defaultHeight = 100;
        this.backcolor = '#FF36D7';
        this.defaultWidth = 30;
        console.log("Move state set");
    }

    keyupState(keyEvent?: KeyboardEvent) {
        if (keyEvent) {
            this.fontSize = 20;
            this.defaultHeight = 40;
            this.backcolor = '#AF59E9';
            console.log("Key up state set");
        }
    }
}

export { Scroll };
