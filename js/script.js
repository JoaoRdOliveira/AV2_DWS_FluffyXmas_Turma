// ========================================
// FORMATAÇÃO DE PREÇO
// ========================================
// Transforma o número 89.9 no texto "R$ 89,90"
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


// ========================================
// PREÇO COM PROMOÇÃO
// ========================================
// Devolve o preço que o cliente paga: o preço original menos o desconto (%).
// Sem promoção (promocao = 0), devolve o próprio preço.
// O Math.round arredonda para centavos.
function calcularPrecoFinal(produto) {
    return Math.round(produto.preco * (100 - produto.promocao)) / 100;
}


// ========================================
// CARDS DE PRODUTOS
// ========================================
// Recebe um produto (objeto do array) e devolve o HTML do card dele.
// Se o produto está em promoção, o card ganha um selo, um destaque visual
// e mostra o preço original riscado ao lado do preço com desconto.
function criarCard(produto) {
    let classeCard = "card";
    let selo = "";
    let precoHTML = `<strong>${formatarPreco(produto.preco)}</strong>`;

    if (produto.promocao > 0) {
        classeCard = "card card-promocao";
        selo = `<span class="selo-promocao">-${produto.promocao}%</span>`;
        precoHTML = `
                <s class="preco-antigo">${formatarPreco(produto.preco)}</s>
                <strong class="preco-promocional">${formatarPreco(calcularPrecoFinal(produto))}</strong>`;
    }

    return `
        <article class="${classeCard}">
            ${selo}
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            <div class="card-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                ${precoHTML}
                <button class="btn-comprar" data-id="${produto.id}">Adicionar ao carrinho</button>
            </div>
        </article>`;
}

// Transforma a lista de produtos em cards e coloca dentro da área indicada.
// Se a lista vier vazia, mostra uma mensagem no lugar dos cards.
function mostrarProdutos(lista, areaProdutos) {
    if (lista.length === 0) {
        areaProdutos.innerHTML = '<p class="sem-resultado">Nenhum produto encontrado.</p>';
    } else {
        areaProdutos.innerHTML = lista.map(criarCard).join("");
    }
}


// ========================================
// FILTRO E BUSCA
// ========================================
const campoBusca = document.getElementById("busca");
const seletorCategoria = document.getElementById("categoria");
const areaValor = document.getElementById("filtro-valor");
const campoValor = document.getElementById("valor-maximo");
const textoValor = document.getElementById("valor-selecionado");
const contador = document.getElementById("contador");

// Só roda na página que tem os campos de filtro (produtos.html)
if (campoBusca && seletorCategoria && campoValor && contador) {

    // --- Barra de valor: vai do menor ao maior preço entre todos os produtos ---
    // Usamos o preço que o cliente paga (com promoção). O Math.floor e o Math.ceil
    // arredondam para inteiros, para a barra alcançar o produto mais barato e o mais caro.
    const precos = produtos.map(produto => calcularPrecoFinal(produto));
    campoValor.min = Math.floor(Math.min(...precos));
    campoValor.max = Math.ceil(Math.max(...precos));
    campoValor.value = campoValor.max; // começa no máximo: mostra todos os preços

    document.getElementById("valor-minimo").textContent = formatarPreco(Number(campoValor.min));
    document.getElementById("valor-maior").textContent = formatarPreco(Number(campoValor.max));

    // Mostra, ao lado do texto, o valor em que a barra está
    function atualizarTextoValor() {
        textoValor.textContent = formatarPreco(Number(campoValor.value));
    }

    // Filtra os produtos conforme o texto digitado e o filtro escolhido,
    // depois desenha os cards de novo só com o resultado.
    function filtrarProdutos() {
        const texto = campoBusca.value.toLowerCase();
        const filtro = seletorCategoria.value;

        const resultado = produtos.filter(produto => {
            const combinaNome = produto.nome.toLowerCase().includes(texto);

            let combinaFiltro = true; // "todas": não restringe nada
            if (filtro === "destaques") {
                combinaFiltro = produto.destaque;
            } else if (filtro === "promocao") {
                combinaFiltro = produto.promocao > 0;
            } else if (filtro === "animais") {
                combinaFiltro = produto.categoria === "Animais";
            } else if (filtro === "valor") {
                combinaFiltro = calcularPrecoFinal(produto) <= Number(campoValor.value);
            }

            return combinaNome && combinaFiltro;
        });

        mostrarProdutos(resultado, document.getElementById("lista-produtos"));
        contador.textContent = `Mostrando ${resultado.length} de ${produtos.length} produtos`;
    }

    // Filtra a cada letra digitada e a cada troca de filtro
    campoBusca.addEventListener("input", filtrarProdutos);
    seletorCategoria.addEventListener("change", () => {
        // A barra de valor só aparece quando o filtro "Valor" está escolhido
        areaValor.hidden = seletorCategoria.value !== "valor";
        filtrarProdutos();
    });

    // Ao mover a barra, atualiza o texto e filtra de novo
    campoValor.addEventListener("input", () => {
        atualizarTextoValor();
        filtrarProdutos();
    });

    // Ao abrir a página: mostra o valor inicial e desenha todos os produtos
    atualizarTextoValor();
    filtrarProdutos();
}


