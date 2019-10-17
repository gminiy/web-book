const xhr = new XMLHttpRequest();
const idForm = document.getElementById('id');
const passwordForm = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
idForm.focus();

const login = () => {
    xhr.open('POST', '/auth/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    const info = {
        "id": idForm.value,
        "password": passwordForm.value
    };
    xhr.send(JSON.stringify(info));
    xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
            alert("로그인되었습니다.");
            return window.location.href = '/';
        } else if (xhr.status === 409) {
            alert("아이디와 비밀번호를 확인해주세요.");
        }
    }
}

loginButton.addEventListener('click', login);

passwordForm.addEventListener('keypress', (e) => {
    const key = e.which || e.keyCode;
    if (key === 13) login();
});

signupButton.addEventListener('click', () => {
    window.location.href = '/signup';
});