// stat.js
'use strict';

window.renderStatistics = function (ctx, names, times) {
  // Функция рисования окна статистики
  var drawStatCloud = function (x, y, width, height, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height);
  };

  // Рисуем тень
  drawStatCloud(110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  // Рисуем облако
  drawStatCloud(100, 10, 420, 270, 'rgba(255, 255, 255, 1.0)');

  // Функция написания на облаке
  var writeOnStatCloud = function (text, x, y, colour, font) {
    ctx.fillStyle = colour;
    ctx.font = font;
    text.split('\n').forEach(function (textLine, i) {
      ctx.fillText(textLine, x, y + 20 * i);
    });
  };

  // Пишем текст на облаке
  writeOnStatCloud('Ура вы победили!\nСписок результатов:', 120, 40, '#000', '16px PT Mono');

  // Ищем максимальное время для масштабирования
  var maxOfTimes = Math.max.apply(null, times);

  // Вычислем пропорцию для гисторгамм
  var historamHeight = 150;
  var historamStep = historamHeight / maxOfTimes;
  // Функция рисования
  var drawStatColumnWithText = function (namesArry, timesArry, xStartDraw, yStartDraw, step, columnWidth, columnDistance) {
    for (var i = 0; i < timesArry.length; i++) {
      var x = xStartDraw + (columnWidth + columnDistance) * i;
      var y = yStartDraw - timesArry[i] * step;
      var height = timesArry[i] * step;
      var width = columnWidth;
      if (namesArry[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.2) + 0.2) + ')';
      }
      ctx.fillRect(x, y, width, height);
      ctx.fillStyle = '#000';
      ctx.font = '16px PT Mono';
      ctx.fillText(namesArry[i], x, yStartDraw + 15);
      ctx.fillText(Math.round(timesArry[i]), x, y - 10);
    }
  };
  drawStatColumnWithText(names, times, 120, 100 + historamHeight, historamStep, 40, 50);
};
