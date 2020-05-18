/**
 * @author: Ray Caballero
 */

// Adds code lines in the Inquiry form
for (let i = 1; i <= 24; i++) {
    const line = document.createElement('p');

    line.className = 'small text-evening-blue font-weight-bold mb-1';
    line.innerHTML = (i < 10 ? '0' : '') + i;
    document.getElementById('lines').appendChild(line);
}

// validates if the field has value
const requireField = value => value ? true : false;

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}


// validates if the field's value is a valid e-mail address
const validateEmail = value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value));

// validates if the supplied field value generates an error or not
const validateField = (element, name) => {
    let isValid = false;

    //if (!requireField(element.value)) {
    if (isEmptyOrSpaces(element.value)) {
        generateError(element, true, name + ' field is required');
    }
    else if (element.type === 'email' && !validateEmail(element.value)) {
        generateError(element, true, 'Must be a valid e-mail address');
    }
    else {
        generateError(element, false);
        isValid = true;
    }

    return isValid;
}

// styles the field to specify the errors if there are any; removes them otherwise
const generateError = (element, withError, message = '') => {
    const errorMessage = element.nextElementSibling;

    if (!withError) {
        element.classList.add('border-night-blue')
        element.classList.remove('is-invalid');
        errorMessage.classList.add('d-none');
        errorMessage.innerHTML = '';
    } else {
        element.classList.remove('border-night-blue')
        element.classList.add('is-invalid');
        errorMessage.classList.remove('d-none');
        errorMessage.innerHTML = message;
    }
}

const submitInquiry = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const validationResults = [
        validateField(name, 'Name'),
        validateField(email, 'E-mail Address'),
        validateField(subject, 'Subject'),
        validateField(message, 'Message'),
    ];

    if (validationResults.every(x => x === true)) {
        document.getElementById('pendingInquiry').classList.add('d-none');
        document.getElementById('inquirySubmitted').classList.remove('d-none');


        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "http://18.141.94.34:8095/api/inquiry", true);
        // xhr.open("POST", "http://localhost:8095/api/inquiry", true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhr.send(JSON.stringify(
        //     {
        //         "name": name.value,
        //         "email": email.value,
        //         "subject": subject.value,
        //         "message": message.value
        //     }
        // ));

        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == XMLHttpRequest.DONE) {
        //         alert(JSON.parse(xhr.responseText).message);
        //     }
        // }

        // Send a POST request
        axios({
            method: 'post',
            baseURL: 'http://18.141.94.34:8095',
            url: '/api/inquiry',
            config: {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Origin': '*'
                }
            },
            data: {
                name: name.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
            }
        }).then(res => {
            alert(res.data.message)
            name.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        })
            .catch(err => {
                alert(err)
                if (err.response) {
                }
            });
    } else {
        document.getElementById('pendingInquiry').classList.remove('d-none');
        document.getElementById('inquirySubmitted').classList.add('d-none');
    }
}