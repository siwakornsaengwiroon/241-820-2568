const validateData = (userData) => {
    let errors = [];

    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }

    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }

    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }

    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }

    if (!userData.interests) {
        errors.push('กรุณาเลือกงานอดิเรก');
    }

    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }

    return errors;
}


const submitData = async () => {

    let firstNameDOM = document.querySelector('input[name=firstName]');
    let lastNameDOM = document.querySelector('input[name=lastName]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');

    try {

        let interest = '';

        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value;

            if (i != interestDOMs.length - 1) {
                interest += ',';
            }
        }

        let userData = {
            firstName: firstNameDOM.value.trim(),
            lastName: lastNameDOM.value.trim(),
            age: ageDOM.value,
            gender: genderDOM.value || '',
            description: descriptionDOM.value.trim(),
            interests: interest
        }

        console.log('submitData', userData);

        const response = await axios.post(
            'http://localhost:8000/users',
            userData
        );

        console.log('response', response);

        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';

    } catch (error) {

        console.log('error message', error.message);

        if (error.response) {

            error.message = error.response.data.message;
            error.errors = error.response.data.errors || [];

        }

        let htmlData = '<div>';

        htmlData += `<div>${error.message}</div>`;

        if (error.errors && error.errors.length > 0) {

            htmlData += '<ul>';

            for (let i = 0; i < error.errors.length; i++) {
                htmlData += `<li>${error.errors[i]}</li>`;
            }

            htmlData += '</ul>';

        }

        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
}