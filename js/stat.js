// stat.js
'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Переменные для облака
  var cloudInitialX = 100;
  var cloudInitialY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColour = 'rgba(0, 0, 0, 0.7)';
  // Переменные текста облака
  var cloudText = 'Ура вы победили!\nСписок результатов:';
  var cloudTextColour = '#000';
  var cloudTextStyle = '16px PT Mono';
  var cloudTextInitialX = 120;
  var cloudTextInitialY = 40;
  var cloudTextHeightInPX = 20;

  // Переменные для тени
  var cloudShadowOffsetX = 10;
  var cloudShadowOffsetY = 10;
  var cloudShadowColour = 'rgba(255, 255, 255, 1.0)';

  // Переменные для гистораммы
  var histogramHeight = 150;
  var histogramColumnWidth = 40;
  var histogramColumnSpace = 50;
  var histogramInitialX = 120;
  var histogramInitialY = 100;
  var histogramMyColumnName = 'Вы';
  var histogramMyColumnColour = 'rgba(255, 0, 0, 1.0)';
  var histogramTetxUpOffset = 10;


  // Функция рисования окна статистики
  var drawStatCloud = function (x, y, width, height, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height);
  };

  // Рисуем тень
  drawStatCloud(cloudInitialX + cloudShadowOffsetX, cloudInitialY + cloudShadowOffsetY, cloudWidth, cloudHeight, cloudColour);
  // Рисуем облако
  drawStatCloud(cloudInitialX, cloudInitialY, cloudWidth, cloudHeight, cloudShadowColour);

  // Функция написания на облаке
  var writeOnStatCloud = function (text, x, y, colour, font) {
    ctx.fillStyle = colour;
    ctx.font = font;
    text.split('\n').forEach(function (textLine, i) {
      ctx.fillText(textLine, x, y + cloudTextHeightInPX * i);
    });
  };

  // Пишем текст на облаке
  writeOnStatCloud(cloudText, cloudTextInitialX, cloudTextInitialY, cloudTextColour, cloudTextStyle);

  // Ищем максимальное время для масштабирования
  var maxOfTimes = Math.max.apply(null, times);

  // Вычислем пропорцию для гисторгамм
  var historamStep = histogramHeight / maxOfTimes;
  // Функция рисования гистограмм
  var drawStatColumnWithText = function (namesArr, timesArr, xStartDraw, yStartDraw, step, columnWidth, columnSpace) {
    for (var i = 0; i < timesArr.length; i++) {
      var x = xStartDraw + (columnWidth + columnSpace) * i;
      var y = yStartDraw - timesArr[i] * step;
      var height = timesArr[i] * step;
      var width = columnWidth;
      var randomDigitFrom1to02 = (Math.random() * (1 - 0.2) + 0.2);
      var histogramColumnColour = 'rgba(0, 0, 255, ' + randomDigitFrom1to02 + ')';
      ctx.fillStyle = (namesArr[i] === histogramMyColumnName) ? histogramMyColumnColour : histogramColumnColour;
      ctx.fillRect(x, y, width, height);
      ctx.fillStyle = cloudTextColour;
      ctx.font = cloudTextStyle;
      ctx.fillText(namesArr[i], x, yStartDraw + cloudTextHeightInPX);
      ctx.fillText(Math.round(timesArr[i]), x, y - histogramTetxUpOffset);
    }
  };
  drawStatColumnWithText(names, times, histogramInitialX, histogramInitialY + histogramHeight, historamStep, histogramColumnWidth, histogramColumnSpace);
};