// ========================================
// PRODUTOS NA HOME
// ========================================
// Duas listas separadas: produtos com destaque: true
// e produtos com promocao maior que 0. Usa os mesmos cards da página de produtos.
const listaDestaques = document.getElementById("lista-destaques");
const listaPromocoes = document.getElementById("lista-promocoes");

if (listaDestaques && listaPromocoes) {
    mostrarProdutos(produtos.filter(produto => produto.destaque), listaDestaques);
    mostrarProdutos(produtos.filter(produto => produto.promocao > 0), listaPromocoes);
}


// ========================================
// PARALLAX
// ========================================
// Cada elemento com data-velocidade se move uma fração da rolagem.
// Velocidades diferentes criam a sensação de profundidade.
const camadasParallax = document.querySelectorAll("[data-velocidade]");

if (camadasParallax.length > 0) {
    window.addEventListener("scroll", () => {
        const rolagem = window.scrollY; // pixels que a página já rolou

        camadasParallax.forEach(camada => {
            const velocidade = camada.dataset.velocidade;
            camada.style.transform = `translateY(${rolagem * velocidade}px)`;
        });
    });
}


// ========================================
// NEVE
// ========================================
// Cria 40 flocos e coloca na página. Cada um recebe posição, tamanho e
// velocidade diferentes (aleatórios). A queda em si é feita pelo CSS (@keyframes cair).
const quantidadeFlocos = 40;

for (let i = 0; i < quantidadeFlocos; i++) {
    const floco = document.createElement("div");
    floco.className = "floco";
    floco.textContent = "❄";
    floco.style.left = `${Math.random() * 98}vw`;
    floco.style.fontSize = `${10 + Math.random() * 20}px`;
    floco.style.animationDuration = `${6 + Math.random() * 8}s`;
    floco.style.animationDelay = `-${Math.random() * 10}s`; // atraso negativo: já começam espalhados
    document.body.appendChild(floco);
}


// ========================================
// SONS
// ========================================
// Música de fundo natalina, em volume bem baixo e em loop.
// Os navegadores bloqueiam som automático: ela só começa depois de um clique.
// O estado (tocando ou pausada) e o ponto da música ficam no localStorage,
// por isso a música continua ao trocar de página.
const musica = new Audio("audio/musica-natal.mp3");
musica.loop = true;   // repete sem parar
musica.volume = 0.1;  // bem baixinho, só de fundo (vai de 0 a 1)

// Botão de ligar/desligar, criado aqui para aparecer em todas as páginas
const botaoMusica = document.createElement("button");
botaoMusica.className = "btn-musica";
botaoMusica.textContent = "Tocar música";
document.body.appendChild(botaoMusica);

// O texto do botão acompanha o estado da música
musica.addEventListener("play", () => botaoMusica.textContent = "Pausar música");
musica.addEventListener("pause", () => botaoMusica.textContent = "Tocar música");

botaoMusica.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        localStorage.setItem("musicaTocando", "sim");
    } else {
        musica.pause();
        localStorage.setItem("musicaTocando", "nao");
    }
});

// Ao sair da página, guarda em que ponto a música estava
window.addEventListener("pagehide", () => {
    localStorage.setItem("musicaTempo", musica.currentTime);
});

// Ao abrir a página: se a música estava tocando, continua de onde parou
if (localStorage.getItem("musicaTocando") === "sim") {
    musica.currentTime = Number(localStorage.getItem("musicaTempo")) || 0;

    // Se o navegador bloquear, a música começa no primeiro clique em qualquer lugar da página
    musica.play().catch(() => {
        document.addEventListener("click", () => musica.play(), { once: true });
    });
}


// ========================================
// CARRINHO
// ========================================
// O carrinho é um array de objetos { id, quantidade }.
// Ele fica salvo no localStorage, por isso continua ao trocar de página.
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Salva o carrinho no navegador e atualiza o número no menu
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

// Soma as quantidades e mostra o total ao lado de "Carrinho" no menu
function atualizarContadorCarrinho() {
    const contadorMenu = document.getElementById("qtd-carrinho");
    if (contadorMenu) {
        contadorMenu.textContent = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    }
}

