const dataGamburger = {
    burger: {
        big: {
            price: 100,
            calories: 40
        },
        small: {
            price: 50,
            calories: 20
        }
    },
    stuffing: {
        cheese: {
            price: 10,
            calories: 20
        },
        salad: {
            price: 20,
            calories: 5
        },
        potato: {
            price: 15,
            calories: 10
        }
    },
    optionally: {
        spice: {
            price: 15,
            calories: 0
        },
        mayonnaise: {
            price: 20,
            calories: 5
        }
    }
}
const typeInput = ['radio', 'checkbox'];
const formData = {
    burger: 'big',
    stuffing: 'cheese',
    optionally: {
        spice: '',
        mayonnaise: ''
    }
}


window.addEventListener('load', () => {
    typeInput.map(item => {
        const arrEl = document.querySelectorAll(`input[type=${item}]`);
        arrEl.forEach(el => el.addEventListener('click', (e) => getValueElement(e.target)))
    })
    const messageText = document.querySelector('#message');

    document.querySelector('#getCalories').addEventListener('click', (e) => {
        e.preventDefault();
        const burger = formData.burger === "small"? new SmallGamBurger(formData.stuffing): new BigGamBurger(formData.stuffing);
        burger.fetchDataBurger();
        messageText.innerHTML = `${burger.calculateCalories(formData)} калорий`;
    })
    document.querySelector('#getPrice').addEventListener('click', (e) => {
        e.preventDefault();
        const burger = formData.burger === "small"? new SmallGamBurger(formData.stuffing): new BigGamBurger(formData.stuffing);
        burger.fetchDataBurger();
        messageText.innerHTML = `${burger.calculatePrice(formData)} цена`;
    })
})


const getValueElement = (el) => {
    if (el.type == 'radio') {
        formData[el.name] = el.value;
    }
    else
        if (el.checked) formData['optionally'][el.value] = (el.value);
        else formData['optionally'][el.value] = '';
}


class GamBurger {
    dataBurger = {};
    constructor(stuffing = '', name = '') {
        this.name = name;
        this.stuffing = stuffing;
    }
    fetchDataBurger(){
        this.dataBurger = dataGamburger
    }

    calculateParameters(res, param){
        let sum = 0;
        for (let i in res){
            if (i==='optionally') {
                for(let j in res[i]){
                    if(this.dataBurger[i][res[i][j]])
                        sum += this.dataBurger[i][res[i][j]][param];
                }
                continue;
            }
            sum += this.dataBurger[i][res[i]][param]
        }
        return sum;
    }

    calculatePrice(res) {
        return this.calculateParameters(res, 'price');
    }
    calculateCalories(res) {
        return this.calculateParameters(res, 'calories');
     }
}

class BigGamBurger extends GamBurger {
    constructor(stuffing = 'cheese', name='big') {
        super(stuffing, name)
    }
}
class SmallGamBurger extends GamBurger {
    constructor(stuffing = 'cheese', name='small') {
        super(stuffing, name)
    }
}
