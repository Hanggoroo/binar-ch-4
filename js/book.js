class Book {
    constructor({ id, name, author, price }) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.price = price;

        this.bookData = { id, name, author, price };
    }

    getKeys() {
        return ['id', 'name', 'author', 'price'];
    }

    loopData(operation) {
        Object
            .keys(this.bookData)
            .forEach((key, index) => {
                operation(key, index);
            });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        })
            .format(price || this.price)
            .replace(/([.,])00$/g, '');
    }
}