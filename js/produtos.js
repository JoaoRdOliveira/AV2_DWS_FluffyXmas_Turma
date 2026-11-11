// ========================================
// PRODUTOS (array de objetos)
// ========================================
// Cada produto é um objeto com os campos abaixo.
// Regras: id único (1 a 50), preco como NÚMERO (59.90, nunca "R$ 59,90"),
// imagem em caminho relativo e categoria sempre escrita IGUAL.
//
// promocao = desconto em PORCENTAGEM (número). 0 = sem promoção;
// 20 = 20% de desconto. Se for maior que 0, o card mostra o preço original,
// o preço com desconto e um selo. O preco continua sendo o preço ORIGINAL.
// destaque = true faz o produto aparecer em "Destaques" na Home.
//
// CATEGORIAS dos produtos (use exatamente estes nomes, ~10 produtos cada):
//   "Ursos", "Animais", "Papai Noel e Duendes", "Decoração", "Kits e Combos"
// O filtro "Animais" da página de produtos procura exatamente categoria: "Animais".
// Se mudar esse nome, mude também a comparação "animais" na seção
// FILTRO E BUSCA do script.js.
//
// Produtos 1 a 18 prontos. Continuar a lista até o id 50.
const produtos = [
    {
        id: 1,
        nome: "Ursinho Noel Caramelo",
        categoria: "Ursos",
        preco: 129.99,
        imagem: "img/produtos/urso-noel-caramelo.jpg",
        descricao: "Ursinho de pelúcia caramelo sentadinho, com gorro de Papai Noel enfeitado com frutinhas vermelhas.",
        promocao: 0,
        destaque: true
    },
    {
        id: 2,
        nome: "Urso Felpudo Noel",
        categoria: "Ursos",
        preco: 149.99,
        imagem: "img/produtos/urso-felpudo-noel.jpg",
        descricao: "Urso de pelúcia marrom bem felpudo, com focinho claro e gorro de Papai Noel.",
        promocao: 0,
        destaque: false
    },
    {
        id: 3,
        nome: "Ursinho Neve com Enfeite de Estrela",
        categoria: "Ursos",
        preco: 139.99,
        imagem: "img/produtos/ursinho-neve-estrela.jpg",
        descricao: "Ursinho cacheado cor de creme, com gorro de tricô vermelho e cachecol, abraçado a um enfeite de vidro em forma de estrela.",
        promocao: 0,
        destaque: true
    },
    {
        id: 4,
        nome: "Ursinho Neve com Ramo de Visco",
        categoria: "Ursos",
        preco: 129.99,
        imagem: "img/produtos/ursinho-neve-visco.jpg",
        descricao: "O mesmo ursinho cacheado cor de creme, com gorro de tricô e cachecol vermelhos, posando com um ramo de visco.",
        promocao: 15,
        destaque: false
    },
    {
        id: 5,
        nome: "Ursinho Neve com Bola de Neve",
        categoria: "Ursos",
        preco: 129.99,
        imagem: "img/produtos/ursinho-neve-bola.jpg",
        descricao: "Ursinho cacheado de gorro de tricô vermelho e cachecol, brincando com uma bola de neve cheia de brilho.",
        promocao: 0,
        destaque: false
    },
    {
        id: 6,
        nome: "Dupla de Ursinhos Natalinos",
        categoria: "Kits e Combos",
        preco: 249.99,
        imagem: "img/produtos/dupla-ursinhos-natalinos.jpg",
        descricao: "Dois ursinhos de pelúcia abraçadinhos: um de gravata xadrez e outro de gorro de Papai Noel, com enfeites em forma de coração.",
        promocao: 10,
        destaque: true
    },
    {
        id: 7,
        nome: "Kit Saco do Papai Noel com Ursinho",
        categoria: "Kits e Combos",
        preco: 299.99,
        imagem: "img/produtos/saco-noel-ursinho.jpg",
        descricao: "Saco vermelho do Papai Noel com um ursinho de gorro dentro, acompanhado de caixas de presente embrulhadas.",
        promocao: 0,
        destaque: true
    },
    {
        id: 8,
        nome: "Ursinho Vermelho de Tricô",
        categoria: "Ursos",
        preco: 119.99,
        imagem: "img/produtos/ursinho-vermelho-trico.jpg",
        descricao: "Ursinho todo vermelho, feito de tricô, bem macio e perfeito para combinar com a decoração de Natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 9,
        nome: "Urso Marrom Presenteiro",
        categoria: "Ursos",
        preco: 149.99,
        imagem: "img/produtos/urso-marrom-presente.jpg",
        descricao: "Urso de pelúcia marrom, grande e fofinho, segurando um presente embrulhado em tecido natalino.",
        promocao: 20,
        destaque: false
    },
    {
        id: 10,
        nome: "Ursinho Azul com Ukulele",
        categoria: "Ursos",
        preco: 139.99,
        imagem: "img/produtos/ursinho-azul-ukulele.jpg",
        descricao: "Ursinho azul de pelúcia abraçado a um ukulele, ao lado de uma árvore de Natal com bolas prateadas.",
        promocao: 0,
        destaque: false
    },
    {
        id: 11,
        nome: "Trio Amigos de Pelúcia",
        categoria: "Animais",
        preco: 329.99,
        imagem: "img/produtos/trio-amigos-poltrona.jpg",
        descricao: "Trio de pelúcias para decorar o canto de Natal: um ursinho, um tigre e um cachorrinho.",
        promocao: 10,
        destaque: false
    },
    {
        id: 12,
        nome: "Ursinho de Inverno de Resina",
        categoria: "Decoração",
        preco: 99.99,
        imagem: "img/produtos/ursinho-inverno-resina.jpg",
        descricao: "Estatueta de ursinho de resina com touca, cachecol azul e vassourinha, segurando um boneco de neve.",
        promocao: 0,
        destaque: false
    },
    {
        id: 13,
        nome: "Rena Presenteira de Resina",
        categoria: "Animais",
        preco: 89.99,
        imagem: "img/produtos/rena-presenteira.jpg",
        descricao: "Estatueta de rena de resina de nariz vermelho, abraçada a um coração com laço dourado e cercada de brinquedos.",
        promocao: 0,
        destaque: false
    },
    {
        id: 14,
        nome: "Papai Noel Azul Glitter",
        categoria: "Papai Noel e Duendes",
        preco: 129.99,
        imagem: "img/produtos/papai-noel-azul.jpg",
        descricao: "Estatueta de Papai Noel de casaco azul de tricô com glitter, carregando um ursinho branco e uma pinha.",
        promocao: 25,
        destaque: false
    },
    {
        id: 15,
        nome: "Enfeite de Porcelana Saquinho de Presentes",
        categoria: "Decoração",
        preco: 79.99,
        imagem: "img/produtos/enfeite-porcelana-saco.jpg",
        descricao: "Enfeite de porcelana pintada em forma de saquinho de presentes, com ursinho e Papai Noel e fita vermelha para pendurar.",
        promocao: 0,
        destaque: false
    },
    {
        id: 16,
        nome: "Enfeite Ursinho de Suéter",
        categoria: "Decoração",
        preco: 49.99,
        imagem: "img/produtos/ursinho-enfeite-sueter.jpg",
        descricao: "Enfeite de árvore em forma de ursinho de suéter claro e cachecol rosa, com argolinha para pendurar.",
        promocao: 0,
        destaque: false
    },
    {
        id: 17,
        nome: "Kit Enfeites de Árvore Neve e Ursinho",
        categoria: "Decoração",
        preco: 159.99,
        imagem: "img/produtos/kit-enfeites-arvore.jpg",
        descricao: "Kit de enfeites para árvore com bonecos de neve, ursinho de pelúcia, bolas e caixinhas de presente.",
        promocao: 0,
        destaque: false
    },
    {
        id: 18,
        nome: "Mega Kit Vila do Natal",
        categoria: "Kits e Combos",
        preco: 899.99,
        imagem: "img/produtos/mega-kit-vila-natal.jpg",
        descricao: "Kit completo com ursinhos de pelúcia, saquinhos de presentes, soldadinho tocando tambor, trenó e árvore decorada.",
        promocao: 25,
        destaque: true
    },
    {
        id: 19,
        nome: "Rena de Nariz Vermelho",
        categoria: "Animais",
        preco: 149.99,
        imagem: "img/produtos/rena-bonita.jpg",
        descricao: "Pelúcia de rena do papai noel com nariz vermelho.",
        promocao: 0,
        destaque: false
    },
    {
        id: 20,
        nome: "Rena com Roupas Xadrez",
        categoria: "Animais",
        preco: 159.99,
        imagem: "img/produtos/rena-vestida-xadrez.jpg",
        descricao: "Uma pelúcia de uma rena do papai noel usando roupas com um padrão xadrez.",
        promocao: 0,
        destaque: false
    },
    {
        id: 21,
        nome: "Kit 3 Mini Renas",
        categoria: "Animais",
        preco: 359.99,
        imagem: "img/produtos/conjunto-mini-renas.jpg",
        descricao: "Kit contendo 3 renas do papai noel de pelúcia em tamanho mini.",
        promocao: 10,
        destaque: false
    },
    {
        id: 22,
        nome: "Conjunto 2 Ursos",
        categoria: "Animais",
        preco: 229.99,
        imagem: "img/produtos/dois-ursos-arvore-noel.jpg",
        descricao: "Conjunto com dois ursinhos de pelúcia fantasiados.",
        promocao: 0,
        destaque: true
    },
    {
        id: 23,
        nome: "Enfeite Noel com Urso",
        categoria: "Decoração",
        preco: 129.99,
        imagem: "img/produtos/enfeite-noel-urso.jpg",
        descricao: "Pequeno enfeite do papai noel segurando um ursinho.",
        promocao: 0,
        destaque: false
    },
    {
        id: 24,
        nome: "Enfeite Noel no Avião",
        categoria: "Decoração",
        preco: 129.99,
        imagem: "img/produtos/enfeite-noel-aviao.jpg",
        descricao: "Pequeno enfeite do papai noel voando em um avião de madeira",
        promocao: 10,
        destaque: true
    },
    {
        id: 25,
        nome: "Enfeite Cavalo para Árvore",
        categoria: "Decoração",
        preco: 49.99,
        imagem: "img/produtos/cavalo-enfeite-arvore.jpg",
        descricao: "Pequeno cavalo de madeira que pode ser preso em árvore de natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 26,
        nome: "Urso de Moletom",
        categoria: "Animais",
        preco: 169.99,
        imagem: "img/produtos/urso-pequeno-moletom.jpg",
        descricao: "Pequeno urso de pelúcia usando um moletom cinza.",
        promocao: 0,
        destaque: false
    },
    {
        id: 27,
        nome: "Enfeite Noel com Urso",
        categoria: "Decoração",
        preco: 129.99,
        imagem: "img/produtos/enfeite-noel-urso.jpg",
        descricao: "Pequeno enfeite do papai noel segurando um ursinho.",
        promocao: 0,
        destaque: false
    },
    {
        id: 28,
        nome: "Placa Decorativa",
        categoria: "Decoração",
        preco: 79.99,
        imagem: "img/produtos/placa-preparado-natal.jpg",
        descricao: "Uma placa escrito Ready For Christimas.",
        promocao: 0,
        destaque: false
    },
    {
        id: 29,
        nome: "Bolinhas Enfeites (Unidade)",
        categoria: "Decoração",
        preco: 14.99,
        imagem: "img/produtos/bola-enfeite.jpg",
        descricao: "Unidade de bolinha vermelha para pendurar na árvore de natal.",
        promocao: 0,
        destaque: true
    },
    {
        id: 30,
        nome: "Árvore de Natal Verde",
        categoria: "Decoração",
        preco: 649.99,
        imagem: "img/produtos/arvore-completa.jpg",
        descricao: "Árvore de natal completa na cor verde escuro.",
        promocao: 15,
        destaque: true
    },
    {
        id: 31,
        nome: "Pingente Coração",
        categoria: "Decoração",
        preco: 39.99,
        imagem: "img/produtos/pingente-coracao.jpg",
        descricao: "Pingente de coração para pendurar na árvore de natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 32,
        nome: "Pequenos Papais Noels para Árvore",
        categoria: "Decoração",
        preco: 19.99,
        imagem: "img/produtos/minis-papais-noeises.jpg",
        descricao: "Unidade de pequenos pingentes de papai noel para pendurar na árvore de natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 33,
        nome: "Bola Enorme Enfeite",
        categoria: "Decoração",
        preco: 24.99,
        imagem: "img/produtos/bola-enorme.jpg",
        descricao: "Uma bola de decoração para pendurar na árvore de natal em tamanho extra grande.",
        promocao: 0,
        destaque: false
    },
    {
        id: 34,
        nome: "Guilanda de Porta",
        categoria: "Decoração",
        preco: 49.99,
        imagem: "img/produtos/guilanda-verde-porta.jpg",
        descricao: "Uma linda guirlanda de Natal com um boneco de neve, enfeites vermelhos e folhagens verdes em uma porta rústica.",
        promocao: 0,
        destaque: true
    },
    {
        id: 35,
        nome: "Árvore de Cerâmica",
        categoria: "Decoração",
        preco: 99.99,
        imagem: "img/produtos/arvore-ceramica.jpg",
        descricao: "Exibição artística de árvores de Natal cerâmicas com recortes em forma de estrela, decoração festiva.",
        promocao: 10,
        destaque: false
    },
    {
        id: 36,
        nome: "Fantasia Astolfo",
        categoria: "",
        preco: 189.99,
        imagem: "img/produtos/fantasia-rena.jpg",
        descricao: "Vestimenta completa do astolfo, do papai noel.",
        promocao: 0,
        destaque: true
    },
    {
        id: 37,
        nome: "Bonecos Quebra-Nozes",
        categoria: "",
        preco: 67.99,
        imagem: "img/produtos/quebra-nozes-madeira.jpg",
        descricao: "Quebra-nozes de madeira para decoração natalina, perfeitos para ambientes festivos.",
        promocao: 15,
        destaque: false
    },
    {
        id: 38,
        nome: "Papai Noel Enfeito",
        categoria: "Decoração",
        preco: 9.99,
        imagem: "img/produtos/enfeito-noel-arvore-tecido.jpg",
        descricao: "Belo enfeito simples do rosto do papai noel.",
        promocao: 0,
        destaque: false
    },
    {
        id: 39,
        nome: "Kit de Globos de Neve",
        categoria: "",
        preco: 449.99,
        imagem: "img/produtos/kit-globos-natal.jpg",
        descricao: "Uma coleção vibrante de globos de neve de Natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 40,
        nome: "Enfeite Estrela",
        categoria: "Decoração",
        preco: 24.99,
        imagem: "img/produtos/enfeite-estrela-tecido.jpg",
        descricao: "Enfeite de árvore de natal de estrela de torta.",
        promocao: 10,
        destaque: false
    },
    {
        id: 41,
        nome: "Sinos para Árvore",
        categoria: "Decoração",
        preco: 219.99,
        imagem: "img/produtos/sinos-enfeite-arvore.jpg",
        descricao: "Sinos e decorações natalinas elegantes que enfeitam e refletem o espírito festivo do Natal.",
        promocao: 0,
        destaque: true
    },
    {
        id: 42,
        nome: "Estrela de Topo",
        categoria: "Decoração",
        preco: 349.99,
        imagem: "img/produtos/estrela-topo.jpg",
        descricao: "Estrela de topo de árvore de natal que brilha.",
        promocao: 20,
        destaque: true
    },
    {
        id: 43,
        nome: "Kit Enfeites de Árvore",
        categoria: "Kits e Combos",
        preco: 499.99,
        imagem: "img/produtos/kit-enfeites-completo.jpg",
        descricao: "Kit completo com vários enfeites. Suficiente para árvore de natal grande.",
        promocao: 10,
        destaque: false
    },
    {
        id: 44,
        nome: "Enfeite de Botas",
        categoria: "Decoração",
        preco: 274.99,
        imagem: "img/produtos/enfeite-par-botas.jpg",
        descricao: "Enfeite de bota festiva para pendurar em galho de árvore de Natal, evocando o espírito natalino.",
        promocao: 0,
        destaque: false
    },
    {
        id: 45,
        nome: "Ornamento de Unicórnio",
        categoria: "Decoração",
        preco: 34.99,
        imagem: "img/produtos/ornamento-unicornio.jpg",
        descricao: "Ornamento de unicórnio dourado para pendurar em árvore de natal.",
        promocao: 0,
        destaque: true
    },
    {
        id: 46,
        nome: "Bola Verde",
        categoria: "Decoração",
        preco: 14.99,
        imagem: "img/produtos/bola-verde-arvore.jpg",
        descricao: "Bola verde para pendurar em árvore de natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 47,
        nome: "Conjunto Bolas Douradas",
        categoria: "Kits e Combos",
        preco: 389.99,
        imagem: "img/produtos/conjunto-bolas-douradas.jpg",
        descricao: "Conjunto contendo 10 bolas douradas para decorar sua árvore de natal.",
        promocao: 15,
        destaque: false
    },
    {
        id: 48,
        nome: "Flores Vermelhas",
        categoria: "",
        preco: 69.99,
        imagem: "img/produtos/flores-vermelhas.jpg",
        descricao: "Flores vermelhas artificiais tematizadas para o natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 49,
        nome: "Bola Vermelha Ornamentada",
        categoria: "Decoração",
        preco: 29.99,
        imagem: "img/produtos/bola-vermelha-ornamentada.jpg",
        descricao: "Uma bola vermelha com detalhes em dourado para árvore de natal.",
        promocao: 0,
        destaque: false
    },
    {
        id: 50,
        nome: "Prato Personalizado",
        categoria: "",
        preco: 49.99,
        imagem: "img/produtos/prato-ornamentado.jpg",
        descricao: "Um prato pequeno com escrita natalina.",
        promocao: 0,
        destaque: true
    },
];
