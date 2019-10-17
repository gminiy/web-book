const deleteButtons = document.getElementsByClassName('delete-button');
const updateButtons = document.getElementsByClassName('update-button');

for (deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', (event) => {
        const book = event.target.parentNode.parentNode;
        const bookID = book.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    window.location.href = '/';
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('DELETE', `/book/?id=${bookID}`);
        xhr.send();
    });
}

for (updateButton of updateButtons) {
    updateButton.addEventListener('click', (event) => {
        const book = event.target.parentNode.parentNode;
        const bookID = book.id;
        window.location.href = `/book/update?id=${bookID}`;
    });
}