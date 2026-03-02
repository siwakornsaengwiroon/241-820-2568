const submitData = async () => {

    let firstNameDOM = document.querySelector('input[name=firstName]')
    let lastNameDOM = document.querySelector('input[name=lastName]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked')
    let interestsDOM = document.querySelectorAll('input[name=interests]:checked')
    let descriptionDOM = document.querySelector('textarea[name=description]')
    let messageDOM = document.getElementById('message')

    // reset message ก่อน
    messageDOM.innerText = ''
    messageDOM.className = 'message'

    // ✅ VALIDATION
    if (!firstNameDOM.value.trim()) {
        showError('กรุณากรอกชื่อ')
        return
    }

    if (!lastNameDOM.value.trim()) {
        showError('กรุณากรอกนามสกุล')
        return
    }

    if (!ageDOM.value.trim()) {
        showError('กรุณากรอกอายุ')
        return
    }

    if (!genderDOM) {
        showError('กรุณาเลือกเพศ')
        return
    }

    if (interestsDOM.length === 0) {
        showError('กรุณาเลือกงานอดิเรก')
        return
    }

    if (!descriptionDOM.value.trim()) {
        showError('กรุณากรอกคำอธิบาย')
        return
    }

    try {

        let interests = ''
        interestsDOM.forEach((item, index) => {
            interests += item.value
            if (index !== interestsDOM.length - 1) {
                interests += ', '
            }
        })

        const userData = {
            firstName: firstNameDOM.value,
            lastName: lastNameDOM.value,
            age: parseInt(ageDOM.value),
            gender: genderDOM.value,
            interests: interests,
            description: descriptionDOM.value
        }

        await axios.post('http://localhost:8000/users', userData)

        messageDOM.innerText = 'บันทึกข้อมูลสำเร็จ'
        messageDOM.className = 'message success'

    } catch (error) {

        showError('เกิดข้อผิดพลาดในการบันทึกข้อมูล')

    }
}


// ✅ function แสดง error สีแดง
function showError(text) {
    let messageDOM = document.getElementById('message')
    messageDOM.innerText = text
    messageDOM.className = 'message danger'
}