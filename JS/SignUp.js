function selectGender(gender) {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}