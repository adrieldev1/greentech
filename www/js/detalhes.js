var id= parseInt(localStorage.getItem('detalhe'));

//PEGAR PRODUTS DOLOALSTORAGE
var produtos =JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produtos => produtos.id === id);

if(item){
    console.log('produto encontrado: ',item);
    //alimentar
    $("#imagem-detalhe").attr('src',item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + 'reviews');
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'}));
    $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL'}));

    var tabeladetalhes = $("#tabdetalhes");
    item.detalhes.forEach(detalhe => {
        var linha = `
        <tr>
            <td>${detalhe.caracteristica}</td>
            <td>${detalhe.detalhes}</td>
        </tr>
        `;
        
        tabeladetalhes.append(linha);

    });
}else{
    console.log('produto não encontrado: ');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

//funcao para add ao carrinho
function adicionarAoCarrinho(item,quantidade){
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);

    if (itemNoCarrinho) {
        //ja tem item no carrinho
        //adicionar a quantidade
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;

        
    }else{
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }

    //atualizar o localstorage de carrinho
    localStorage.setItem('carrinho',JSON.stringify(carrinho));

}
//clicou no add carrinho
$(".add-cart").on('click',function () {
    //add ao carrinho
    adicionarAoCarrinho(item,1);

    var toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });

    toastCenter.open();

});