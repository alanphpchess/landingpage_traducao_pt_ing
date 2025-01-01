
document.getElementById('idioma-pt').addEventListener('click', function (e) {
    e.preventDefault();
    definirIdiomaSelecionado('portugues');
});


document.getElementById('idioma-in').addEventListener('click', function (e) {
    e.preventDefault();
    definirIdiomaSelecionado('english');
});

function definirIdiomaSelecionado(idioma) {
    localStorage.setItem('idioma-escolhido', idioma);
    atualizarIdioma();
}

function getIdiomaSelecionado() {
    return localStorage.getItem('idioma-escolhido');
}

function atualizarIdioma() {

    var idiomaSelecionado = getIdiomaSelecionado();

    if(idiomaSelecionado == null){
        idiomaSelecionado = 'portugues';
    }

    $.ajax({
        type: 'POST',
        url: 'home/idioma',
        data: {
            idioma: idiomaSelecionado
        },
        beforeSend: function () {

        },
        success: function (response) {
            // location.reload();

            $('body').empty();
            $('body').html(response); 

        },
        error: function (xhr, status, error) {

        }
    });



}

document.addEventListener('DOMContentLoaded', function () {
    atualizarIdioma();
});

