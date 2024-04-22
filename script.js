$(document).ready(function () {
  //Função para adicionar as fotos
  const baseImages = {
    todas: [
      "nos.jpg",
      "teddy.jpg",
      "nos1.jpg",
      "nos2.jpg",
      "nos3.jpg",
      "nos4.jpg",
      "nos5.jpg",
      "nos6.jpg",
      "teddy1.jpg",
      "teddy2.jpg",
      "teddy3.jpg",
      "teddy4.jpg",
      "teddy5.jpg",
      "teddy6.jpg",
      "flora.jpg",
      ,
      "flora1.jpg",
      "flora2.jpg",
      "flora3.jpg",
      "flora4.jpg",
      "flora5.jpg",
      "flora6.jpg",
    ],
    nos: [
      "nos.jpg",
      "nos1.jpg",
      "nos2.jpg",
      "nos3.jpg",
      "nos4.jpg",
      "nos5.jpg",
      "nos6.jpg",
    ],
    teddy: [
      "teddy.jpg",
      "teddy1.jpg",
      "teddy2.jpg",
      "teddy3.jpg",
      "teddy4.jpg",
      "teddy5.jpg",
      "teddy6.jpg",
    ],
    flora: [
      "flora.jpg",
      "flora1.jpg",
      "flora2.jpg",
      "flora3.jpg",
      "flora4.jpg",
      "flora5.jpg",
      "flora6.jpg",
    ],
  };

  function loadImages(categoria) {
    const images = baseImages[categoria];
    const boxImages = $("body").find(".box-images");

    //empty tem a única função de limpar
    boxImages.empty();
    images.forEach((img) => {
      console.log(img);
      boxImages.append(
        '<div class="imagem-item"> <div class="fechar-imagem">X</div> <img src="assets/' +
          img +
          '" alt="' +
          img +
          '"></div>'
      ); //a tag "alt" está sendo usada na função de ordem para dar nome a imagem(Verifica no console)
    });
  }

  //vai fazer abrir um pop-up ao clicar no botão
  $(".button").click(function () {
    // alert($(this).data('categoria'));

    //IF que vai "desclicar" o botão selecionado
    if ($(this).hasClass("active")) {
      $("body").find("button").removeClass("active");
    } else {
      //Não vai deixar selecionar dois botões ao mesmo tempo
      $("body").find(".button").removeClass("active");
      //vai alterar o backgorund do botão ao selecionar
      $(this).addClass("active");
    }

    //Função pra chamar as imagens
    const categoria = $(this).data("categoria");
    loadImages(categoria);
  });

  //Criada essa função, a mesma foi chamada no click abaixo
  function sortImagens(sort) {
    //Vai percorrer todas as classes (imagens) existentes dentro da classe (box-images)
    //Ordenação acrescente
    const imagens = $(".box-images .imagem-item");
    imagens.sort(function (a, b) {
      const imagemA = $(a).find("img").attr("alt");
      const imagemB = $(b).find("img").attr("alt");
      //Pra fazer comparação de imagens vai usar uma função a mais
      if (sort == "asc") {
        return imagemA.localeCompare(imagemB);
      } else {
        return imagemB.localeCompare(imagemA);
      }
    });
    //Vai jogar devolta as imagens no Box-images mas de forma ordenada
    $("body").find(".box-images").append(imagens);
  }

  //Vai fazer a função dos botões de ordenação
  //(Dentro de aspas vai o valor que é estatico - e fora das aspas vai valor variável)
  $("body").on("click", ".botao-ordenar", function () {
    const sort = $(this).data("sort");
    sortImagens(sort);
  });

  //Função para procurar imagens - Vai ser chamada toda vez que pesquisar
  //Essa função vai ocultar as imagens que não conferem com a busca
  function buscaImagens(busca) {
    const imagens = $(".box-images .imagem-item");
    imagens.each(function(){
      const nomeImagem = $(this).find("img").attr("alt");
      const imagemVisivel = nomeImagem.includes(busca);
      $(this).toggle(imagemVisivel);
    });
  }

  //Evento para usar o Input (Pesquisa)
  $("#pesquisa").on("input", function () {
    const busca = $(this).val();
    buscaImagens(busca);
  });

  //Função para dar zoom ao clicar na imagens
  $('body').on('click', 'img', function(){
   $(this).css('max-height', '100vh');
   $(this).parent().find('.fechar-imagem').show();
   $(this).parent().addClass('imagem-selecionada');
   $(this).parent().addClass('bg-img');
   
   //Bloqueio do scroll
   $('html, body').css({'overflow': 'hidden', 'height': '100%'});
  });

  //Função para remover o Zoom clicando no X
  $('body').on('click', '.fechar-imagem', function(){
    $(this).parent().removeClass('imagem-selecionada');
    $(this).parent().removeClass('bg-img');
    $(this).hide();
    //Vai ativar o scrool
   $('html, body').css({'overflow': 'auto', 'height': 'auto'});

  });

  //Vai carregar 'todas as imagens ao atualizar a pagina'
  loadImages("todas");
});
