// setup.js
'use strict';

// Данные для генерации магов
var WIZARD_FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// Сколько генерируем магов
var wizardsQuantity = 4;

// Просто объявляем
var wizards = [];

// Открывем окно настроек
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Пара переменных для счастья
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Функция выбора случайных элеменов массива
var chooseRandomArrElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функции генерации массива объектов магов
var generateWizards = function (wizardsArr) {
  for (var i = 0; i < wizardsQuantity; i++) {
    var randomFirstName = chooseRandomArrElement(WIZARD_FIRST_NAME);
    var randomSecondName = chooseRandomArrElement(WIZARD_SECOND_NAME);
    var randomCoatColor = chooseRandomArrElement(WIZARD_COAT_COLOR);
    var randomEyesColor = chooseRandomArrElement(WIZARD_EYE_COLOR);
    wizardsArr[i] = {
      name: randomFirstName + ' ' + randomSecondName,
      coatColor: randomCoatColor,
      eyesColor: randomEyesColor
    };
  }
  return wizardsArr;
};

// Генерируем магов;)
wizards = generateWizards(wizards);

// Функуия заполнения
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Оптимально отрисовываем
var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


