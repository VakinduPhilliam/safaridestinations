/* eslint-disable prettier/prettier */
async function fileUpload(formElement) {
  const formData = new FormData(formElement);
  try {
    const response = await fetch('http://localhost:6300/add', {
      method: 'POST',
      body: formData,
      dataType: 'jsonp',
    });
    if (response.status === 200 || response.status === 201) {
      alert('New Travel destination Added..!');
      window.location.href = 'http://localhost:6300/';
    } else {
      alert('Problem adding new travel destination...!');
    }
  } catch (e) {
    console.log(e);
    alert('Problem adding new travel destination..!');
  }
}
