fetch('js/backend.json')
    .then(response => response.json())
    .then(data=> {
    //salvar os dados vindos do back-end localmente
    //vamos ultilizar localstorage
    localStorage.setItem('produtos',JSON.stringify(data));
    console.log('dados dos produtos salvos no localstorage');
    
   
    
    //simular carregamento  on-line
    setTimeout(() => {
      $("#produtos").empty();

      data.forEach(produto => {
        var produtoHTML = `
        <!--item card-->
              <div class="item-card">
                <a data-id="${produto.id}" href="#" class="item">
                  <div class="img-container">
                    <img src="${produto.imagem}">
                  </div>
                  <div class="nome-rating">
                    <span class="color-gray">${produto.nome}</span>
                    <span class="bold margin-right">
                      <i class="mdi mdi-star"></i>
                      ${produto.rating}
                    </span>
                  </div>
                  <div class="price ">${produto.preco_promocional.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})}</div>
                </a>
              </div>
        `;
  
        $("#produtos").append(produtoHTML);
        
    });

    $(".item").on('click', function(){
      var id = $(this).attr('data-id');
      localStorage.setItem('detalhe', id);
      app.views.main.router.navigate('/detalhes/');
    });

    }, 1500);
    

    
    })
    .catch(error => console.error('erro ao fazer fetch dos dados:'+error)) || [];

    //ver quantos itens tem dentro do carrinho
    setTimeout(() => {
      var carrinho = JSON.parse(localStorage.getItem('carrinho'));

      //alimentar o contador da sacola 
      $('.btn-cart').attr('data-count',carrinho.length);
      
    }, 300);

    