class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      };
      this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }
    
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasDePagamento.includes(formaDePagamento)) {
        return 'Forma de pagamento inválida!';
      }
  
      if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
      }
      
      let total = 0;
      let hasPrincipal = false;
      
      for (const item of itens) {
        const [codigo, quantidade] = item.split(',');
        
        if (!this.cardapio[codigo]) {
          return 'Item inválido!';
        }
  
  
        if (this.cardapio[codigo].descricao.includes(`extra do`)) {
          const codigoPrincipal = codigo.replace('extra', '');
          if (!hasPrincipal) {
            return 'Item extra não pode ser pedido sem o principal';
          }
          if (!itens.includes(`${codigoPrincipal},${quantidade}`)) {
            return `Falta o item principal ${this.cardapio[codigoPrincipal].descricao}`;
          }
          total += this.cardapio[codigo].valor * quantidade;
        } else {
          hasPrincipal = true;
          total += this.cardapio[codigo].valor * quantidade;
        }
      }
      
      if (hasPrincipal) {
        if (formaDePagamento === 'dinheiro') {
          total *= 0.95;
        } else if (formaDePagamento === 'credito') {
          total *= 1.03;
        }
    
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
      } else {
        return 'Quantidade inválida!';
      }
    }
  }
  
  export { CaixaDaLanchonete };
  
  
  // Exemplos de uso:
  console.log(new CaixaDaLanchonete().calcularValorDaCompra('debito', ['chantily,1']));
  console.log(new CaixaDaLanchonete().calcularValorDaCompra('debito', ['cafe,1','chantily,1']));
  console.log(new CaixaDaLanchonete().calcularValorDaCompra('credito', ['combo1,1','cafe,2']));