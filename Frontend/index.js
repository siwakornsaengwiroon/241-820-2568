const BASE_URL = 'http://localhost:8000';

let mode = 'Create';
let selectedId = '';

window.onload = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);

    if (id) {

        mode = 'Edit';
        selectedId = id;

        try {

            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const user = response.data;

            console.log('response', user);

            const firstNameDOM = document.querySelector('input[name="firstName"]');
            const lastNameDOM = document.querySelector('input[name="lastName"]');
            const ageDOM = document.querySelector('input[name="age"]');
            const descriptionDOM = document.querySelector('textarea[name="description"]');

            if (firstNameDOM) firstNameDOM.value = user.firstname || '';
            if (lastNameDOM) lastNameDOM.value = user.lastname || '';
            if (ageDOM) ageDOM.value = user.age || '';
            if (descriptionDOM) descriptionDOM.value = user.description || '';

            // gender
            const genders = document.querySelectorAll('input[name="gender"]');

            genders.forEach(g => {
                if (g.value === user.gender) {
                    g.checked = true;
                }
            });

            // interests
            const userInterests = user.interests ? user.interests.split(',') : [];
            const interestDOMs = document.querySelectorAll('input[name="interests"]');

            interestDOMs.forEach(i => {
                if (userInterests.includes(i.value)) {
                    i.checked = true;
                }
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
};


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
};


const submitData = async () => {

    const firstNameDOM = document.querySelector('input[name="firstName"]');
    const lastNameDOM = document.querySelector('input[name="lastName"]');
    const ageDOM = document.querySelector('input[name="age"]');
    const genderDOM = document.querySelector('input[name="gender"]:checked');
    const interestDOMs = document.querySelectorAll('input[name="interests"]:checked');
    const descriptionDOM = document.querySelector('textarea[name="description"]');
    const messageDOM = document.getElementById('message');

    try {

        let interest = '';

        interestDOMs.forEach((item, index) => {
            interest += item.value;
            if (index !== interestDOMs.length - 1) {
                interest += ',';
            }
        });

        const userData = {
            firstName: firstNameDOM.value.trim(),
            lastName: lastNameDOM.value.trim(),
            age: ageDOM.value,
            gender: genderDOM ? genderDOM.value : '',
            description: descriptionDOM.value.trim(),
            interests: interest
        };

        console.log('submitData', userData);

        const errors = validateData(userData);

        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }

        let response;
        let message = '';

        if (mode === 'Create') {

            response = await axios.post(`${BASE_URL}/users`, userData);
            message = 'เพิ่มข้อมูลสำเร็จ';

        } else {

            response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
            message = 'แก้ไขข้อมูลสำเร็จ';

        }

        console.log('response', response.data);

        messageDOM.innerText = message;
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

            error.errors.forEach(err => {
                htmlData += `<li>${err}</li>`;
            });

            htmlData += '</ul>';
        }

        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
};