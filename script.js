/* ==========================================================================
   1. MENU HAMBÚRGUER (MOBILE)
   ========================================================================== */
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navList.classList.toggle("active");
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navList.classList.remove("active");
        });
    });
}

/* ==========================================================================
   2. MENSAGENS SUSTENTÁVEIS
   ========================================================================== */
const acoes = [
    "🌱 Preserve o solo e garanta alimentos para o futuro.",
    "💧 Economize água e preserve a vida.",
    "♻️ Pequenas atitudes sustentáveis geram grandes mudanças.",
    "🌍 O futuro do planeta depende das escolhas de hoje.",
    "🚜 Agricultura sustentável protege o meio ambiente."
];

const btnAcao = document.getElementById("btn-acao");
const acaoDinamica = document.getElementById("acao-dinamica");

if (btnAcao && acaoDinamica) {
    btnAcao.addEventListener("click", () => {
        const indice = Math.floor(Math.random() * acoes.length);
        acaoDinamica.innerText = acoes[indice];
    });
}

/* ==========================================================================
   3. QUIZ INTERATIVO PREMIUM 
   ========================================================================== */
const quizPerguntas = [
    {
        pergunta: "Qual prática ajuda na conservação do solo?",
        opcoes: ["Rotação de culturas", "Queimadas", "Desmatamento"],
        correta: 0
    },
    {
        pergunta: "Qual atitude economiza água?",
        opcoes: ["Banhos demorados", "Fechar a torneira", "Desperdício"],
        correta: 1
    },
    {
        pergunta: "Qual é a principal vantagem do Plantio Direto?",
        opcoes: [
            "Deixar a terra totalmente exposta ao sol",
            "Proteger o solo contra erosão usando a palhada antiga",
            "Aumentar o uso de tratores para revirar a terra"
        ],
        correta: 1
    },
    {
        pergunta: "O que é a tecnologia de Irrigação por Gotejamento?",
        opcoes: [
            "Um sistema que joga água direto na raiz da planta em gotas, evitando desperdício",
            "Uma forma de inundar a plantação inteira de uma vez só",
            "Deixar as plantas esperando apenas pela água da chuva"
        ],
        correta: 0
    },
    {
        pergunta: "O que significa o termo ILPF na agricultura sustentável?",
        opcoes: [
            "Indústria de Lavoura, Produtos e Ferramentas",
            "Integração Lavoura-Pecuária-Floresta (misturar culturas, gado e árvores na mesma área)",
            "Irrigação de Lavouras Próximas a Fontes"
        ],
        correta: 1
    }
];

let pontuacao = 0;
let perguntaAtual = 0;

const pergunta = document.getElementById("pergunta");
const opcoesDiv = document.getElementById("opcoes");
const btnQuiz = document.getElementById("btn-quiz");

function mostrarPergunta() {
    btnQuiz.style.display = "none"; 
    const q = quizPerguntas[perguntaAtual];
    pergunta.innerText = q.pergunta;
    opcoesDiv.innerHTML = "";

    q.opcoes.forEach((opcao, i) => {
        const btn = document.createElement("button");
        btn.classList.add("opcao-btn");
        btn.innerText = opcao;
        // Passamos o próprio botão clicado como argumento (e.target)
        btn.addEventListener("click", (e) => verificarResposta(i, e.target));
        opcoesDiv.appendChild(btn);
    });
}

function verificarResposta(indiceSelecionado, botaoClicado) {
    const q = quizPerguntas[perguntaAtual];
    
    // Bloqueia todos os botões para o utilizador não clicar em vários ao mesmo tempo
    const botoes = opcoesDiv.querySelectorAll(".opcao-btn");
    botoes.forEach(b => b.setAttribute("disabled", "true"));

    // Aplica o feedback visual de cores
    if (indiceSelecionado === q.correta) {
        pontuacao++;
        botaoClicado.classList.add("correta"); // Fica verde
    } else {
        botaoClicado.classList.add("errada");  // Fica vermelho
        botoes[q.correta].classList.add("correta"); // Mostra o correto em verde
    }

    perguntaAtual++;

    // Espera 1.2 segundos para o utilizador ver a resposta antes de avançar
    setTimeout(() => {
        if (perguntaAtual < quizPerguntas.length) {
            mostrarPergunta();
        } else {
            pergunta.innerText = `Fim do Quiz! 🎉 Pontuação final: ${pontuacao}/${quizPerguntas.length}`;
            opcoesDiv.innerHTML = "";
            btnQuiz.innerText = "Reiniciar Quiz";
            btnQuiz.style.display = "inline-block";
            pontuacao = 0;
            perguntaAtual = 0;
        }
    }, 1200);
}

if (btnQuiz) {
    btnQuiz.addEventListener("click", mostrarPergunta);
}

/* ==========================================================================
   4. CONTROLE DOS MODAIS
   ========================================================================== */
function configurarModal(modalId, abrirId, fecharClasse){
    const modal = document.getElementById(modalId);
    const abrir = document.getElementById(abrirId);
    const fechar = document.querySelector(fecharClasse);

    if (modal && abrir && fechar) {
        abrir.addEventListener("click", () => {
            modal.style.display = "block";
        });

        fechar.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if(event.target == modal){
                modal.style.display = "none";
            }
        });
    }
}

configurarModal("modalSolo", "abrirSolo", ".fechar");
configurarModal("modalAgua", "abrirAgua", ".fecharAgua");
configurarModal("modalAgricultura", "abrirAgriculture", ".fecharAgricultura");
configurarModal("modalEventos", "abrirEventos", ".fecharEventos");

/* ==========================================================================
   5. CONTADOR ANIMADO DISPARADO POR SCROLL
   ========================================================================== */
function animarContador(id, valorFinal, duracao) {
    const elemento = document.getElementById(id);
    if (!elemento) return;

    let valorInicial = 0;
    const passo = Math.ceil(valorFinal / (duracao / 16));

    const timer = setInterval(() => {
        valorInicial += passo;
        if (valorInicial >= valorFinal) {
            elemento.innerText = valorFinal;
            clearInterval(timer);
        } else {
            elemento.innerText = valorInicial;
        }
    }, 16);
}

// Ativação inteligente: só roda quando a secção de estatísticas aparece no ecrã
const seccaoEstatisticas = document.getElementById("estatisticas");
if (seccaoEstatisticas) {
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador("numero1", 95, 1500);
                animarContador("numero2", 500, 1500);
                animarContador("numero3", 6, 1500);
                observador.unobserve(entry.target); // Desativa para não repetir
            }
        });
    }, { threshold: 0.3 });

    observador.observe(seccaoEstatisticas);
}