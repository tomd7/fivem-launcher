class Background {
    constructor(backgroundElement) {
        this.elem = backgroundElement;
        this.initCoords = { x: 0, y: 0 };
        this.multiplier = 0.01;

        this.initEvents();
    }

    initEvents() {
        const registerCoords = e => {
            this.initCoords = {
                x: e.clientX,
                y: e.clientY
            };
            document.body.removeEventListener('mousemove', registerCoords);
        };

        document.body.addEventListener('mousemove', registerCoords);
        document.body.addEventListener('mousemove', e => {
            const x = (e.clientX - this.initCoords.x);
            const y = (e.clientY - this.initCoords.y);
            this.move(x, y, this.multiplier);
        });
    }

    move(x, y, multiplier) {
        x *= multiplier;
        y *= multiplier;
        backgroundImage.style.transform = `translate3d(calc(-50% - ${x}px), calc(-50% - ${y}px), 0)`;
    }
}