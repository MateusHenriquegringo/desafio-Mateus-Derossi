class CaixaDaLanchonete {
  constructor() {
    this.produtos = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
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
    if (itens.length == 0) {
      return "Não há itens no carrinho de compra!";
    }
    // separa as informacoes recebidas para melhor tratamento
    let nomeItens = itens.map((e) => e.split(",")[0]);
    let quantidade = itens.map((e) => e.split(",")[1]);
    // trata erros com nomes de pedidos que nao estao no cardapio
    for (const nome of nomeItens) {
      if (!this.produtos.hasOwnProperty(nome)) {
        return "Item inválido!";
      }
    }
    // trata erro da quantidade pedida
    for (const n of quantidade) {
      if (n <= 0 || !n) {
        return "Quantidade inválida!";
      }
    }
    // trata erro de pedidos com adicionais sem conter os principais
    if (
      (nomeItens.includes("chantily") && !nomeItens.includes("cafe")) ||
      (nomeItens.includes("queijo") && !nomeItens.includes("sanduiche"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
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
