// Variaveis Globais
var urlBase ='https://api.themoviedb.org/3/';
var urlImg = 'https://image.tmdb.org/t/p/';
var apiKey = "0ee05a8fe5aefee62bbcafda1e92b900";

// Requisição das Configurações da API
var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    (this.responseText);
  }
});
// Abrindo Requisição.
xhr.open("GET", urlBase+"configuration?api_key="+apiKey);
// Enviando Requisição.
xhr.send();

// Requisição Week/Movie pelo XMLHttp 
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        weekFilmes(data.results);
    }
};
// Abrindo Requisição.
request.open("GET", urlBase+"trending/movie/week?api_key="+apiKey+"&language=pt-BR", true);
// Enviando Requisição.
request.send();

//Função após resposta XMLHttp
function weekFilmes(film) {
    var mostar = "";
    var title = "";
    var i;

    title += '<h1>Filmes Em Alta</h1>';

    for(i = 0; i < film.length; i++) {
    	mostar += '<div class="card" style="width: 20rem;">';
		mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w300/'+film[i].poster_path+'">';
		mostar += '<div class="card-body">';
		mostar += '<h5>'+film[i].title+'</h5>';
        mostar += '<p class="card-text"><small class="text-muted"><strong>Sinopse:</strong> '+film[i].overview+'</small></p>';
		mostar += '<p class="card-text"><small class="text-muted"><strong>Data de Lançamento:</strong> '+film[i].release_date+'</small></p>';
		mostar += '<p class="card-text"><small class="text-muted"><strong>Média:</strong> '+film[i].vote_average+'</small></p>';
        mostar += '<input id="btnButton" type="button" class="btn btn-dark" value="Lista Desejo" onClick="filme('+film[i].id+')">';
        mostar += '<input type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-dark" value="+Informações" onClick="mais('+film[i].id+')">';
		mostar += '</div>';
		mostar += '</div>';
    }
    document.getElementById("root").innerHTML = mostar;
    document.getElementById("title").innerHTML = title;
}
//__________________________________________Fim Week___________________________________________________________________________________

// Variavel que pega o Botao.
var pPesquisa = document.getElementById("pPesquisa");

// Adicionado a função onclick no Botão, pegando o valor digitado no Form.
pPesquisa.onclick = function () {

    // Pegadno Value
    var pValue = document.getElementById("pValue").value;

    // Fazendo Requisição
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            mPesquisa(data.results);
        }
    };

    // Abrindo Requisição.
    request.open("GET", urlBase+'search/movie?api_key='+apiKey+'&query='+pValue+"&language=pt-BR", true);

    // Add a função de Submit no Form.
    document.getElementById('form').addEventListener('submit', pesquisarFilmes);

    // Função Pesquisa.
    function pesquisarFilmes(e){
        //console.log(e);
        e.preventDefault();
    }

    // Mostrando o resultado da busca.
    function mPesquisa(film){
        var mostar = "";
        var title = "";
        var i;

        title += '<h1>Resultado da Pesquisa</h1>';

        for(i = 0; i < film.length; i++) {
            mostar += '<div class="card" style="width: 20rem;">';
            mostar += '<img class="img-thumbnail" alt="Imagem não Encontrada!" src="'+urlImg+'w300/'+film[i].poster_path+'">';
            mostar += '<div class="card-body">';
            mostar += '<h5>'+film[i].title+'</h5>';
            mostar += '<p class="card-text"><small class="text-muted"><strong>Sinopse:</strong> '+film[i].overview+'</small></p>';
            mostar += '<p class="card-text"><small class="text-muted"><strong>Data de Lançamento:</strong> '+film[i].release_date+'</small></p>';
            mostar += '<p class="card-text"><small class="text-muted"><strong>Média:</strong> '+film[i].vote_average+'</small></p>';
            mostar += '<input id="btnButton" type="button" class="btn btn-dark" value="Lista Desejo" onClick="filme('+film[i].id+')">';
            mostar += '<input type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-dark" value="+Informações" onClick="mais('+film[i].id+')">';
            mostar += '</div>';
            mostar += '</div>';
        }
        document.getElementById("root").innerHTML = mostar;
        document.getElementById("title").innerHTML = title;      
    }
    // Enviando Requisição.
    request.send();
}
//___________________________________________Fim Search__________________________________________________________________________________________

// Função para pegar o id do filme
function filme(id) {
    //Atribuido o resultado em uma variavel
    idFilme = (id);

    //criando requisição
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            Adicionar(data);
        }
    };
    // Abrindo Requisição.
    request.open("GET", urlBase+"movie/"+idFilme+"?api_key="+apiKey+"&language=pt-BR", true);
    // Enviando Requisição.
    request.send();

//Função onde pega o que tem no local storage, caso nulo, ele atribui um array.     
function Adicionar(film) {
    var listDesejo = [];
    listDesejo = localStorage.getItem("Lista Desejo");
    listDesejo = JSON.parse(listDesejo);
    if (listDesejo == null) {
        listDesejo = [];
    }
    //Criando variavel que formata em json o resultado.
    var filme = JSON.stringify({
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
        release_date: film.release_date,
        overview: film.overview,
        vote_average: film.vote_average
    });
    // Adicionando filme
    listDesejo.push(filme);

    // Salvando filme no Local Storage
    localStorage.setItem("Lista Desejo", JSON.stringify(listDesejo));
    alert("Filme Adicionado a lista de Desejo");
    return true;
  }
}

function mais(id) {
    idFilme = (id);

    //criando requisição
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            mInfo(data);
        }
    };
    // Abrindo Requisição.
    request.open("GET", urlBase+"movie/"+idFilme+"?api_key="+apiKey+"&language=pt-BR", true);
    // Enviando Requisição.
    request.send();

    function mInfo(film) {
        console.log(film)
        var mostrar = "";
        var produtora ="";
        var i;

        for (i = 0; i < film.production_companies.length; i++) {
            produtora += '<img src="'+urlImg+'w92/'+film.production_companies[i].logo_path+'">';
        }

        mostrar += '<img class="card-img-top" alt="Imagem não Encontrada!" src="'+urlImg+'w500/'+film.backdrop_path+'">';
        mostrar += '<h5>'+film.title+'</h5>';
        mostrar += '<p class="card-text" style="overflow: visible; white-space: normal; width: auto; text-align: justify;"><small class="text-muted"><strong>Sinopse:</strong> '+film.overview+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Data de Lançamento:</strong> '+film.release_date+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Média:</strong> '+film.vote_average+'</small></p>';
        mostrar += '<p class="card-text"><small class="text-muted"><strong>Produtora: </strong></small></p>'+produtora+'';
        
        document.getElementById("mOutros").innerHTML = mostrar;
    }
}