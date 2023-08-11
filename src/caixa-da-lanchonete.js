class CaixaDaLanchonete {
  constructor() {
    this.produtos = {
      cafe: 3.00,
      chantily: 1.50,
      suco: 6.20,
      sanduiche: 6.50,
      queijo: 2.00,
      salgado: 7.25,
      combo1: 9.50,
      combo2: 7.50,
    };

    this.pagamentos = {
      dinheiro: 0.9501,
      debito: 1.0,
      credito: 1.03,
    };
  }
  calcularValorDaCompra(metodoDePagamento, itens) {
    // trata erros no metodo de pagamento
    if (!this.pagamentos.hasOwnProperty(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens == [] || itens == [""] || itens == "" || !itens) {
      return "Não há itens no carrinho de compra!";
    }
    // separa as informacoes recebidas para melhor tratamento
    let nomeItens = itens.map((e) => e.split(",")[0]);
    let quantidade = itens.map((e) => e.split(",")[1]);
    // trata erros com nomes de pedidos e pedidos adicionais sem principais
    for (const nome of nomeItens) {
      if (!this.produtos.hasOwnProperty(nome)) {
        return "Item inválido!";
      }
    }
    // trata erro com a quantidade pedida
    for (const n of quantidade) {
      if (n <= 0 || !n) {
        return "Quantidade inválida!";
      }
    }

    if (nomeItens.includes("chantily")) {
      if (!nomeItens.includes("cafe")) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }
    if (nomeItens.includes("queijo")) {
      if (!nomeItens.includes("sanduiche")) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }
    // realiza calculo da compra
    let total = 0;
    for (const infos of itens) {
      let [item, qnt] = infos.split(",");
      qnt = parseInt(qnt);
      total += this.produtos[item] * qnt * this.pagamentos[metodoDePagamento];
    }
    
    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
