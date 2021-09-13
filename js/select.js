let select = document.querySelector(`.featured__type-list--select`),
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

select.addEventListener('change', function() {
    switch (this.value) {
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
});
