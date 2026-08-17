/* ============================================
   MENU MOBILE (HAMBÚRGUER)
============================================ */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        const aberto = menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", aberto);
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", false);
        });
    });
}

/* ============================================
   FUNDO DE PARTÍCULAS
============================================ */
const canvas = document.getElementById("bg-particles");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
    let particles = [];
    const DISTANCIA_MAXIMA_LINHA = 120;
    const QUANTIDADE_BASE = 12000;

    function ajustarTamanhoCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.raio = Math.random() * 1.8 + 1;
        }

        atualizar() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        desenhar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
            ctx.fillStyle = "hsl(0, 100%, 56%)";
            ctx.fill();
        }
    }

    function criarParticulas() {
        const quantidade = Math.floor((canvas.width * canvas.height) / QUANTIDADE_BASE);
        particles = [];

        for (let i = 0; i < quantidade; i++) {
            particles.push(new Particula());
        }
    }

    function desenharConexoes() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < DISTANCIA_MAXIMA_LINHA) {
                    const opacidade = 1 - distancia / DISTANCIA_MAXIMA_LINHA;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 47, 47, ${opacidade * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
            p.atualizar();
            p.desenhar();
        });

        desenharConexoes();
        requestAnimationFrame(animar);
    }

    window.addEventListener("resize", () => {
        ajustarTamanhoCanvas();
        criarParticulas();
    });

    ajustarTamanhoCanvas();
    criarParticulas();
    animar();
}

/* ============================================
   EFEITO DE DIGITAÇÃO
============================================ */
const code = `const fernanda = {
    nome: "Fernanda",
    faculdade: "Engenharia de Software",
    profissao: "Analista e desenvolvedora de banco de dados",
    stack: ["HTML","CSS","JavaScript","Python","SQL","Qlik Sense"],
    hobbies: ["Games","Tecnologia","Aprender"]
}`;

const typing = document.getElementById("typing");

if (typing) {
    let i = 0;

    function escrever() {
        if (i < code.length) {
            typing.textContent += code.charAt(i);
            typing.scrollTop = typing.scrollHeight;
            i++;
            setTimeout(escrever, 40);
        } else {
            setTimeout(() => {
                typing.textContent = "";
                i = 0;
                escrever();
            }, 2500);
        }
    }

    escrever();
}

/* ============================================
   SAUDAÇÃO DINÂMICA
============================================ */
const elementoSaudacao = document.getElementById("saudacao");

if (elementoSaudacao) {
    const hora = new Date().getHours();
    let saudacao;

    if (hora < 12) {
        saudacao = "☀️ Bom dia Dev!";
    } else if (hora < 18) {
        saudacao = "🌤️ Boa tarde Dev!";
    } else {
        saudacao = "🌙 Boa noite Dev!";
    }

    elementoSaudacao.textContent = saudacao;
}