'use strict';

(function () {

  var noticeForm = document.querySelector('.notice__form');
  noticeForm.setAttribute('name', 'notice__form');
  noticeForm.elements.address.setAttribute('required', 'required');

  noticeForm.elements.title.setAttribute('required', 'required');
  noticeForm.elements.title.setAttribute('minlength', '30');
  noticeForm.elements.title.setAttribute('maxlength', '100');

  noticeForm.elements.price.setAttribute('required', 'required');
  noticeForm.elements.price.setAttribute('type', 'number');
  noticeForm.elements.price.setAttribute('placeholder', '1000');
  noticeForm.elements.price.setAttribute('min', '1000');
  noticeForm.elements.price.setAttribute('max', '1000000');
  noticeForm.setAttribute('action', 'https://1510.dump.academy/keksobooking');

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  function syncValues(element, value) {
    element.value = value;
  }

  function syncValuesWithMin(element, value) {
    element.min = value;
    element.value = value;
  }

  window.synchronizeField(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeField(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);


  var formType = document.querySelector('#type');
  var formPrice = document.querySelector('#price');

  window.synchronizeField(formType, formPrice, ['flat', 'house', 'bungalo', 'palace'], [1000, 5000, 0, 10000], syncValuesWithMin);

  var formRoomNumber = document.querySelector('#room_number');
  var formCapacity = document.querySelector('#capacity');
  formCapacity.value = formRoomNumber.value;

  hideCapacity();

  formRoomNumber.addEventListener('change', function () {
    resetCapacity();
    if (formRoomNumber.value === '100') {
      formCapacity.value = 0;
      hideCapacity();
    } else if (formRoomNumber.value === '1') {
      formCapacity.value = 1;
      hideCapacity();
    } else if (formRoomNumber.value === '2') {
      formCapacity.value = 2;
      hideCapacityNumber(0);
      hideCapacityNumber(3);
    } else {
      formCapacity.value = 3;
      hideCapacityNumber(3);
    }
  });

  function hideCapacityNumber(number) {
    formCapacity.options[number].setAttribute('hidden', 'hidden');
  }
  function hideCapacity() {
    for (var i = 0; i < formCapacity.options.length; i++) {
      formCapacity.options[i].setAttribute('hidden', 'hidden');
    }
  }
  function resetCapacity() {
    for (var i = 0; i < formCapacity.options.length; i++) {
      formCapacity.options[i].removeAttribute('hidden');
    }
  }

  noticeForm.addEventListener('input', checkValidity, true);
  noticeForm.addEventListener('invalid', checkValidity, true);

  function checkValidity(event) {
    if (!event.target.validity.valid) {
      event.target.style.border = '2px solid red';
    } else {
      event.target.style.border = '';
    }
  }

  var formSubmit = noticeForm.querySelector('.form__submit');

  function resetFormSubmit() {
    formSubmit.removeAttribute('disabled');
    formSubmit.style.backgroundColor = 'white';
    formSubmit.style.color = 'black';
    formSubmit.innerText = 'Опубликовать';
  }

  var nodeError = document.createElement('div');
  function postForm() {
    noticeForm.elements.address.style.border = '';
    formSubmit.style.fontSize = '22px';
    formSubmit.style.color = 'white';
    formSubmit.style.backgroundColor = 'darker';
    formSubmit.innerText = 'Опубликовано';
    formSubmit.style.backgroundColor = '#ffaa99';
    formSubmit.setAttribute('disabled', 'disabled');
    noticeForm.reset();
    noticeForm.addEventListener('input', function () {
      resetFormSubmit();
    });
    formCapacity.value = formRoomNumber.value;
    if (nodeError) {
      noticeForm.removeChild(nodeError);
    }
  }

  noticeForm.addEventListener('submit', function (event) {
    window.backend.save(new FormData(noticeForm), postForm, window.showPostFormError);
    event.preventDefault();
  });
})();

