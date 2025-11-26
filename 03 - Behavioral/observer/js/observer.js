class Subject {

    constructor () {
        this.observers = []
    }

    suscribe(observer){
        this.observers.push(observer)
    }

    unsuscribe(observer){
        this.observers = this.observers.filter((suscriber) => suscriber !== observer )
    }

    notify(data){
        this.observers.forEach(observer => {
            observer.refresh(data)
        })
    }


}

class ItemsSubject extends Subject {

    constructor(){
        super();
        this.data = [];
    }

    add(item) {
        this.data.push(item);
        this.notify(item);
    }
}

class Observer {

    constructor (element) {
        this.element = element
    }

    refresh(data){
        this.element.innerHTML += `<div class="item">
            ${data}
        </div>`
    }
}

const item = new ItemsSubject();
const div1Observer = new Observer(div1);
const div2Observer = new Observer(div2);

// Subscribe both observers to the subject
item.suscribe(div1Observer);
item.suscribe(div2Observer);

console.log("✅ Two observers subscribed to the subject");

function getValue() {
    const value = txtName.value.trim();
    if (value) {
        item.add(value);
        txtName.value = '';
        txtName.focus();
    }
}
