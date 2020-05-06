class Component {
    constructor(element) {
        this.element = element;
        this.button = this.element.querySelector('.js-button');
        this.counter = this.element.querySelector('.js-counter');

        this.setListeners();
        this.init();
    }

    setListeners() {
        this.button.addEventListener('click', () => {
            this.counter.innerHTML++;
        })
    }

    init () {
        console.log("Js works, yaaaaaaaaaay!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.js-component');

    items.forEach((item) => {
        new Component(item);
    });
});