// Se o produto já está no carrinho, aumenta a quantidade; senão, adiciona
function adicionarAoCarrinho(id) {
    const item = carrinho.find(i => i.id === id);
    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ id: id, quantidade: 1 });
    }
    salvarCarrinho();
}

// Aumenta (+1) ou diminui (-1) a quantidade; se chegar a 0, remove o item
function alterarQuantidade(id, mudanca) {
    const item = carrinho.find(i => i.id === id);
    item.quantidade += mudanca;
    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
    } else {
        salvarCarrinho();
    }
}

// Tira o item do carrinho (filter guarda todos, menos o removido)
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    salvarCarrinho();
}

// --- Botões "Adicionar ao carrinho" (produtos.html e index.html) ---
// Os cards são criados pelo JS, então escutamos o clique na ÁREA que já existe
// (delegação de evento) e vemos qual botão foi clicado com evento.target.
function ativarBotoesComprar(area) {
    if (area) {
        area.addEventListener("click", (evento) => {
            if (evento.target.classList.contains("btn-comprar")) {
                adicionarAoCarrinho(Number(evento.target.dataset.id));
            }
        });
    }
}

ativarBotoesComprar(document.getElementById("lista-produtos"));
ativarBotoesComprar(listaDestaques);
ativarBotoesComprar(listaPromocoes);

// --- Página do carrinho (carrinho.html) ---
const listaCarrinho = document.getElementById("lista-carrinho");

if (listaCarrinho) {

    // Recebe um item do carrinho e devolve o HTML da linha dele
    function criarItemCarrinho(item) {
        const produto = produtos.find(p => p.id === item.id);
        return `
            <article class="item-carrinho">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="item-info">
                    <h3>${produto.nome}</h3>
                    <p>${formatarPreco(calcularPrecoFinal(produto))} cada</p>
                </div>
                <div class="item-quantidade">
                    <button data-acao="diminuir" data-id="${produto.id}">-</button>
                    <span>${item.quantidade}</span>
                    <button data-acao="aumentar" data-id="${produto.id}">+</button>
                </div>
                <strong>${formatarPreco(calcularPrecoFinal(produto) * item.quantidade)}</strong>
                <button data-acao="remover" data-id="${produto.id}">Remover</button>
            </article>`;
    }

    // Desenha o carrinho e calcula quantidade e total
    function mostrarCarrinho() {
        // Ignora itens salvos cujo produto não existe mais em produtos.js
        const itens = carrinho.filter(item => produtos.some(p => p.id === item.id));

        if (itens.length === 0) {
            listaCarrinho.innerHTML = `
                <p class="carrinho-vazio">Seu carrinho está vazio.
                <a href="produtos.html">Ver produtos</a></p>`;
        } else {
            listaCarrinho.innerHTML = itens.map(criarItemCarrinho).join("");
        }

        const quantidade = itens.reduce((soma, item) => soma + item.quantidade, 0);
        const total = itens.reduce((soma, item) => {
            const produto = produtos.find(p => p.id === item.id);
            return soma + calcularPrecoFinal(produto) * item.quantidade;
        }, 0);

        document.getElementById("itens-carrinho").textContent = quantidade;
        document.getElementById("total-carrinho").textContent = formatarPreco(total);
    }

    // Cliques nos botões -, + e Remover (também por delegação de evento)
    listaCarrinho.addEventListener("click", (evento) => {
        const acao = evento.target.dataset.acao;
        const id = Number(evento.target.dataset.id);

        if (acao === "aumentar") {
            alterarQuantidade(id, 1);
        } else if (acao === "diminuir") {
            alterarQuantidade(id, -1);
        } else if (acao === "remover") {
            removerDoCarrinho(id);
        }
        mostrarCarrinho();
    });

    mostrarCarrinho();
}

// Mostra a quantidade no menu ao abrir qualquer página
atualizarContadorCarrinho();


// ========================================
// CONTAGEM REGRESSIVA
// ========================================
// Mostra quanto tempo falta até o próximo Natal (25 de dezembro) e se atualiza a cada segundo.
const contagemDias = document.getElementById("contagem-dias");
const contagemHoras = document.getElementById("contagem-horas");
const contagemMinutos = document.getElementById("contagem-minutos");
const contagemSegundos = document.getElementById("contagem-segundos");
const mensagemContagem = document.getElementById("mensagem-contagem");

