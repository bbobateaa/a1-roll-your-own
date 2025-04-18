import { Widget, Window, RoleType, EventArgs } from "../core/ui";
import { Rect, Text, Box } from "../core/ui";

class NavBarWidget extends Widget {
    private _buttons: Array<{ label: string, rect: Rect, text: Text }>;
    private _fontSize: number;
    private _buttonHeight: number;
    private _buttonWidth: number;
    private _buttonColor: string;
    x: number;
    y: number;

    constructor(parent: Window, fontSize: number = 18, buttonHeight: number = 40, buttonWidth: number = 100) {
        super(parent);

        this._fontSize = fontSize;
        this._buttonHeight = buttonHeight;
        this._buttonWidth = buttonWidth;
        this._buttonColor = "#F2CEEA";
        this._buttons = [];
        
        this.width = 300;
        this.height = buttonHeight;

        this.role = RoleType.generic;

        console.log("NavBarWidget initialized");
        this.render();
    }

    render() {
        console.log("Rendering NavBarWidget");

        this._group = (this.parent as Window).window.group();
        
        const labels = ["Home", "About", "Contact"];
        let currentX = 0;

        labels.forEach(label => {
            this.createButton(label, currentX);
            currentX += this._buttonWidth;
        });

        let eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 1);
        
        this.registerEvent(eventrect);
        
        console.log("NavBarWidget rendered with buttons");
    }

    private createButton(label: string, xPosition: number) {
        console.log(`Creating button: ${label}`);

        const buttonRect = this._group.rect(this._buttonWidth, this._buttonHeight).move(xPosition, 0);
        buttonRect.fill(this._buttonColor).radius(5);

        const buttonText = this._group.text(label).font('size', this._fontSize);
        const box: Box = buttonText.bbox();
        buttonText.x(xPosition + (this._buttonWidth / 2) - (box.width / 2));
        buttonText.y(this._buttonHeight / 2 - box.height / 2);

        buttonRect.on('click', () => this.onButtonClick(label));

        this._buttons.push({ label, rect: buttonRect, text: buttonText });
    }

    private onButtonClick(label: string) {
        console.log(`Button clicked: ${label}`);
    }

    move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        if (this._group) {
            this._group.translate(x, y);
            console.log(`[NavBarWidget] Moved to x:${x}, y:${y}`);
        }
    }

    set buttonColor(value: string) {
        this._buttonColor = value;
        console.log("Button color updated to:", value);

        this._buttons.forEach(button => {
            button.rect.fill(this._buttonColor);
        });
    }

    idleupState() {
        this._buttonColor = '#A881A1';
        console.log("[NavBarWidget] idleupState triggered");
    }

    idledownState() {
        this._buttonColor = '#F2CEEA';
        console.log("[NavBarWidget] idledownState triggered");
    }

    pressReleaseState() {
        this._buttonColor = '#545EEA';
        console.log("[NavBarWidget] pressReleaseState triggered");
    }

    pressedState() {
        this._buttonColor = '#545EEA';
        console.log("[NavBarWidget] pressedState triggered");
    }

    hoverState() {
        this._buttonColor = '#C5B5C2';
        console.log("[NavBarWidget] hoverState triggered");
    }

    hoverPressedState() {
        this._buttonColor = '#BCE7EB';
        console.log("[NavBarWidget] hoverPressedState triggered");
    }

    pressedoutState() {
        this._buttonColor = '#684761';
        console.log("[NavBarWidget] pressedoutState triggered");
    }

    moveState() {
        this._buttonColor = '#FF36D7';
        console.log("[NavBarWidget] moveState triggered");
    }

    keyupState(keyEvent?: KeyboardEvent) {
        if (keyEvent) {
            this._buttonColor = '#AF59E9';
            console.log(`[NavBarWidget] keyupState triggered by key: ${keyEvent.key}`);
        } else {
            console.log("[NavBarWidget] keyupState triggered");
        }
    }
}

export { NavBarWidget };
