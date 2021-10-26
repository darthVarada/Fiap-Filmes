const API_KEY = '18c0e106046f53b9f087ac6efa0b07f1';

function gerarFilmes(){
    var filmes = document.getElementById('filmes');
    for(let i = 0; i<4; i++){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(filme => {
                filmes.insertAdjacentHTML("beforeend", `<div class="filme">
                <a href="./detalhes.html?f=${filme.results[i].id}">
                    <img src="https://image.tmdb.org/t/p/original${filme.results[i].poster_path}" loading="lazy">
                </a>
                <p>${filme.results[i].original_title}</p>
                <p>${filme.results[i].vote_average}</p>
                <a class="botao" href="./detalhes.html?f=${filme.results[i].id}">Detalhes</a>
            </div>`);
            });
    }
}
function gerarDetalhes(id){
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
            .then(res => res.json())
            .then(filme => {
                document.querySelector('section.filme-resumo h2').innerHTML=filme.original_title;
                document.querySelector('section.filme-resumo p').innerHTML=filme.overview;
                document.querySelector('aside div p#titulo-tecnica').innerHTML=filme.original_title;
                document.querySelector('aside div p#filme-idioma').innerHTML=filme.original_language;
                document.querySelector('aside div p#filme-orcamento').innerHTML='US$ '+filme.budget;
                document.querySelector('aside div p#filme-receita').innerHTML='US$ '+filme.revenue;
                document.querySelector('aside div p#filme-ano').innerHTML=filme.release_date;
                document.querySelector('aside div p#filme-nota').innerHTML=filme.vote_average;    
                document.querySelector('section.filme-resumo div.filme-img img').src=`https://image.tmdb.org/t/p/original${filme.poster_path}`;
                document.querySelector('section.filme-resumo').style.background=`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 100%), url('https://image.tmdb.org/t/p/original${filme.backdrop_path}')`;
                document.querySelector('section.filme-info div.ator img').src=`https://image.tmdb.org/t/p/original${filme.credits.cast[0].profile_path}`;
                document.querySelector('section.filme-info div.ator p.ator-nome').innerHTML=filme.credits.cast[0].original_name;
                document.querySelector('section.filme-info div.ator p.ator-personagem').innerHTML=filme.credits.cast[0].character;
            });
}
