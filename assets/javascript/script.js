
var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');
const logoImg = document.querySelector('.logo img');
var urlParams = new URLSearchParams(window.location.search);
var successParam = urlParams.get('success');


$('.formulario-cadastro').submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: 'home/contato',
        data: $(this).serialize(),
        beforeSend: function () {

            let timerInterval
            Swal.fire({
                html: '<h3>Encaminhando E-mail...</h3>',
                width: 300,
                heightAuto: true,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {

                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
            })

        },
        success: function (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'E-mail enviado com sucesso',
                showConfirmButton: false,
                timer: 1500
            });
            $('input, textarea').val('');
        },
        error: function (xhr, status, error) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'E-mail enviado com sucesso',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

});






$('.sub-btn').click(function () {
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');

});

$('.menu-t-btn').click(function () {
    $('.side-bar').addClass('active');
    $('.menu-t-btn').css("visibility", "hidden");
});

$('.close-btn').click(function () {
    $('.side-bar').removeClass('active');
    $('.menu-t-btn').css("visibility", "visible");
});

$('.item a').click(function () {
    $('.side-bar').removeClass('active');
    $('.menu-t-btn').css("visibility", "visible");
});

var behavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    options = {
        onKeyPress: function (val, e, field, options) {
            field.mask(behavior.apply({}, arguments), options);
        }
    };

$('.telefone').mask(behavior, options);


window.addEventListener('scroll', function () {
    var backToTop = document.getElementById('back-to-top');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY || window.pageYOffset;

    if (windowWidth <= 768 && scrollPosition > windowHeight / 2) {
        backToTop.classList.remove('hidden-arrow');
    } else {
        backToTop.classList.add('hidden-arrow');
    }
});



function itemMenu(itemId) {

    var menuItems = document.querySelectorAll(".menu li a");
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove("active");
    }


    if (itemId != 'simulacao') {
        document.querySelector("." + itemId + "").classList.add('active');
    }

}