// Só roda na página que tem o contador (galeria.html)
if (contagemDias && contagemHoras && contagemMinutos && contagemSegundos && mensagemContagem) {

    function atualizarContagem() {
        const agora = new Date();
        let dias = 0;
        let horas = 0;
        let minutos = 0;
        let segundos = 0;
        let mensagem = "";

        // No próprio dia 25 de dezembro já é Natal (mês 11 = dezembro, pois os meses começam em 0)
        if (agora.getMonth() === 11 && agora.getDate() === 25) {
            mensagem = "Hoje é Natal! Feliz Natal!";
        } else {
            let natal = new Date(agora.getFullYear(), 11, 25);

            // Se o Natal deste ano já passou, conta até o do ano que vem
            if (agora > natal) {
                natal = new Date(agora.getFullYear() + 1, 11, 25);
            }

            const falta = natal - agora; // diferença em milissegundos
            dias = Math.floor(falta / (1000 * 60 * 60 * 24));
            horas = Math.floor(falta / (1000 * 60 * 60)) % 24;
            minutos = Math.floor(falta / (1000 * 60)) % 60;
            segundos = Math.floor(falta / 1000) % 60;
        }

        contagemDias.textContent = dias;
        contagemHoras.textContent = horas;
        contagemMinutos.textContent = minutos;
        contagemSegundos.textContent = segundos;
        mensagemContagem.textContent = mensagem;
    }

    setInterval(atualizarContagem, 1000); // repete a cada 1 segundo
    atualizarContagem();                  // mostra já ao abrir, sem esperar 1 segundo
}


// ========================================
// GALERIA (LIGHTBOX)
// ========================================
// As fotos vêm das imagens dos produtos (array produtos).
// Ao clicar em uma foto, ela abre ampliada em uma janela por cima da página.
const listaGaleria = document.getElementById("lista-galeria");
const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const legendaLightbox = document.getElementById("legenda-lightbox");

// Só roda na página que tem a galeria (galeria.html)
if (listaGaleria && lightbox && imagemAmpliada && legendaLightbox) {

    // Recebe um produto e devolve o HTML da foto dele
    function criarFoto(produto) {
        return `<img class="foto-galeria" src="${produto.imagem}" alt="${produto.nome}" loading="lazy">`;
    }

    listaGaleria.innerHTML = produtos.map(criarFoto).join("");

    // Clique em uma foto: copia a imagem para o lightbox e mostra a janela
    // (delegação de evento: escutamos a área e vemos qual foto foi clicada)
    listaGaleria.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("foto-galeria")) {
            imagemAmpliada.src = evento.target.src;
            imagemAmpliada.alt = evento.target.alt;
            legendaLightbox.textContent = evento.target.alt;
            lightbox.classList.add("aberto");
        }
    });

    // Clique em qualquer lugar do lightbox (inclusive no botão Fechar) esconde a janela
    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("aberto");
    });
}


// ========================================
// VALIDAÇÃO DO FORMULÁRIO
// ========================================
const formulario = document.getElementById("form-contato");

// Só roda na página que tem o formulário (contato.html)
if (formulario) {
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoAssunto = document.getElementById("assunto");
    const campoTexto = document.getElementById("texto-mensagem");
    const mensagemForm = document.getElementById("mensagem-form");

    // Confere os 4 campos. Escreve uma mensagem de erro embaixo de cada campo
    // com problema e devolve true (tudo certo) ou false (tem erro).
    function validarFormulario() {
        const nome = campoNome.value.trim();   // trim() tira espaços do começo e do fim
        const email = campoEmail.value.trim();
        const assunto = campoAssunto.value.trim();
        const texto = campoTexto.value.trim();

        // Expressão que confere o formato nome@exemplo.com
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        let valido = true;

        // Limpa os erros da tentativa anterior
        document.getElementById("erro-nome").textContent = "";
        document.getElementById("erro-email").textContent = "";
        document.getElementById("erro-assunto").textContent = "";
        document.getElementById("erro-mensagem").textContent = "";

        if (nome === "") {
            document.getElementById("erro-nome").textContent = "Por favor, digite seu nome.";
            valido = false;
        }

        if (email === "") {
            document.getElementById("erro-email").textContent = "Por favor, digite seu e-mail.";
            valido = false;
        } else if (!emailValido) {
            document.getElementById("erro-email").textContent = "Digite um e-mail válido, como nome@exemplo.com.";
            valido = false;
        }

        if (assunto === "") {
            document.getElementById("erro-assunto").textContent = "Por favor, digite o assunto.";
            valido = false;
        }

        if (texto === "") {
            document.getElementById("erro-mensagem").textContent = "Por favor, escreva sua mensagem.";
            valido = false;
        }

        return valido;
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // impede a página de recarregar
        mensagemForm.textContent = "";

        if (validarFormulario()) {
            mensagemForm.textContent = `Obrigado, ${campoNome.value.trim()}! Sua mensagem foi enviada.`;
            formulario.reset(); // limpa os campos
        }
    });
}
