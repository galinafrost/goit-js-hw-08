'use strict';
import throttle from 'lodash.throttle';
import localStorageApi from './localstorage';

const contactFormEl = document.querySelector('.feedback-form');
const formForData = {};

contactFormEl.addEventListener('input', throttle((event) => {
    const target = event.target;

    formForData[target.name] = target.value;
    localStorageApi.save('formForData', formForData);
}, 500));

contactFormEl.addEventListener('submit', event => {
    event.preventDefault();

    event.target.reset();
    localStorageApi.remove('formForData');

    console.log(formForData);
});

const fillFormFields = () => {
    if (!localStorage.length) {
      return;
    }
  
    const localStorageFormData = localStorageApi.load('formForData');
    const keys = Object.keys(localStorageFormData);
  
    for (const key of keys) {
      contactFormEl.elements[key].value = localStorageFormData[key];
    }
  };
  
  fillFormFields();
