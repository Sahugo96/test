$(function (params) {
  
  $('.menu__link:not(.btn)').on('click', function () {
    $('.btn.btn--active').next().slideToggle(300);
    $('.btn.btn--active').removeClass('btn--active');
  });

  $('.btn').on('click',function () {
    // Решение проблемы с вложеностью выплывающих списков
    if (!$(this).hasClass('menu__link')){
      if (!$(this).hasClass('btn--active')) {
        $('.btn.btn--active').next().slideToggle(300);
        $('.btn.btn--active').removeClass('btn--active');
      }
    }

    $(this).next().slideToggle(300);
    if ($(this).hasClass('btn--active'))
      $(this).removeClass('btn--active');
    else
      $(this).addClass('btn--active');
  })

  // Первый слайдер 
  $('.about__slider').slick({
    lazyLoad: 'ondemand',
    // autoplay: true,
    // autoplaySpeed: 5000,
    arrows: true,
    responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }]
  });
  // Второй слайдер
  
  $('.gallery__list').slick({
    lazyLoad: 'ondemand',
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1140,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  $('.gallery__favorite').on('click', function () {
    $(this).parent().toggleClass('favorite');
  })

  // я знаю, что можно через css это сделать, но я это сделал со стороны оптимизации сайта(не надо создавать в каждом товаре 3 блока, а создаётся сразу только в нужных)
  $.each($('.gallery__item'), function (index, val) {
    if ($(this).hasClass('action'))
      $(this).find('.gallery__characteristics').append('<li class="gallery__characteristic gallery__characteristic--action">Акция -25%</li>');
    if ($(this).hasClass('new'))
      $(this).find('.gallery__characteristics').append('<li class="gallery__characteristic gallery__characteristic--new">Новинка</li>');
    if ($(this).hasClass('comment'))
      $(this).find('.gallery__characteristics').append('<li class="gallery__characteristic gallery__characteristic--comment">Рекомендуем</li>');
  });

  $(".gallery__item").hover(function () {$('.slick-dots').css("z-index", "-1");
  }, function () {$('.slick-dots').css("z-index", "0")});

  // Ограничение по количеству точек
  var elSlider2 = $('.slick-dots li');
  $('.slick-dots button').on('click', function () {
    setTimeout(skip, 50);
    
    function skip() {
      for (let i = 0; i < elSlider2.length; i++) {
        if (elSlider2[i].classList.contains('slick-active')) {
          if (i < 2) {
            for (var j = 0; j < 5; ++j) {
              elSlider2[j].style.display = 'block';
            }
            i = 4;
            continue;
          } else if (i > 1 && i < elSlider2.length - 2) {
            for (var j = i - 2; j < i + 3; ++j) {
              elSlider2[j].style.display = 'block';
            }
            i += 2;
            continue;
          } else if (i > elSlider2.length - 3) {
            for (var j = elSlider2.length - 5; j < elSlider2.length; ++j)
              elSlider2[j].style.display = 'block';
            break;
          }
        }
        elSlider2[i].style.display = 'none';
      }
    }
  });
  // Checkbox и radio-btn hasAttribute
  $.each($('.bottom__label'), function (index, val) {
    if ($(this).find('input').attr('disabled')) {
      $(this).addClass('disabled');
    }
    if ($(this).find('input').prop('checked') == true) {
      if ($(this).hasClass('checkbox'))
        $(this).addClass('checkbox--active');
      if ($(this).hasClass('radio-btn')) {
        $('.bottom__form .radio-btn').removeClass('radio-btn--active');
        $(this).addClass('radio-btn--active');
      }
    }
  })
  $('.bottom__label').on('click', function () {
    if ($(this).find('input').prop('checked') == true) {
      if ($(this).hasClass('checkbox'))
        $(this).toggleClass('checkbox--active');
      if ($(this).hasClass('radio-btn')) {
        $('.bottom .radio-btn').removeClass('radio-btn--active');
        $(this).addClass('radio-btn--active');
      }
    }
    
  })
});