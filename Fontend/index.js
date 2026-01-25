function submitData(data){
    let firstNameDOM = document.querySelector('input[name=firstName]');
    let lastNameDOM = document.querySelector('input[name=lastName]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]'):checked;
    let interestDOM = document.querySelectorAll('input[name=interest]'):checked;
    let descriptionDOM = document.querySelector('textarea[name=description]'):checked;

    let interest =''
    for (let i =0; i <interestDOMs.length; i++) {
        interest += interestDOM[i].value
        if (i !=interestDOM.length - 1) {
            interest += ','
        }
    }
    let userData = {
        firstName:firstNameDOM.value,
        lastName:lastNameDOM.value,
        age:ageDOM.value,
        gender:genderDOM.value,
        description:descriptionDOM,
        interest:interest
    }
    console.log('submit data,userData');
}