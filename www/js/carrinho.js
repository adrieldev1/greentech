var localCarrinho = localStorage.getItem('carrinho');

if(localCarrinho){
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length >0){
        //tem itens no carrinho
        //renderizar o carrinho
        rederizarCarrinho();
        // somar totais dos produtos
        calculartotal();

    }else{
        //mostrar carrinho vazio
        carrinhoVazio();

    }
}else{
    //mostrar carrinho vazio
    carrinhoVazio();

}

function rederizarCarrinho(){
    //esvaziar a area dos itens 
    $("#listacarrinho").empty();

    //percorrer o nosso carrinho  e alimentar
    $.each(carrinho, function(index,itemcarrinho){
        var itemDiv =`
        <!--item do carrinho-->
          <div class="item-carrinho">
            <div class="area-img">
              <img src="${itemcarrinho.item.imagem}">
            </div>
            <div class="area-details">
              <div class="sup">
                <span class="name-prod" >
                ${itemcarrinho.item.nome} 
                </span>
                <a  data-index="${index}" class="delete-item" href="#">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
              <div class="middle">
                <span>${itemcarrinho.item.principal_caracteristica}</span>
              </div>
              <div class="preco-quantidade">
                <span>${itemcarrinho.item.preco_promocional.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'})} </span>
                <div class="count" >
                  <a class="minus" data-index="${index}" href="#">-</a>
                  <input readonly class="qtd-item" type="text"
                  value="${itemcarrinho.quantidade}"> 
                  <a class="plus" data-index="${index}" href="#">+</a>
                </div>
              </div>
            </div>
          </div>
        `;

        $("#listacarrinho").append(itemDiv);

    });

    $(".delete-item").on('click',function(){
        var index = $(this).data('index');
        console.log('O indice é: ',index);
        //confirmar
        app.dialog.confirm('tem certeza que quer remover esse item ?','remover',function(){
        //remover o item do carrinho
        carrinho.splice(index, 1);
        //atualizar o carrinho com item removido
        localStorage.setItem('carrinho',JSON.stringify(carrinho));
        //atualizar pagina 
        app.views.main.router.refreshPage();
        });
    });

    $(".minus").on('click', function () {
      var index = $(this).data('index');
      console.log('O indice é: ', index);
      if(carrinho[index].quantidade >1){
        carrinho[index].quantidade--;
          carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
          localStorage.setItem('carrinho',JSON.stringify(carrinho));
          rederizarCarrinho();
          calculartotal();
          
      }else{
        var itemname = carrinho[index].item.nome;
        app.dialog.confirm(`gostria de remover  <strong>${itemname}</stromg>?`, 'remover',function(){
            carrinho.splice(index,1);
            localStorage.setItem('carrinho',JSON.stringify(carrinho));
            rederizarCarrinho();
            calculartotal();
        });
      }
      
     
  });

  $(".plus").on('click',function(){
    var index = $(this).data('index');
    console.log('O indice é: ',index);

    carrinho[index].quantidade++;
    carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
    rederizarCarrinho();
    calculartotal();
});

}

function calculartotal(){
    var totalcarrinho = 0;
    $.each(carrinho, function(index,itemcarrinho){
        totalcarrinho += itemcarrinho.total_item;

    });
    //mostrar total
    $("#subtotal").html(totalcarrinho.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'}));
}

function carrinhoVazio(){
    console.log('carrinho está vazio');
    //esvaziar lista do carrinho
    $("#listacarrinho").empty();

    //sumir itens de baixo botao e totais
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarcheckout").addClass('display-none');

    //mostrar sacolinha vazia
    $("#listacarrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif">
            <br><span class="color-gray" > Nada por enquanto...</span>

        </div>
    `);
}
$("#esvaziar").on('click', function () {
    app.dialog.confirm('tem certeza ? ', 'ESVAZIAR CARRINHO',function() {
        //apagar localstorage do carrinho
    localStorage.removeItem('carrinho');
    app.views.main.router.refreshPage();

    });
    
})

