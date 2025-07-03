const botaoTema = document.getElementById('botao-tema');
const body = document.body;

// Função para aplicar o tema
function aplicarTema(tema) {
  if (tema === 'dark') {
    body.classList.add('dark');
    botaoTema.textContent = '☀️'; // Ícone para voltar ao claro
  } else {
    body.classList.remove('dark');
    botaoTema.textContent = '🌙'; // Ícone lua para tema escuro
  }
}

// Recupera tema salvo e aplica (default light)
const temaSalvo = localStorage.getItem('tema') || 'light';
aplicarTema(temaSalvo);

// Alternar tema ao clicar no botão e salvar
botaoTema.addEventListener('click', () => {
  const temaAtual = body.classList.contains('dark') ? 'dark' : 'light';
  const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
  aplicarTema(novoTema);
  localStorage.setItem('tema', novoTema);
});

// Scroll suave para links do menu
document.querySelectorAll('nav a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight do menu conforme a seção visível
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a.nav-link');

function ativarLinkMenu() {
  let indexAtivo = sections.length;

  while (--indexAtivo && window.scrollY + 100 < sections[indexAtivo].offsetTop) {}

  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[indexAtivo]) navLinks[indexAtivo].classList.add('active');
}
window.addEventListener('scroll', ativarLinkMenu);
window.addEventListener('load', ativarLinkMenu);

// Animação fade-in para cards de projeto
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('#projetos article').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(20px)';
  observer.observe(card);
});

// --- Botão voltar ao topo ---
// Criar o botão
const botaoTopo = document.createElement('button');
botaoTopo.textContent = '⬆️';
botaoTopo.id = 'botao-voltar-topo';
botaoTopo.title = 'Voltar ao topo';
botaoTopo.style.position = 'fixed';
botaoTopo.style.bottom = '30px';
botaoTopo.style.right = '30px';
botaoTopo.style.padding = '10px 15px';
botaoTopo.style.fontSize = '1.5rem';
botaoTopo.style.border = 'none';
botaoTopo.style.borderRadius = '50%';
botaoTopo.style.backgroundColor = '#004a99';
botaoTopo.style.color = '#fff';
botaoTopo.style.cursor = 'pointer';
botaoTopo.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
botaoTopo.style.display = 'none'; // Esconder inicialmente
botaoTopo.style.zIndex = '1000';

// Adicionar ao body
document.body.appendChild(botaoTopo);

// Mostrar o botão se scroll > 300px
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    botaoTopo.style.display = 'block';
  } else {
    botaoTopo.style.display = 'none';
  }
});

// Ao clicar, voltar ao topo suave
botaoTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
