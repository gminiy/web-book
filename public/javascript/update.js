const submitButton = document.querySelector('.submit-button');
const xhr = new XMLHttpRequest();
const title = document.querySelector('.title');
const author = document.querySelector('.author');
const publisher = document.querySelector('.publisher');
const publicationDate = document.querySelector('.publicationDate');
const description = document.querySelector('.description');

submitButton.addEventListener('click', () => {
    const bookID = event.target.id;
    xhr.open('PUT', `/book?id=${bookID}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const info = {
        "title": title.value, 
        "author": author.value,
        "publisher": publisher.value,
        "publicationDate": publicationDate.value,
        "description": description.value
    };
    
    if (info.title === "") {
        return alert('책 제목 꼭 필요!');
    } else if (info.author === "") {
        return alert('지은이 꼭 필요!!');
    } else if (info.publisher === "") {
        return alert('출판사 꼭 필요!!!');
    } else if (info.publicationDate === "") {
        return alert('출판일 꼭 필요!');
    } else if (info.description === "") {
        return alert('책 설명 꼭 필요!!');
    }

    xhr.send(JSON.stringify(info));
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            window.location.href = '/';
        } 
    }
});