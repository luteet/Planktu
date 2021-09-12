let firstCheck = false,
    lastValue = '',
    select = document.querySelector(`.featured__type-list--select`),
    file = {
        'relevant': 'json/products.json',
        'descending': 'json/products-to-up.json',
        'ascending': 'json/products-to-down.json',
    };


    


if(localStorage['select'] === undefined) {
    localStorage['select'] = 'relevant';
} 

select.value = localStorage['select'];

getProducts({
    file: file[localStorage['select']],
    removePrev: true,
});

document.body.addEventListener('click', function (e) {

    //let productsJson = '../json/products.json';
    if (e.target.classList.contains('featured__type-list--select')) {
        let selectValue = e.target.value;

        if (lastValue != selectValue && firstCheck == true) {
            lastValue = selectValue;

            switch (selectValue) {
                case "relevant":
                    localStorage['select'] = 'relevant';
                    getProducts({
                        file: file[localStorage['select']],
                        removePrev: true,
                    });
                    break;
                case "descending":
                    localStorage['select'] = 'descending';
                    getProducts({
                        file: file[localStorage['select']],
                        removePrev: true,
                    });
                    break;
                case "ascending":
                    localStorage['select'] = 'ascending';
                    getProducts({
                        file: file[localStorage['select']],
                        removePrev: true,
                    });
                    break;
            }
        }
        else {
            firstCheck = true;
        }
    }


});