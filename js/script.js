

const books = [];
const pickButton = document.getElementById('buttonclick');
const aftable = document.getElementById('thistable');
const tbodyData= aftable.getElementsByTagName('tbody')[0];
const bookSelect = document.getElementById('bookSelect');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchbutton');
const loading = document.getElementById('loading');
const totalText = document.getElementById('total');
const alertContainer = document.getElementById('searchAlert');

generateCategories();
getBooks()

async function getBooks(){
    const books = await fetch('http://api-demo.rjaziz.web.id:3000/books')
    .then((response)=> response.json())
    .then((data)=> data.data)
    .catch((err)=> err);
    
    books.forEach((data) => {
        const bookOption = new Option(data.name, JSON.stringify(data),false)
        bookSelect.add(bookOption)
        
    });
    setTimeout(() => {
        loading.classList.add('d-none');
    }, 1500);
    
    
}





function generateCategories() {
    const book = new Book({ id: null, name: null, author: null, price: 0 });

    book.getKeys().forEach((item) => {
        const categoryOpt = new Option(item.toUpperCase(), item, false);
        categorySelect.add(categoryOpt);
    })

}
pickBook();
    searchByCategory();

function pickBook() {
    pickButton.addEventListener('click', function (ev) {
        try {
            const bookData = JSON.parse(bookSelect.value);
            const book = new Book(bookData);
            books.push(book);

            const row = tbodyData.insertRow();
            book.loopData((key, index) => {
                let cellValue = '';
                const cell = row.insertCell(index);

                if (key === 'price') {
                    cellValue = book.formatPrice();

                    cell.innerHTML = cellValue;
                    return;
                }

                cell.innerHTML = book.bookData[key];
            });

            const totalPrice = books.reduce((acc, curr) => {
                return acc += curr.price;
            }, 0);

            totalText.innerText = book.formatPrice(totalPrice);
        } catch (err) {
            console.error(err);
        }
    });
}



function searchByCategory() {
    searchButton.addEventListener('click', function (ev) {
        const searchValue = searchInput.value;
        const categoryValue = categorySelect.value;

        const isExist = books.length > 0
            ? books.some((item) => item[categoryValue]
                .toString()
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            : false;
        showAlert(isExist)

        setTimeout(() => {
            hideAlert();
        }, 3000);
    });
}

function showAlert(isExist) {
    alertContainer.classList.remove('d-none');
    alertContainer.classList.add('d-block');

    if (isExist) {
        alertContainer.classList.remove('alert-danger');
        alertContainer.classList.add('alert-success');
        alertContainer.innerText = 'Buku yg anda cari sudah tersedia!'
        return;
    }

    alertContainer.classList.remove('alert-success');
    alertContainer.classList.add('alert-danger');
    alertContainer.innerText = 'Buku yg anda cari belum tersedia!'
}

function hideAlert() {
    alertContainer.classList.remove('d-block');
    alertContainer.classList.add('d-none');
}
