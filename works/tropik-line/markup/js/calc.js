$(document).ready(function () {
  /* Empty links */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* Calc-select */
  $('.thermal-veil-calc select').selectric({
    // responsive: true,
  }).on('selectric-select', function (event, element, selectric) {
    if($(element).val() !== 1) {
      $(this).parents('.selectric-thermal-veil-calc__select').find('.label').addClass('label_active')
    }
  });
  /* Calc-select END */

  /* Calc-functionality */
  /*--selects--*/
  var thermalVeilWarmingType = $('#thermal-veil-warming-type'),
      thermalVeilInstMethod = $('#thermal-veil-inst-method'),
      thermalVeilGatesType = $('#thermal-veil-gates-type'),
      /*--temperature inputs--*/
      thermalVeilOutsideTemp = $('#thermal-veil-outside-temp'),
      thermalVeilInsideTemp = $('#thermal-veil-inside-temp'),
      thermalVeilWaterBackTemp = $('#thermal-veil-water-back-temp'),
      thermalVeilWatersSraightTemp = $('#thermal-veil-water-straight-temp'),
      /*--doorway inputs--*/
      thermalVeilDoorwayWidth = $('#thermal-veil-doorway-width'),
      thermalVeilDoorwayWidthValue = 0,
      // thermalVeilDoorwayWidthValue = parseInt(thermalVeilDoorwayWidth.val()),
      thermalVeilDoorwayHeight = $('#thermal-veil-doorway-height'),
      thermalVeilDoorwayHeightValue = 0,
      // thermalVeilDoorwayHeightValue = parseInt(thermalVeilDoorwayHeight.val()),
      /*--checkboxes--*/
      checkboxAutomatics = $('#checkbox-automatics'),
      checkboxLimitSwitch = $('#checkbox-limit-switch'),
      checkboxTermo = $('#checkbox-termo'),
      /*--pictures--*/
      thermalVeilPictures = $('.thermal-veil-calc__picture'),
      /*--temperature blocks--*/
      thermalVeilCalcTemperatureElectro = $('.thermal-veil-calc__temperature_electro'),
      thermalVeilCalcTemperatureWater = $('.thermal-veil-calc__temperature_water');

  /*--Данные картинок--*/
  var thermalVeilImages = {
    /*--Без завес--*/
    img11: 'images/1-without-veils/1-1-dvernoy-proem-bez-zaves.svg',
    img11Title: 'Дверной проем без завес',
    img12: 'images/1-without-veils/1-2-vorota-podyomnye-bez-zaves.svg',
    img12Title: 'Ворота подъёмные без завес',
    img13: 'images/1-without-veils/1-3-vorota-otkatnye-bez-zaves.svg',
    img13Title: 'Ворота откатные без завес',
    img14: 'images/1-without-veils/1-4-vorota-raspashnye-bez-zaves.svg',
    img14Title: 'Ворота распашные без завес',
    /*--Электрические--*/
    img21: 'images/2-electro/2-1-dvernoy-proem-zavesa-sverhu--pult.svg',
    img21Title: 'Дверной проем завеса сверху + пульт',
    img22: 'images/2-electro/2-2-dvernoy-proem-zavesa-sverhu--pult--koncevoy-vyklyuchatel.svg',
    img22Title: 'Дверной проем завеса сверху + пульт + концевой выключатель',
    img23: 'images/2-electro/2-3-dvernoy-proem-zavesa-sverhu--pult--koncevoy-vyklyuchatel--termoregulyator.svg',
    img23Title: 'Дверной проем завеса сверху + пульт + концевой выключатель + терморегулятор',
    img24: 'images/2-electro/2-4-dvernoy-proem-zavesa-sboku--pult.svg',
    img24Title: 'Дверной проем завеса сбоку + пульт',
    img25: 'images/2-electro/2-5-dvernoy-proem-zavesa-sboku--pult--koncevoy-vyklyuchatelm-zavesa-sboku--pult.svg',
    img25Title: 'Дверной проем завеса сбоку + пульт + концевой выключатель',
    img26: 'images/2-electro/2-6-dvernoy-proem-zavesa-sboku--pult--koncevoy-vyklyuchatel--termoregulyator.svg',
    img26Title: 'Дверной проем завеса сбоку + пульт + концевой выключатель + терморегулятор',
    img27: 'images/2-electro/2-7-vorota-podemnye-zavesy-sverhu--blok.svg',
    img27Title: 'Ворота подъемные завесы сверху + блок',
    img28: 'images/2-electro/2-8-vorota-podemnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel.svg',
    img28Title: 'Ворота подъемные завесы сверху + блок + концевой выключатель',
    img29: 'images/2-electro/2-9-vorota-podemnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img29Title: 'Ворота подъемные завесы сверху + блок + концевой выключатель + терморегулятор',
    img210: 'images/2-electro/2-10-vorota-podemnye-zavesy-sleva--blok.svg',
    img210Title: 'Ворота подъемные завесы слева + блок',
    img211: 'images/2-electro/2-11-vorota-podemnye-zavesy-sleva--blok--koncevoy-vyklyuchatel.svg',
    img211Title: 'Ворота подъемные завесы слева + блок + концевой выключатель',
    img212: 'images/2-electro/2-12-vorota-podemnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img212Title: 'Ворота подъемные завесы слева + блок + концевой выключатель + терморегулятор',
    img213: 'images/2-electro/2-13-vorota-podemnye-zavesy-s-dvuh-storon--blok.svg',
    img213Title: 'Ворота подъемные завесы с двух сторон + блок',
    img214: 'images/2-electro/2-14-vorota-podemnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatelota-podemnye-zavesy-s-dvuh-storon--blok.svg',
    img214Title: 'Ворота подъемные завесы с двух сторон + блок + концевой выключатель',
    img215: 'images/2-electro/2-15-vorota-podemnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img215Title: 'Ворота подъемные завесы с двух сторон + блок + концевой выключатель + терморегулятор',
    img216: 'images/2-electro/2-16-vorota-otkatnye-zavesy-sverhu--blok.svg',
    img216Title: 'Ворота откатные завесы сверху + блок',
    img217: 'images/2-electro/2-17-vorota-otkatnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel.svg',
    img217Title: 'Ворота откатные завесы сверху + блок + концевой выключатель',
    img218: 'images/2-electro/2-18-vorota-otkatnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img218Title: 'Ворота откатные завесы сверху + блок + концевой выключатель + терморегулятор',
    img219: 'images/2-electro/2-19-vorota-otkatnye-zavesy-sprava--blok.svg',
    img219Title: 'Ворота откатные завесы справа + блок',
    img220: 'images/2-electro/2-20-vorota-otkatnye-zavesy-sprava--blok--koncevoy-vyklyuchatel.svg',
    img220Title: 'Ворота откатные завесы справа + блок + концевой выключатель',
    img221: 'images/2-electro/2-21-vorota-otkatnye-zavesy-sprava--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img221Title: 'Ворота откатные завесы справа + блок + концевой выключатель + терморегулятор',
    img222: 'images/2-electro/2-22-vorota-raspashnye-zavesy-sverhu--blok.svg',
    img222Title: 'Ворота распашные завесы сверху + блок',
    img223: 'images/2-electro/2-23-vorota-raspashnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel.svg',
    img223Title: 'Ворота распашные завесы сверху + блок + концевой выключатель',
    img224: 'images/2-electro/2-24-vorota-raspashnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img224Title: 'Ворота распашные завесы сверху + блок + концевой выключатель + терморегулятор',
    img225: 'images/2-electro/2-25-vorota-raspashnye-zavesy-sleva--blok.svg',
    img225Title: 'Ворота распашные завесы слева + блок',
    img226: 'images/2-electro/2-26-vorota-raspashnye-zavesy-sleva--blok--koncevoy-vyklyuchatel.svg',
    img226Title: 'Ворота распашные завесы слева + блок + концевой выключатель',
    img227: 'images/2-electro/2-27-vorota-raspashnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img227Title: 'Ворота распашные завесы слева + блок + концевой выключатель + терморегулятор',
    img228: 'images/2-electro/2-28-vorota-raspashnye-zavesy-s-dvuh-storon--blok.svg',
    img228Title: 'Ворота распашные завесы с двух сторон + блок',
    img229: 'images/2-electro/2-29-vorota-raspashnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel.svg',
    img229Title: 'Ворота распашные завесы с двух сторон + блок + концевой выключатель',
    img230: 'images/2-electro/2-30-vorota-raspashnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--termoregulyator.svg',
    img230Title: 'Ворота распашные завесы с двух сторон + блок + концевой выключатель + терморегулятор',
    /*--Водяные--*/
    img31: 'images/3-water/3-1-dvernoy-proem-zavesa-sverhu--pult--truby.svg',
    img31Title: 'Дверной проем завеса сверху + пульт + трубы',
    img32: 'images/3-water/3-2-dvernoy-proem-zavesa-sverhu--pult--koncevoy-vyklyuchatel--truby.svg',
    img32Title: 'Дверной проем завеса сверху + пульт + концевой выключатель + трубы',
    img33: 'images/3-water/3-3-dvernoy-proem-zavesa-sverhu--pult--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img33Title: 'Дверной проем завеса сверху + пульт + концевой выключатель + терморегулятор + трубы',
    img34: 'images/3-water/3-4-dvernoy-proem-zavesa-sboku--pult--truby.svg',
    img34Title: 'Дверной проем завеса сбоку + пульт + трубы',
    img35: 'images/3-water/3-5-dvernoy-proem-zavesa-sboku--pult--koncevoy-vyklyuchatel--truby.svg',
    img35Title: 'Дверной проем завеса сбоку + пульт + концевой выключатель + трубы',
    img36: 'images/3-water/3-6-dvernoy-proem-zavesa-sboku--pult--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img36Title: 'Дверной проем завеса сбоку + пульт + концевой выключатель + терморегулятор + трубы',
    img37: 'images/3-water/3-7-vorota-podemnye-zavesy-sverhu--blok--truby.svg',
    img37Title: 'Ворота подъемные завесы сверху + блок + трубы',
    img38: 'images/3-water/3-8-vorota-podemnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--truby.svg',
    img38Title: 'Ворота подъемные завесы сверху + блок + концевой выключатель + трубы',
    img39: 'images/3-water/3-9-vorota-podemnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img39Title: 'Ворота подъемные завесы сверху + блок + концевой выключатель + терморегулятор + трубы',
    img310: 'images/3-water/3-10-vorota-podemnye-zavesy-sleva--blok--truby.svg',
    img310Title: 'Ворота подъемные завесы слева + блок + трубы',
    img311: 'images/3-water/3-11-vorota-podemnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--truby.svg',
    img311Title: 'Ворота подъемные завесы слева + блок + концевой выключатель + трубы',
    img312: 'images/3-water/3-12-vorota-podemnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img312Title: 'Ворота подъемные завесы слева + блок + концевой выключатель + терморегулятор + трубы',
    img313: 'images/3-water/3-13-vorota-podemnye-zavesy-s-dvuh-storon--blok--truby.svg',
    img313Title: 'Ворота подъемные завесы с двух сторон + блок + трубы',
    img314: 'images/3-water/3-14-vorota-podemnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--truby.svg',
    img314Title: 'Ворота подъемные завесы с двух сторон + блок + концевой выключатель + трубы',
    img315: 'images/3-water/3-15-vorota-podemnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img315Title: 'Ворота подъемные завесы с двух сторон + блок + концевой выключатель + терморегулятор + трубы',
    img316: 'images/3-water/3-16-vorota-otkatnye-zavesy-sverhu--blok--truby.svg',
    img316Title: 'Ворота откатные завесы сверху + блок + трубы',
    img317: 'images/3-water/3-17-vorota-otkatnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--truby.svg',
    img317Title: 'Ворота откатные завесы сверху + блок + концевой выключатель + трубы',
    img318: 'images/3-water/3-18-vorota-otkatnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img318Title: 'Ворота откатные завесы сверху + блок + концевой выключатель + терморегулятор + трубы',
    img319: 'images/3-water/3-19-vorota-otkatnye-zavesy-sprava--blok--truby.svg',
    img319Title: 'Ворота откатные завесы справа + блок + трубы',
    img320: 'images/3-water/3-20-vorota-otkatnye-zavesy-sprava--blok--koncevoy-vyklyuchatel--truby.svg',
    img320Title: 'Ворота откатные завесы справа + блок + концевой выключатель + трубы',
    img321: 'images/3-water/3-21-vorota-otkatnye-zavesy-sprava--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img321Title: 'Ворота откатные завесы справа + блок + концевой выключатель + терморегулятор + трубы',
    img322: 'images/3-water/3-22-vorota-raspashnye-zavesy-sverhu--blok--truby.svg',
    img322Title: 'Ворота распашные завесы сверху + блок + трубы',
    img323: 'images/3-water/3-23-vorota-raspashnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--truby.svg',
    img323Title: 'Ворота распашные завесы сверху + блок + концевой выключатель + трубы',
    img324: 'images/3-water/3-24-vorota-raspashnye-zavesy-sverhu--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img324Title: 'Ворота распашные завесы сверху + блок + концевой выключатель + терморегулятор + трубы',
    img325: 'images/3-water/3-25-vorota-raspashnye-zavesy-sleva--blok--truby.svg',
    img325Title: 'Ворота распашные завесы слева + блок + трубы',
    img326: 'images/3-water/3-26-vorota-raspashnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--truby.svg',
    img326Title: 'Ворота распашные завесы слева + блок + концевой выключатель + трубы',
    img327: 'images/3-water/3-27-vorota-raspashnye-zavesy-sleva--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img327Title: 'Ворота распашные завесы слева + блок + концевой выключатель + терморегулятор + трубы',
    img328: 'images/3-water/3-28-vorota-raspashnye-zavesy-s-dvuh-storon--blok--truby.svg',
    img328Title: 'Ворота распашные завесы с двух сторон + блок + трубы',
    img329: 'images/3-water/3-29-vorota-raspashnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--truby.svg',
    img329Title: 'Ворота распашные завесы с двух сторон + блок + концевой выключатель + трубы',
    img330: 'images/3-water/3-30-vorota-raspashnye-zavesy-s-dvuh-storon--blok--koncevoy-vyklyuchatel--termoregulyator--truby.svg',
    img330Title: 'Ворота распашные завесы с двух сторон + блок + концевой выключатель + терморегулятор + трубы',
  };

  // Изменение шиирны проёма
  thermalVeilDoorwayWidth.on('change keyup', function () {
    thermalVeilDoorwayWidthValue = parseInt($(this).val());
    if(thermalVeilDoorwayWidthValue <=2) {
      // Электрические
      if(thermalVeilWarmingTypeValue == 2) {
        // Электрические Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img22,
              'alt': thermalVeilImages.img22Title,
              'title': thermalVeilImages.img22Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img23,
              'alt': thermalVeilImages.img23Title,
              'title': thermalVeilImages.img23Title,
            });
          }
          else { // Без автоматики
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img21,
              'alt': thermalVeilImages.img21Title,
              'title': thermalVeilImages.img21Title,
            });
          }
        }
        // Электрические Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img25,
              'alt': thermalVeilImages.img25Title,
              'title': thermalVeilImages.img25Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img26,
              'alt': thermalVeilImages.img26Title,
              'title': thermalVeilImages.img26Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img24,
              'alt': thermalVeilImages.img24Title,
              'title': thermalVeilImages.img24Title,
            });
          }
        }
      }
      // Водяные
      else if(thermalVeilWarmingTypeValue == 3) {
        // Водяные Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img32,
              'alt': thermalVeilImages.img32Title,
              'title': thermalVeilImages.img32Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img33,
              'alt': thermalVeilImages.img33Title,
              'title': thermalVeilImages.img33Title,
            });
          } else { // Без автоматики
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img31,
              'alt': thermalVeilImages.img31Title,
              'title': thermalVeilImages.img31Title,
            });
          }
        }
        // Водяные Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img35,
              'alt': thermalVeilImages.img35Title,
              'title': thermalVeilImages.img35Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img36,
              'alt': thermalVeilImages.img36Title,
              'title': thermalVeilImages.img36Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img34,
              'alt': thermalVeilImages.img34Title,
              'title': thermalVeilImages.img34Title,
            });
          }
        }
      }
    }
    else {
      // Электрические
      if(thermalVeilWarmingTypeValue == 2) {
        // Электрические Подьемные Горизонтально - Ширина более 2м
        if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img28,
              'alt': thermalVeilImages.img28Title,
              'title': thermalVeilImages.img28Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img29,
              'alt': thermalVeilImages.img29Title,
              'title': thermalVeilImages.img29Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img27,
              'alt': thermalVeilImages.img27Title,
              'title': thermalVeilImages.img27Title,
            });
          }
        }
        // Электрические Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img211,
              'alt': thermalVeilImages.img211Title,
              'title': thermalVeilImages.img211Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img212,
              'alt': thermalVeilImages.img212Title,
              'title': thermalVeilImages.img212Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img210,
              'alt': thermalVeilImages.img210Title,
              'title': thermalVeilImages.img210Title,
            });
          }
        }
        // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img214,
              'alt': thermalVeilImages.img214Title,
              'title': thermalVeilImages.img214Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img215,
              'alt': thermalVeilImages.img215Title,
              'title': thermalVeilImages.img215Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img213,
              'alt': thermalVeilImages.img213Title,
              'title': thermalVeilImages.img213Title,
            });
          }
        }
        // Электрические Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img217,
              'alt': thermalVeilImages.img217Title,
              'title': thermalVeilImages.img217Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img218,
              'alt': thermalVeilImages.img218Title,
              'title': thermalVeilImages.img218Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img216,
              'alt': thermalVeilImages.img216Title,
              'title': thermalVeilImages.img216Title,
            });
          }
        }
        // Электрические Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img220,
              'alt': thermalVeilImages.img220Title,
              'title': thermalVeilImages.img220Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img221,
              'alt': thermalVeilImages.img221Title,
              'title': thermalVeilImages.img221Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img219,
              'alt': thermalVeilImages.img219Title,
              'title': thermalVeilImages.img219Title,
            });
          }
        }
        // Электрические Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img223,
              'alt': thermalVeilImages.img223Title,
              'title': thermalVeilImages.img223Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img224,
              'alt': thermalVeilImages.img224Title,
              'title': thermalVeilImages.img224Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img222,
              'alt': thermalVeilImages.img222Title,
              'title': thermalVeilImages.img222Title,
            });
          }
        }
        // Электрические Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img226,
              'alt': thermalVeilImages.img226Title,
              'title': thermalVeilImages.img226Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img227,
              'alt': thermalVeilImages.img227Title,
              'title': thermalVeilImages.img227Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img225,
              'alt': thermalVeilImages.img225Title,
              'title': thermalVeilImages.img225Title,
            });
          }
        }
        // Электрические Распашные сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img229,
              'alt': thermalVeilImages.img229Title,
              'title': thermalVeilImages.img229Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img230,
              'alt': thermalVeilImages.img230Title,
              'title': thermalVeilImages.img230Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img228,
              'alt': thermalVeilImages.img228Title,
              'title': thermalVeilImages.img228Title,
            });
          }
        }
      }
      // Водяные
      else if(thermalVeilWarmingTypeValue == 3) {
        // Водяные Подьемные Горизонтально - Ширина более 2м
        if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img38,
              'alt': thermalVeilImages.img38Title,
              'title': thermalVeilImages.img38Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img39,
              'alt': thermalVeilImages.img39Title,
              'title': thermalVeilImages.img39Title,
            });
          }
          else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img37,
              'alt': thermalVeilImages.img37Title,
              'title': thermalVeilImages.img37Title,
            });
          }
        }
        // Водяные Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img311,
              'alt': thermalVeilImages.img311Title,
              'title': thermalVeilImages.img311Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img312,
              'alt': thermalVeilImages.img312Title,
              'title': thermalVeilImages.img312Title,
            });
          }
          else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img310,
              'alt': thermalVeilImages.img310Title,
              'title': thermalVeilImages.img310Title,
            });
          }
        }
        // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img314,
              'alt': thermalVeilImages.img314Title,
              'title': thermalVeilImages.img314Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img315,
              'alt': thermalVeilImages.img315Title,
              'title': thermalVeilImages.img315Title,
            });
          }
          else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img313,
              'alt': thermalVeilImages.img313Title,
              'title': thermalVeilImages.img313Title,
            });
          }
        }
        // Водяные Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img317,
              'alt': thermalVeilImages.img317Title,
              'title': thermalVeilImages.img317Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img318,
              'alt': thermalVeilImages.img318Title,
              'title': thermalVeilImages.img318Title,
            });
          }
          else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img316,
              'alt': thermalVeilImages.img316Title,
              'title': thermalVeilImages.img316Title,
            });
          }
        }
        // Водяные Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img320,
              'alt': thermalVeilImages.img320Title,
              'title': thermalVeilImages.img320Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img321,
              'alt': thermalVeilImages.img321Title,
              'title': thermalVeilImages.img321Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img319,
              'alt': thermalVeilImages.img319Title,
              'title': thermalVeilImages.img319Title,
            });
          }
        }
        // Водяные Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img323,
              'alt': thermalVeilImages.img323Title,
              'title': thermalVeilImages.img323Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img324,
              'alt': thermalVeilImages.img324Title,
              'title': thermalVeilImages.img324Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img322,
              'alt': thermalVeilImages.img322Title,
              'title': thermalVeilImages.img322Title,
            });
          }
        }
        // Водяные Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img326,
              'alt': thermalVeilImages.img326Title,
              'title': thermalVeilImages.img326Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img327,
              'alt': thermalVeilImages.img327Title,
              'title': thermalVeilImages.img327Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img325,
              'alt': thermalVeilImages.img325Title,
              'title': thermalVeilImages.img325Title,
            });
          }
        }
        // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img329,
              'alt': thermalVeilImages.img329Title,
              'title': thermalVeilImages.img329Title,
            });
          } else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img330,
              'alt': thermalVeilImages.img330Title,
              'title': thermalVeilImages.img330Title,
            });
          } else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img328,
              'alt': thermalVeilImages.img328Title,
              'title': thermalVeilImages.img328Title,
            });
          }
        }
      }
    }
  });

  thermalVeilDoorwayHeight.on('change', function () {
    thermalVeilDoorwayHeightValue = parseInt($(this).val());
    // $(this).attr('value', $(this).val());
  });

  var thermalVeilGatesTypeValue = 1;
  // 2-Электрические
  // 3-Водяные
  var thermalVeilWarmingTypeValue = 1;
  // 2-Распашные
  // 3-Подьемные
  // 4-Откатные
  var thermalVeilInstMethodValue = 1;
  // 2-Горизонтально
  // 3-Вертикально
  // 4-Сбоку с двух сторон

  /*--Активация чекбоксов при использовании автоматики--*/
  checkboxLimitSwitch.on('change', function () {
    if (this.checked) {
      checkboxTermo.removeAttr('disabled');
    } else {
      checkboxTermo.attr('disabled', '').removeAttr('checked');
    }
  });

  // Автоматика
  checkboxAutomatics.on('change', function () {
    if (this.checked) {
      checkboxLimitSwitch.removeAttr('disabled');
    } else {
      checkboxLimitSwitch.attr('disabled', '').removeAttr('checked');
      checkboxTermo.attr('disabled', '').removeAttr('checked');

      // Электрические
      if(thermalVeilWarmingTypeValue == 2) {
        // Электрические Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img21,
            'alt': thermalVeilImages.img21Title,
            'title': thermalVeilImages.img21Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img24,
            'alt': thermalVeilImages.img24Title,
            'title': thermalVeilImages.img24Title,
          });
        }
        // Электрические Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img27,
            'alt': thermalVeilImages.img27Title,
            'title': thermalVeilImages.img27Title,
          });
        }
        // Электрические Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img210,
            'alt': thermalVeilImages.img210Title,
            'title': thermalVeilImages.img210Title,
          });
        }
        // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img213,
            'alt': thermalVeilImages.img213Title,
            'title': thermalVeilImages.img213Title,
          });
        }
        // Электрические Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img216,
            'alt': thermalVeilImages.img216Title,
            'title': thermalVeilImages.img216Title,
          });
        }
        // Электрические Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img219,
            'alt': thermalVeilImages.img219Title,
            'title': thermalVeilImages.img219Title,
          });
        }
        // Электрические Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img222,
            'alt': thermalVeilImages.img222Title,
            'title': thermalVeilImages.img222Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img225,
            'alt': thermalVeilImages.img225Title,
            'title': thermalVeilImages.img225Title,
          });
        }
        // Электрические Распашные сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img228,
            'alt': thermalVeilImages.img228Title,
            'title': thermalVeilImages.img228Title,
          });
        }
      }
      // Водяные
      else if(thermalVeilWarmingTypeValue == 3) {
        // Водяные Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img31,
            'alt': thermalVeilImages.img31Title,
            'title': thermalVeilImages.img31Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img34,
            'alt': thermalVeilImages.img34Title,
            'title': thermalVeilImages.img34Title,
          });
        }
        // Водяные Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img37,
            'alt': thermalVeilImages.img37Title,
            'title': thermalVeilImages.img37Title,
          });
        }
        // Водяные Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img310,
            'alt': thermalVeilImages.img310Title,
            'title': thermalVeilImages.img310Title,
          });
        }
        // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img313,
            'alt': thermalVeilImages.img313Title,
            'title': thermalVeilImages.img313Title,
          });
        }
        // Водяные Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img316,
            'alt': thermalVeilImages.img316Title,
            'title': thermalVeilImages.img316Title,
          });
        }
        // Водяные Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img319,
            'alt': thermalVeilImages.img319Title,
            'title': thermalVeilImages.img319Title,
          });
        }
        // Водяные Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img322,
            'alt': thermalVeilImages.img322Title,
            'title': thermalVeilImages.img322Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img325,
            'alt': thermalVeilImages.img325Title,
            'title': thermalVeilImages.img325Title,
          });
        }
        // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img328,
            'alt': thermalVeilImages.img328Title,
            'title': thermalVeilImages.img328Title,
          });
        }
      }
    }
  });

  // Концевой включатель
  checkboxLimitSwitch.on('change', function () {
    if (this.checked) {
      if(checkboxTermo.is(':checked')) {
        // Электрические
        if(thermalVeilWarmingTypeValue == 2) {
          // Электрические Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img23,
              'alt': thermalVeilImages.img23Title,
              'title': thermalVeilImages.img23Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img26,
              'alt': thermalVeilImages.img26Title,
              'title': thermalVeilImages.img26Title,
            });
          }
          // Электрические Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img29,
              'alt': thermalVeilImages.img29Title,
              'title': thermalVeilImages.img29Title,
            });
          }
          // Электрические Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img212,
              'alt': thermalVeilImages.img212Title,
              'title': thermalVeilImages.img212Title,
            });
          }
          // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img215,
              'alt': thermalVeilImages.img215Title,
              'title': thermalVeilImages.img215Title,
            });
          }
          // Электрические Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img218,
              'alt': thermalVeilImages.img218Title,
              'title': thermalVeilImages.img218Title,
            });
          }
          // Электрические Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img221,
              'alt': thermalVeilImages.img221Title,
              'title': thermalVeilImages.img221Title,
            });
          }
          // Электрические Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img224,
              'alt': thermalVeilImages.img224Title,
              'title': thermalVeilImages.img224Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img227,
              'alt': thermalVeilImages.img227Title,
              'title': thermalVeilImages.img227Title,
            });
          }
          // Электрические Распашные сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img230,
              'alt': thermalVeilImages.img230Title,
              'title': thermalVeilImages.img230Title,
            });
          }
        }
        // Водяные
        else if(thermalVeilWarmingTypeValue == 3) {
          // Водяные Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img33,
              'alt': thermalVeilImages.img33Title,
              'title': thermalVeilImages.img33Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img36,
              'alt': thermalVeilImages.img36Title,
              'title': thermalVeilImages.img36Title,
            });
          }
          // Водяные Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img39,
              'alt': thermalVeilImages.img39Title,
              'title': thermalVeilImages.img39Title,
            });
          }
          // Водяные Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img312,
              'alt': thermalVeilImages.img312Title,
              'title': thermalVeilImages.img312Title,
            });
          }
          // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img315,
              'alt': thermalVeilImages.img315Title,
              'title': thermalVeilImages.img315Title,
            });
          }
          // Водяные Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img318,
              'alt': thermalVeilImages.img318Title,
              'title': thermalVeilImages.img318Title,
            });
          }
          // Водяные Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img321,
              'alt': thermalVeilImages.img321Title,
              'title': thermalVeilImages.img321Title,
            });
          }
          // Водяные Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img324,
              'alt': thermalVeilImages.img324Title,
              'title': thermalVeilImages.img324Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img327,
              'alt': thermalVeilImages.img327Title,
              'title': thermalVeilImages.img327Title,
            });
          }
          // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img330,
              'alt': thermalVeilImages.img330Title,
              'title': thermalVeilImages.img330Title,
            });
          }
        }
      }
      else {
        // Электрические
        if(thermalVeilWarmingTypeValue == 2) {
          // Электрические Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img22,
              'alt': thermalVeilImages.img22Title,
              'title': thermalVeilImages.img22Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img25,
              'alt': thermalVeilImages.img25Title,
              'title': thermalVeilImages.img25Title,
            });
          }
          // Электрические Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img28,
              'alt': thermalVeilImages.img28Title,
              'title': thermalVeilImages.img28Title,
            });
          }
          // Электрические Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img211,
              'alt': thermalVeilImages.img211Title,
              'title': thermalVeilImages.img211Title,
            });
          }
          // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img214,
              'alt': thermalVeilImages.img214Title,
              'title': thermalVeilImages.img214Title,
            });
          }
          // Электрические Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img217,
              'alt': thermalVeilImages.img217Title,
              'title': thermalVeilImages.img217Title,
            });
          }
          // Электрические Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img220,
              'alt': thermalVeilImages.img220Title,
              'title': thermalVeilImages.img220Title,
            });
          }
          // Электрические Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img223,
              'alt': thermalVeilImages.img223Title,
              'title': thermalVeilImages.img223Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img226,
              'alt': thermalVeilImages.img226Title,
              'title': thermalVeilImages.img226Title,
            });
          }
          // Электрические Распашные сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img229,
              'alt': thermalVeilImages.img229Title,
              'title': thermalVeilImages.img229Title,
            });
          }
        }
        // Водяные
        else if(thermalVeilWarmingTypeValue == 3) {
          // Водяные Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img32,
              'alt': thermalVeilImages.img32Title,
              'title': thermalVeilImages.img32Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img35,
              'alt': thermalVeilImages.img35Title,
              'title': thermalVeilImages.img35Title,
            });
          }
          // Водяные Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img38,
              'alt': thermalVeilImages.img38Title,
              'title': thermalVeilImages.img38Title,
            });
          }
          // Водяные Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img311,
              'alt': thermalVeilImages.img311Title,
              'title': thermalVeilImages.img311Title,
            });
          }
          // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img314,
              'alt': thermalVeilImages.img314Title,
              'title': thermalVeilImages.img314Title,
            });
          }
          // Водяные Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img317,
              'alt': thermalVeilImages.img317Title,
              'title': thermalVeilImages.img317Title,
            });
          }
          // Водяные Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img320,
              'alt': thermalVeilImages.img320Title,
              'title': thermalVeilImages.img320Title,
            });
          }
          // Водяные Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img323,
              'alt': thermalVeilImages.img323Title,
              'title': thermalVeilImages.img323Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img326,
              'alt': thermalVeilImages.img326Title,
              'title': thermalVeilImages.img326Title,
            });
          }
          // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img329,
              'alt': thermalVeilImages.img329Title,
              'title': thermalVeilImages.img329Title,
            });
          }
        }
      }
    }
    else {
      // Электрические
      if(thermalVeilWarmingTypeValue == 2) {
        // Электрические Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img21,
            'alt': thermalVeilImages.img21Title,
            'title': thermalVeilImages.img21Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img24,
            'alt': thermalVeilImages.img24Title,
            'title': thermalVeilImages.img24Title,
          });
        }
        // Электрические Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img27,
            'alt': thermalVeilImages.img27Title,
            'title': thermalVeilImages.img27Title,
          });
        }
        // Электрические Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img210,
            'alt': thermalVeilImages.img210Title,
            'title': thermalVeilImages.img210Title,
          });
        }
        // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img213,
            'alt': thermalVeilImages.img213Title,
            'title': thermalVeilImages.img213Title,
          });
        }
        // Электрические Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img216,
            'alt': thermalVeilImages.img216Title,
            'title': thermalVeilImages.img216Title,
          });
        }
        // Электрические Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img219,
            'alt': thermalVeilImages.img219Title,
            'title': thermalVeilImages.img219Title,
          });
        }
        // Электрические Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img222,
            'alt': thermalVeilImages.img222Title,
            'title': thermalVeilImages.img222Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img225,
            'alt': thermalVeilImages.img225Title,
            'title': thermalVeilImages.img225Title,
          });
        }
        // Электрические Распашные сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img228,
            'alt': thermalVeilImages.img228Title,
            'title': thermalVeilImages.img228Title,
          });
        }
      }
      // Водяные
      else if(thermalVeilWarmingTypeValue == 3) {
        // Водяные Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img31,
            'alt': thermalVeilImages.img31Title,
            'title': thermalVeilImages.img31Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img34,
            'alt': thermalVeilImages.img34Title,
            'title': thermalVeilImages.img34Title,
          });
        }
        // Водяные Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img37,
            'alt': thermalVeilImages.img37Title,
            'title': thermalVeilImages.img37Title,
          });
        }
        // Водяные Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img310,
            'alt': thermalVeilImages.img310Title,
            'title': thermalVeilImages.img310Title,
          });
        }
        // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img314,
              'alt': thermalVeilImages.img314Title,
              'title': thermalVeilImages.img314Title,
            });
          }
          else if(checkboxAutomatics.is(':checked') &&
              checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img315,
              'alt': thermalVeilImages.img315Title,
              'title': thermalVeilImages.img315Title,
            });
          }
          else {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img313,
              'alt': thermalVeilImages.img313Title,
              'title': thermalVeilImages.img313Title,
            });
          }
        }
        // Водяные Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img316,
            'alt': thermalVeilImages.img316Title,
            'title': thermalVeilImages.img316Title,
          });
        }
        // Водяные Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img319,
            'alt': thermalVeilImages.img319Title,
            'title': thermalVeilImages.img319Title,
          });
        }
        // Водяные Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img322,
            'alt': thermalVeilImages.img322Title,
            'title': thermalVeilImages.img322Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img325,
            'alt': thermalVeilImages.img325Title,
            'title': thermalVeilImages.img325Title,
          });
        }
        // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img328,
            'alt': thermalVeilImages.img328Title,
            'title': thermalVeilImages.img328Title,
          });
        }
      }
    }
  });

  // Терморегулятор
  checkboxTermo.on('change', function () {
    if (this.checked) {
      // Электрические
      if(thermalVeilWarmingTypeValue == 2) {
        // Электрические Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img23,
            'alt': thermalVeilImages.img23Title,
            'title': thermalVeilImages.img23Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img26,
            'alt': thermalVeilImages.img26Title,
            'title': thermalVeilImages.img26Title,
          });
        }
        // Электрические Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img29,
            'alt': thermalVeilImages.img29Title,
            'title': thermalVeilImages.img29Title,
          });
        }
        // Электрические Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img212,
            'alt': thermalVeilImages.img212Title,
            'title': thermalVeilImages.img212Title,
          });
        }
        // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img215,
            'alt': thermalVeilImages.img215Title,
            'title': thermalVeilImages.img215Title,
          });
        }
        // Электрические Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img218,
            'alt': thermalVeilImages.img218Title,
            'title': thermalVeilImages.img218Title,
          });
        }
        // Электрические Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img221,
            'alt': thermalVeilImages.img221Title,
            'title': thermalVeilImages.img221Title,
          });
        }
        // Электрические Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img224,
            'alt': thermalVeilImages.img224Title,
            'title': thermalVeilImages.img224Title,
          });
        }
        // Электрические Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img227,
            'alt': thermalVeilImages.img227Title,
            'title': thermalVeilImages.img227Title,
          });
        }
        // Электрические Распашные сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img230,
            'alt': thermalVeilImages.img230Title,
            'title': thermalVeilImages.img230Title,
          });
        }
      }
      // Водяные
      else if(thermalVeilWarmingTypeValue == 3) {
        // Водяные Распашные Горизонтально - Ширина до 2м
        if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img33,
            'alt': thermalVeilImages.img33Title,
            'title': thermalVeilImages.img33Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина до 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue <= 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img36,
            'alt': thermalVeilImages.img36Title,
            'title': thermalVeilImages.img36Title,
          });
        }
        // Водяные Подьемные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img39,
            'alt': thermalVeilImages.img39Title,
            'title': thermalVeilImages.img39Title,
          });
        }
        // Водяные Подьемные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img312,
            'alt': thermalVeilImages.img312Title,
            'title': thermalVeilImages.img312Title,
          });
        }
        // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 3
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img315,
            'alt': thermalVeilImages.img315Title,
            'title': thermalVeilImages.img315Title,
          });
        }
        // Водяные Откатные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img318,
            'alt': thermalVeilImages.img318Title,
            'title': thermalVeilImages.img318Title,
          });
        }
        // Водяные Откатные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 4
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img321,
            'alt': thermalVeilImages.img321Title,
            'title': thermalVeilImages.img321Title,
          });
        }
        // Водяные Распашные Горизонтально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 2
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img324,
            'alt': thermalVeilImages.img324Title,
            'title': thermalVeilImages.img324Title,
          });
        }
        // Водяные Распашные Вертикально - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 3
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img327,
            'alt': thermalVeilImages.img327Title,
            'title': thermalVeilImages.img327Title,
          });
        }
        // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
        else if(thermalVeilGatesTypeValue == 2
            && thermalVeilInstMethodValue == 4
            && thermalVeilDoorwayWidthValue > 2) {
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img330,
            'alt': thermalVeilImages.img330Title,
            'title': thermalVeilImages.img330Title,
          });
        }
      }
    }
    else {
      if(checkboxLimitSwitch.is(':checked')) {
        // Электрические
        if(thermalVeilWarmingTypeValue == 2) {
          // Электрические Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img22,
              'alt': thermalVeilImages.img22Title,
              'title': thermalVeilImages.img22Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img25,
              'alt': thermalVeilImages.img25Title,
              'title': thermalVeilImages.img25Title,
            });
          }
          // Электрические Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img28,
              'alt': thermalVeilImages.img28Title,
              'title': thermalVeilImages.img28Title,
            });
          }
          // Электрические Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img211,
              'alt': thermalVeilImages.img211Title,
              'title': thermalVeilImages.img211Title,
            });
          }
          // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img214,
              'alt': thermalVeilImages.img214Title,
              'title': thermalVeilImages.img214Title,
            });
          }
          // Электрические Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img217,
              'alt': thermalVeilImages.img217Title,
              'title': thermalVeilImages.img217Title,
            });
          }
          // Электрические Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img220,
              'alt': thermalVeilImages.img220Title,
              'title': thermalVeilImages.img220Title,
            });
          }
          // Электрические Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img223,
              'alt': thermalVeilImages.img223Title,
              'title': thermalVeilImages.img223Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img226,
              'alt': thermalVeilImages.img226Title,
              'title': thermalVeilImages.img226Title,
            });
          }
          // Электрические Распашные сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img229,
              'alt': thermalVeilImages.img229Title,
              'title': thermalVeilImages.img229Title,
            });
          }
        }
        // Водяные
        else if(thermalVeilWarmingTypeValue == 3) {
          // Водяные Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img32,
              'alt': thermalVeilImages.img32Title,
              'title': thermalVeilImages.img32Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img35,
              'alt': thermalVeilImages.img35Title,
              'title': thermalVeilImages.img35Title,
            });
          }
          // Водяные Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img38,
              'alt': thermalVeilImages.img38Title,
              'title': thermalVeilImages.img38Title,
            });
          }
          // Водяные Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img311,
              'alt': thermalVeilImages.img311Title,
              'title': thermalVeilImages.img311Title,
            });
          }
          // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img314,
              'alt': thermalVeilImages.img314Title,
              'title': thermalVeilImages.img314Title,
            });
          }
          // Водяные Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img317,
              'alt': thermalVeilImages.img317Title,
              'title': thermalVeilImages.img317Title,
            });
          }
          // Водяные Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img320,
              'alt': thermalVeilImages.img320Title,
              'title': thermalVeilImages.img320Title,
            });
          }
          // Водяные Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img323,
              'alt': thermalVeilImages.img323Title,
              'title': thermalVeilImages.img323Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img326,
              'alt': thermalVeilImages.img326Title,
              'title': thermalVeilImages.img326Title,
            });
          }
          // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img329,
              'alt': thermalVeilImages.img329Title,
              'title': thermalVeilImages.img329Title,
            });
          }
        }
      }
      else {
        // Электрические
        if(thermalVeilWarmingTypeValue == 2) {
          // Электрические Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img21,
              'alt': thermalVeilImages.img21Title,
              'title': thermalVeilImages.img21Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img24,
              'alt': thermalVeilImages.img24Title,
              'title': thermalVeilImages.img24Title,
            });
          }
          // Электрические Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img27,
              'alt': thermalVeilImages.img27Title,
              'title': thermalVeilImages.img27Title,
            });
          }
          // Электрические Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img210,
              'alt': thermalVeilImages.img210Title,
              'title': thermalVeilImages.img210Title,
            });
          }
          // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img213,
              'alt': thermalVeilImages.img213Title,
              'title': thermalVeilImages.img213Title,
            });
          }
          // Электрические Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img216,
              'alt': thermalVeilImages.img216Title,
              'title': thermalVeilImages.img216Title,
            });
          }
          // Электрические Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img219,
              'alt': thermalVeilImages.img219Title,
              'title': thermalVeilImages.img219Title,
            });
          }
          // Электрические Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img222,
              'alt': thermalVeilImages.img222Title,
              'title': thermalVeilImages.img222Title,
            });
          }
          // Электрические Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img225,
              'alt': thermalVeilImages.img225Title,
              'title': thermalVeilImages.img225Title,
            });
          }
          // Электрические Распашные сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img228,
              'alt': thermalVeilImages.img228Title,
              'title': thermalVeilImages.img228Title,
            });
          }
        }
        // Водяные
        else if(thermalVeilWarmingTypeValue == 3) {
          // Водяные Распашные Горизонтально - Ширина до 2м
          if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({
              'src': thermalVeilImages.img31,
              'alt': thermalVeilImages.img31Title,
              'title': thermalVeilImages.img31Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина до 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue <= 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img34,
              'alt': thermalVeilImages.img34Title,
              'title': thermalVeilImages.img34Title,
            });
          }
          // Водяные Подьемные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img37,
              'alt': thermalVeilImages.img37Title,
              'title': thermalVeilImages.img37Title,
            });
          }
          // Водяные Подьемные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img310,
              'alt': thermalVeilImages.img310Title,
              'title': thermalVeilImages.img310Title,
            });
          }
          // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 3
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
              thermalVeilPictures.attr({
                'src': thermalVeilImages.img314,
                'alt': thermalVeilImages.img314Title,
                'title': thermalVeilImages.img314Title,
              });
            }
            else if(checkboxAutomatics.is(':checked') &&
                checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
              thermalVeilPictures.attr({
                'src': thermalVeilImages.img315,
                'alt': thermalVeilImages.img315Title,
                'title': thermalVeilImages.img315Title,
              });
            }
            else {
              thermalVeilPictures.attr({ // Без автоматики
                'src': thermalVeilImages.img313,
                'alt': thermalVeilImages.img313Title,
                'title': thermalVeilImages.img313Title,
              });
            }
          }
          // Водяные Откатные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img316,
              'alt': thermalVeilImages.img316Title,
              'title': thermalVeilImages.img316Title,
            });
          }
          // Водяные Откатные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 4
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img319,
              'alt': thermalVeilImages.img319Title,
              'title': thermalVeilImages.img319Title,
            });
          }
          // Водяные Распашные Горизонтально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 2
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img322,
              'alt': thermalVeilImages.img322Title,
              'title': thermalVeilImages.img322Title,
            });
          }
          // Водяные Распашные Вертикально - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 3
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img325,
              'alt': thermalVeilImages.img325Title,
              'title': thermalVeilImages.img325Title,
            });
          }
          // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
          else if(thermalVeilGatesTypeValue == 2
              && thermalVeilInstMethodValue == 4
              && thermalVeilDoorwayWidthValue > 2) {
            thermalVeilPictures.attr({ // Без автоматики
              'src': thermalVeilImages.img328,
              'alt': thermalVeilImages.img328Title,
              'title': thermalVeilImages.img328Title,
            });
          }
        }
      }
    }
  });

  /*--Переключение селекта типа нагрева--*/
  thermalVeilWarmingType.on('selectric-select', function (event, element, selectric) {
    thermalVeilWarmingTypeValue = $(element).val();

    // Электрические
    if(thermalVeilWarmingTypeValue == 2) {
      thermalVeilCalcTemperatureWater.slideUp(0);
      thermalVeilCalcTemperatureElectro.slideDown(0);
      // Электрические Распашные Горизонтально - Ширина до 2м
      if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img22,
            'alt': thermalVeilImages.img22Title,
            'title': thermalVeilImages.img22Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img23,
            'alt': thermalVeilImages.img23Title,
            'title': thermalVeilImages.img23Title,
          });
        }
        else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img21,
            'alt': thermalVeilImages.img21Title,
            'title': thermalVeilImages.img21Title,
          });
        }
      }
      // Электрические Распашные Вертикально - Ширина до 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img25,
            'alt': thermalVeilImages.img25Title,
            'title': thermalVeilImages.img25Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img26,
            'alt': thermalVeilImages.img26Title,
            'title': thermalVeilImages.img26Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img24,
            'alt': thermalVeilImages.img24Title,
            'title': thermalVeilImages.img24Title,
          });
        }
      }
      // Электрические Подьемные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img28,
            'alt': thermalVeilImages.img28Title,
            'title': thermalVeilImages.img28Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img29,
            'alt': thermalVeilImages.img29Title,
            'title': thermalVeilImages.img29Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img27,
            'alt': thermalVeilImages.img27Title,
            'title': thermalVeilImages.img27Title,
          });
        }
      }
      // Электрические Подьемные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img211,
            'alt': thermalVeilImages.img211Title,
            'title': thermalVeilImages.img211Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img212,
            'alt': thermalVeilImages.img212Title,
            'title': thermalVeilImages.img212Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img210,
            'alt': thermalVeilImages.img210Title,
            'title': thermalVeilImages.img210Title,
          });
        }
      }
      // Электрические Подьемные Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img214,
            'alt': thermalVeilImages.img214Title,
            'title': thermalVeilImages.img214Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img215,
            'alt': thermalVeilImages.img215Title,
            'title': thermalVeilImages.img215Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img213,
            'alt': thermalVeilImages.img213Title,
            'title': thermalVeilImages.img213Title,
          });
        }
      }
      // Электрические Откатные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 4
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img217,
            'alt': thermalVeilImages.img217Title,
            'title': thermalVeilImages.img217Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img218,
            'alt': thermalVeilImages.img218Title,
            'title': thermalVeilImages.img218Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img216,
            'alt': thermalVeilImages.img216Title,
            'title': thermalVeilImages.img216Title,
          });
        }
      }
      // Электрические Откатные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 4
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img220,
            'alt': thermalVeilImages.img220Title,
            'title': thermalVeilImages.img220Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img221,
            'alt': thermalVeilImages.img221Title,
            'title': thermalVeilImages.img221Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img219,
            'alt': thermalVeilImages.img219Title,
            'title': thermalVeilImages.img219Title,
          });
        }
      }
      // Электрические Распашные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img223,
            'alt': thermalVeilImages.img223Title,
            'title': thermalVeilImages.img223Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img224,
            'alt': thermalVeilImages.img224Title,
            'title': thermalVeilImages.img224Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img222,
            'alt': thermalVeilImages.img222Title,
            'title': thermalVeilImages.img222Title,
          });
        }
      }
      // Электрические Распашные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img226,
            'alt': thermalVeilImages.img226Title,
            'title': thermalVeilImages.img226Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img227,
            'alt': thermalVeilImages.img227Title,
            'title': thermalVeilImages.img227Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img225,
            'alt': thermalVeilImages.img225Title,
            'title': thermalVeilImages.img225Title,
          });
        }
      }
      // Электрические Распашные сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img229,
            'alt': thermalVeilImages.img229Title,
            'title': thermalVeilImages.img229Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img230,
            'alt': thermalVeilImages.img230Title,
            'title': thermalVeilImages.img230Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img228,
            'alt': thermalVeilImages.img228Title,
            'title': thermalVeilImages.img228Title,
          });
        }
      }
    }
    // Водяные
    else if(thermalVeilWarmingTypeValue == 3) {
      thermalVeilCalcTemperatureWater.slideDown(0);
      thermalVeilCalcTemperatureElectro.slideUp(0);
      // Водяные Распашные Горизонтально - Ширина до 2м
      if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img32,
            'alt': thermalVeilImages.img32Title,
            'title': thermalVeilImages.img32Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img33,
            'alt': thermalVeilImages.img33Title,
            'title': thermalVeilImages.img33Title,
          });
        } else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img31,
            'alt': thermalVeilImages.img31Title,
            'title': thermalVeilImages.img31Title,
          });
        }
      }
      // Водяные Распашные Вертикально - Ширина до 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img35,
            'alt': thermalVeilImages.img35Title,
            'title': thermalVeilImages.img35Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img36,
            'alt': thermalVeilImages.img36Title,
            'title': thermalVeilImages.img36Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img34,
            'alt': thermalVeilImages.img34Title,
            'title': thermalVeilImages.img34Title,
          });
        }
      }
      // Водяные Подьемные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img38,
            'alt': thermalVeilImages.img38Title,
            'title': thermalVeilImages.img38Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img39,
            'alt': thermalVeilImages.img39Title,
            'title': thermalVeilImages.img39Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img37,
            'alt': thermalVeilImages.img37Title,
            'title': thermalVeilImages.img37Title,
          });
        }
      }
      // Водяные Подьемные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img311,
            'alt': thermalVeilImages.img311Title,
            'title': thermalVeilImages.img311Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img312,
            'alt': thermalVeilImages.img312Title,
            'title': thermalVeilImages.img312Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img310,
            'alt': thermalVeilImages.img310Title,
            'title': thermalVeilImages.img310Title,
          });
        }
      }
      // Водяные Подьемные Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img314,
            'alt': thermalVeilImages.img314Title,
            'title': thermalVeilImages.img314Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img315,
            'alt': thermalVeilImages.img315Title,
            'title': thermalVeilImages.img315Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img313,
            'alt': thermalVeilImages.img313Title,
            'title': thermalVeilImages.img313Title,
          });
        }
      }
      // Водяные Откатные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 4
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img317,
            'alt': thermalVeilImages.img317Title,
            'title': thermalVeilImages.img317Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img318,
            'alt': thermalVeilImages.img318Title,
            'title': thermalVeilImages.img318Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img316,
            'alt': thermalVeilImages.img316Title,
            'title': thermalVeilImages.img316Title,
          });
        }
      }
      // Водяные Откатные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 4
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img320,
            'alt': thermalVeilImages.img320Title,
            'title': thermalVeilImages.img320Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img321,
            'alt': thermalVeilImages.img321Title,
            'title': thermalVeilImages.img321Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img319,
            'alt': thermalVeilImages.img319Title,
            'title': thermalVeilImages.img319Title,
          });
        }
      }
      // Водяные Распашные Горизонтально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img323,
            'alt': thermalVeilImages.img323Title,
            'title': thermalVeilImages.img323Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img324,
            'alt': thermalVeilImages.img324Title,
            'title': thermalVeilImages.img324Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img322,
            'alt': thermalVeilImages.img322Title,
            'title': thermalVeilImages.img322Title,
          });
        }
      }
      // Водяные Распашные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img326,
            'alt': thermalVeilImages.img326Title,
            'title': thermalVeilImages.img326Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img327,
            'alt': thermalVeilImages.img327Title,
            'title': thermalVeilImages.img327Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img325,
            'alt': thermalVeilImages.img325Title,
            'title': thermalVeilImages.img325Title,
          });
        }
      }
      // Водяные Распашные Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img329,
            'alt': thermalVeilImages.img329Title,
            'title': thermalVeilImages.img329Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img330,
            'alt': thermalVeilImages.img330Title,
            'title': thermalVeilImages.img330Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img328,
            'alt': thermalVeilImages.img328Title,
            'title': thermalVeilImages.img328Title,
          });
        }
      }
    }
    else {
      thermalVeilPictures.attr({
        'src': thermalVeilImages.img11,
        'alt': thermalVeilImages.img11Title,
        'title': thermalVeilImages.img11Title,
      });
    }
  });

  /*--Переключение селекта типа ворот/дверей--*/
  thermalVeilGatesType.on('selectric-select', function (event, element, selectric) {
    thermalVeilGatesTypeValue = $(element).val();

    // Распашные
    if (thermalVeilGatesTypeValue == 2) {
      // Распашные Электрические Горизонтально - Ширина до 2м
      if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img22,
            'alt': thermalVeilImages.img22Title,
            'title': thermalVeilImages.img22Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img23,
            'alt': thermalVeilImages.img23Title,
            'title': thermalVeilImages.img23Title,
          });
        }
        else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img21,
            'alt': thermalVeilImages.img21Title,
            'title': thermalVeilImages.img21Title,
          });
        }
      }
      // Распашные Электрические Вертикально - Ширина до 2м
      else if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img25,
            'alt': thermalVeilImages.img25Title,
            'title': thermalVeilImages.img25Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img26,
            'alt': thermalVeilImages.img26Title,
            'title': thermalVeilImages.img26Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img24,
            'alt': thermalVeilImages.img24Title,
            'title': thermalVeilImages.img24Title,
          });
        }
      }
      // Распашные Электрические Горизонтально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img223,
            'alt': thermalVeilImages.img223Title,
            'title': thermalVeilImages.img223Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img224,
            'alt': thermalVeilImages.img224Title,
            'title': thermalVeilImages.img224Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img222,
            'alt': thermalVeilImages.img222Title,
            'title': thermalVeilImages.img222Title,
          });
        }
      }
      // Распашные Электрические Вертикально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img226,
            'alt': thermalVeilImages.img226Title,
            'title': thermalVeilImages.img226Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img227,
            'alt': thermalVeilImages.img227Title,
            'title': thermalVeilImages.img227Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img225,
            'alt': thermalVeilImages.img225Title,
            'title': thermalVeilImages.img225Title,
          });
        }
      }
      // Распашные Электрические Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img229,
            'alt': thermalVeilImages.img229Title,
            'title': thermalVeilImages.img229Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img230,
            'alt': thermalVeilImages.img230Title,
            'title': thermalVeilImages.img230Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img228,
            'alt': thermalVeilImages.img228Title,
            'title': thermalVeilImages.img228Title,
          });
        }
      }
      // Распашные Водяные Горизонтально - Ширина до 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img32,
            'alt': thermalVeilImages.img32Title,
            'title': thermalVeilImages.img32Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img33,
            'alt': thermalVeilImages.img33Title,
            'title': thermalVeilImages.img33Title,
          });
        } else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img31,
            'alt': thermalVeilImages.img31Title,
            'title': thermalVeilImages.img31Title,
          });
        }
      }
      // Распашные Водяные Вертикально - Ширина до 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img35,
            'alt': thermalVeilImages.img35Title,
            'title': thermalVeilImages.img35Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img36,
            'alt': thermalVeilImages.img36Title,
            'title': thermalVeilImages.img36Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img34,
            'alt': thermalVeilImages.img34Title,
            'title': thermalVeilImages.img34Title,
          });
        }
      }
      // Распашные Водяные Горизонтально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img323,
            'alt': thermalVeilImages.img323Title,
            'title': thermalVeilImages.img323Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img324,
            'alt': thermalVeilImages.img324Title,
            'title': thermalVeilImages.img324Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img322,
            'alt': thermalVeilImages.img322Title,
            'title': thermalVeilImages.img322Title,
          });
        }
      }
      // Распашные Водяные Вертикально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img326,
            'alt': thermalVeilImages.img326Title,
            'title': thermalVeilImages.img326Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img327,
            'alt': thermalVeilImages.img327Title,
            'title': thermalVeilImages.img327Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img325,
            'alt': thermalVeilImages.img325Title,
            'title': thermalVeilImages.img325Title,
          });
        }
      }
      // Распашные Водяные Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img329,
            'alt': thermalVeilImages.img329Title,
            'title': thermalVeilImages.img329Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img330,
            'alt': thermalVeilImages.img330Title,
            'title': thermalVeilImages.img330Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img328,
            'alt': thermalVeilImages.img328Title,
            'title': thermalVeilImages.img328Title,
          });
        }
      }
    }
    // Подьемные
    else if (thermalVeilGatesTypeValue == 3) {
      // Подьемные Электрические Горизонтально - Ширина более 2м
      if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img28,
            'alt': thermalVeilImages.img28Title,
            'title': thermalVeilImages.img28Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img29,
            'alt': thermalVeilImages.img29Title,
            'title': thermalVeilImages.img29Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img27,
            'alt': thermalVeilImages.img27Title,
            'title': thermalVeilImages.img27Title,
          });
        }
      }
      // Подьемные Электрические Вертикально - Ширина более 2м
      else if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img211,
            'alt': thermalVeilImages.img211Title,
            'title': thermalVeilImages.img211Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img212,
            'alt': thermalVeilImages.img212Title,
            'title': thermalVeilImages.img212Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img210,
            'alt': thermalVeilImages.img210Title,
            'title': thermalVeilImages.img210Title,
          });
        }
      }
      // Подьемные Электрические Сбоку с двух сторон - Ширина более 2м
      else if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img214,
            'alt': thermalVeilImages.img214Title,
            'title': thermalVeilImages.img214Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img215,
            'alt': thermalVeilImages.img215Title,
            'title': thermalVeilImages.img215Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img213,
            'alt': thermalVeilImages.img213Title,
            'title': thermalVeilImages.img213Title,
          });
        }
      }
      // Подьемные Водяные Горизонтально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img38,
            'alt': thermalVeilImages.img38Title,
            'title': thermalVeilImages.img38Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img39,
            'alt': thermalVeilImages.img39Title,
            'title': thermalVeilImages.img39Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img37,
            'alt': thermalVeilImages.img37Title,
            'title': thermalVeilImages.img37Title,
          });
        }
      }
      // Подьемные Водяные Вертикально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img311,
            'alt': thermalVeilImages.img311Title,
            'title': thermalVeilImages.img311Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img312,
            'alt': thermalVeilImages.img312Title,
            'title': thermalVeilImages.img312Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img310,
            'alt': thermalVeilImages.img310Title,
            'title': thermalVeilImages.img310Title,
          });
        }
      }
      // Подьемные Водяные Сбоку с двух сторон - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 4
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img314,
            'alt': thermalVeilImages.img314Title,
            'title': thermalVeilImages.img314Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img315,
            'alt': thermalVeilImages.img315Title,
            'title': thermalVeilImages.img315Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img313,
            'alt': thermalVeilImages.img313Title,
            'title': thermalVeilImages.img313Title,
          });
        }
      }
    }
    // Откатные
    else if (thermalVeilGatesTypeValue == 4) {
      // Откатные Электрические Горизонтально - Ширина более 2м
      if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img217,
            'alt': thermalVeilImages.img217Title,
            'title': thermalVeilImages.img217Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img218,
            'alt': thermalVeilImages.img218Title,
            'title': thermalVeilImages.img218Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img216,
            'alt': thermalVeilImages.img216Title,
            'title': thermalVeilImages.img216Title,
          });
        }
      }
      // Откатные Электрические Вертикально - Ширина более 2м
      else if (thermalVeilWarmingTypeValue == 2
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img220,
            'alt': thermalVeilImages.img220Title,
            'title': thermalVeilImages.img220Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img221,
            'alt': thermalVeilImages.img221Title,
            'title': thermalVeilImages.img221Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img219,
            'alt': thermalVeilImages.img219Title,
            'title': thermalVeilImages.img219Title,
          });
        }
      }
      // Откатные Водяные Горизонтально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img317,
            'alt': thermalVeilImages.img317Title,
            'title': thermalVeilImages.img317Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img318,
            'alt': thermalVeilImages.img318Title,
            'title': thermalVeilImages.img318Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img316,
            'alt': thermalVeilImages.img316Title,
            'title': thermalVeilImages.img316Title,
          });
        }
      }
      // Откатные Водяные Вертикально - Ширина более 2м
      else if(thermalVeilWarmingTypeValue == 3
          && thermalVeilInstMethodValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img320,
            'alt': thermalVeilImages.img320Title,
            'title': thermalVeilImages.img320Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img321,
            'alt': thermalVeilImages.img321Title,
            'title': thermalVeilImages.img321Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img319,
            'alt': thermalVeilImages.img319Title,
            'title': thermalVeilImages.img319Title,
          });
        }
      }
    }
    else {
      thermalVeilPictures.attr({
        'src': thermalVeilImages.img11,
        'alt': thermalVeilImages.img11Title,
        'title': thermalVeilImages.img11Title,
      });
    }
  });

  /*--Переключение селекта типа установки--*/
  thermalVeilInstMethod.on('selectric-select', function (event, element, selectric) {
    thermalVeilInstMethodValue = $(element).val();

    // Горизонтально
    if (thermalVeilInstMethodValue == 2) {
      // Горизонтально Электрические Распашные - Ширина до 2м
      if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img22,
            'alt': thermalVeilImages.img22Title,
            'title': thermalVeilImages.img22Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img23,
            'alt': thermalVeilImages.img23Title,
            'title': thermalVeilImages.img23Title,
          });
        }
        else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img21,
            'alt': thermalVeilImages.img21Title,
            'title': thermalVeilImages.img21Title,
          });
        }
      }
      // Горизонтально Водяные Распашные - Ширина до 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img32,
            'alt': thermalVeilImages.img32Title,
            'title': thermalVeilImages.img32Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img33,
            'alt': thermalVeilImages.img33Title,
            'title': thermalVeilImages.img33Title,
          });
        } else { // Без автоматики
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img31,
            'alt': thermalVeilImages.img31Title,
            'title': thermalVeilImages.img31Title,
          });
        }
      }
      // Горизонтально Электрические Распашные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img223,
            'alt': thermalVeilImages.img223Title,
            'title': thermalVeilImages.img223Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img224,
            'alt': thermalVeilImages.img224Title,
            'title': thermalVeilImages.img224Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img222,
            'alt': thermalVeilImages.img222Title,
            'title': thermalVeilImages.img222Title,
          });
        }
      }
      // Горизонтально Электрические Подьемные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img28,
            'alt': thermalVeilImages.img28Title,
            'title': thermalVeilImages.img28Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img29,
            'alt': thermalVeilImages.img29Title,
            'title': thermalVeilImages.img29Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img27,
            'alt': thermalVeilImages.img27Title,
            'title': thermalVeilImages.img27Title,
          });
        }
      }
      // Горизонтально Электрические Откатные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 4
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img217,
            'alt': thermalVeilImages.img217Title,
            'title': thermalVeilImages.img217Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img218,
            'alt': thermalVeilImages.img218Title,
            'title': thermalVeilImages.img218Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img216,
            'alt': thermalVeilImages.img216Title,
            'title': thermalVeilImages.img216Title,
          });
        }
      }
      // Горизонтально Водяные Распашные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img323,
            'alt': thermalVeilImages.img323Title,
            'title': thermalVeilImages.img323Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img324,
            'alt': thermalVeilImages.img324Title,
            'title': thermalVeilImages.img324Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img322,
            'alt': thermalVeilImages.img322Title,
            'title': thermalVeilImages.img322Title,
          });
        }
      }
      // Водяные Подьемные Горизонтально - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img38,
            'alt': thermalVeilImages.img38Title,
            'title': thermalVeilImages.img38Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img39,
            'alt': thermalVeilImages.img39Title,
            'title': thermalVeilImages.img39Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img37,
            'alt': thermalVeilImages.img37Title,
            'title': thermalVeilImages.img37Title,
          });
        }
      }
      // Водяные Откатные Горизонтально - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 4
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img317,
            'alt': thermalVeilImages.img317Title,
            'title': thermalVeilImages.img317Title,
          });
        }
        else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img318,
            'alt': thermalVeilImages.img318Title,
            'title': thermalVeilImages.img318Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img316,
            'alt': thermalVeilImages.img316Title,
            'title': thermalVeilImages.img316Title,
          });
        }
      }
    }
    // Вертикально
    else if (thermalVeilInstMethodValue == 3) {
      // Вертикально Электрические Распашные - Ширина до 2м
      if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img25,
            'alt': thermalVeilImages.img25Title,
            'title': thermalVeilImages.img25Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img26,
            'alt': thermalVeilImages.img26Title,
            'title': thermalVeilImages.img26Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img24,
            'alt': thermalVeilImages.img24Title,
            'title': thermalVeilImages.img24Title,
          });
        }
      }
      // Вертикально Электрические Распашные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img226,
            'alt': thermalVeilImages.img226Title,
            'title': thermalVeilImages.img226Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img227,
            'alt': thermalVeilImages.img227Title,
            'title': thermalVeilImages.img227Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img225,
            'alt': thermalVeilImages.img225Title,
            'title': thermalVeilImages.img225Title,
          });
        }
      }
      // Вертикально Электрические Подьемные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img211,
            'alt': thermalVeilImages.img211Title,
            'title': thermalVeilImages.img211Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img212,
            'alt': thermalVeilImages.img212Title,
            'title': thermalVeilImages.img212Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img210,
            'alt': thermalVeilImages.img210Title,
            'title': thermalVeilImages.img210Title,
          });
        }
      }
      // Вертикально Электрические Откатные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 4
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img220,
            'alt': thermalVeilImages.img220Title,
            'title': thermalVeilImages.img220Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img221,
            'alt': thermalVeilImages.img221Title,
            'title': thermalVeilImages.img221Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img219,
            'alt': thermalVeilImages.img219Title,
            'title': thermalVeilImages.img219Title,
          });
        }
      }
      // Вертикально Водяные Распашные - Ширина до 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue <= 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img35,
            'alt': thermalVeilImages.img35Title,
            'title': thermalVeilImages.img35Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img36,
            'alt': thermalVeilImages.img36Title,
            'title': thermalVeilImages.img36Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img34,
            'alt': thermalVeilImages.img34Title,
            'title': thermalVeilImages.img34Title,
          });
        }
      }
      // Вертикально Водяные Распашные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img326,
            'alt': thermalVeilImages.img326Title,
            'title': thermalVeilImages.img326Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img327,
            'alt': thermalVeilImages.img327Title,
            'title': thermalVeilImages.img327Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img325,
            'alt': thermalVeilImages.img325Title,
            'title': thermalVeilImages.img325Title,
          });
        }
      }
      // Вертикально Водяные Откатные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 4
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img320,
            'alt': thermalVeilImages.img320Title,
            'title': thermalVeilImages.img320Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img321,
            'alt': thermalVeilImages.img321Title,
            'title': thermalVeilImages.img321Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img319,
            'alt': thermalVeilImages.img319Title,
            'title': thermalVeilImages.img319Title,
          });
        }
      }
      // Водяные Подьемные Вертикально - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img311,
            'alt': thermalVeilImages.img311Title,
            'title': thermalVeilImages.img311Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img312,
            'alt': thermalVeilImages.img312Title,
            'title': thermalVeilImages.img312Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img310,
            'alt': thermalVeilImages.img310Title,
            'title': thermalVeilImages.img310Title,
          });
        }
      }
    }
    // Сбоку с двух сторон
    else if (thermalVeilInstMethodValue == 4) {
      // Cбоку с двух сторон Электрические Распашные - Ширина более 2м
      if (thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img229,
            'alt': thermalVeilImages.img229Title,
            'title': thermalVeilImages.img229Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img230,
            'alt': thermalVeilImages.img230Title,
            'title': thermalVeilImages.img230Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img228,
            'alt': thermalVeilImages.img228Title,
            'title': thermalVeilImages.img228Title,
          });
        }
      }
      // Сбоку с двух сторон Электрические Подьемные - Ширина более 2м
      else if (thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 2
          && thermalVeilDoorwayWidthValue > 2) {
        if (checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img214,
            'alt': thermalVeilImages.img214Title,
            'title': thermalVeilImages.img214Title,
          });
        } else if (checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img215,
            'alt': thermalVeilImages.img215Title,
            'title': thermalVeilImages.img215Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img213,
            'alt': thermalVeilImages.img213Title,
            'title': thermalVeilImages.img213Title,
          });
        }
      }
      // Сбоку с двух сторон Водяные Распашные - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 2
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img329,
            'alt': thermalVeilImages.img329Title,
            'title': thermalVeilImages.img329Title,
          });
        } else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img330,
            'alt': thermalVeilImages.img330Title,
            'title': thermalVeilImages.img330Title,
          });
        } else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img328,
            'alt': thermalVeilImages.img328Title,
            'title': thermalVeilImages.img328Title,
          });
        }
      }
      // Сбоку с двух сторон Водяные Подьемные - Ширина более 2м
      else if(thermalVeilGatesTypeValue == 3
          && thermalVeilWarmingTypeValue == 3
          && thermalVeilDoorwayWidthValue > 2) {
        if(checkboxAutomatics.is(':checked') && checkboxLimitSwitch.is(':checked')) { // Автоматика + включатель
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img314,
            'alt': thermalVeilImages.img314Title,
            'title': thermalVeilImages.img314Title,
          });
        }
        else if(checkboxAutomatics.is(':checked') &&
            checkboxLimitSwitch.is(':checked') && checkboxTermo.is(':checked')) { // Автоматика + включатель + терморегультор
          thermalVeilPictures.attr({
            'src': thermalVeilImages.img315,
            'alt': thermalVeilImages.img315Title,
            'title': thermalVeilImages.img315Title,
          });
        }
        else {
          thermalVeilPictures.attr({ // Без автоматики
            'src': thermalVeilImages.img313,
            'alt': thermalVeilImages.img313Title,
            'title': thermalVeilImages.img313Title,
          });
        }
      }
    }
    else {
      thermalVeilPictures.attr({
        'src': thermalVeilImages.img11,
        'alt': thermalVeilImages.img11Title,
        'title': thermalVeilImages.img11Title,
      });
    }
  });
  /* Calc-functionality END */

});