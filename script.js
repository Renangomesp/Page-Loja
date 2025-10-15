/* ========== CONFIG ========== */
/* Número de exemplo (troque pelo seu número no formato internacional, ex: 5511998765432) */
const WA_NUMBER = '5511999999999'; // <<< substituir pelo número real

/* Mensagem padrão que abre no WhatsApp caso o usuário não digite nada extra */
const WA_DEFAULT_PREFIX = 'Olá, gostaria de um orçamento.';

/* ========== UTILIDADES ========== */
function showToast(text, ms = 2600){
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.style.display = 'block';
  setTimeout(()=> toast.style.display = 'none', ms);
}

function encodeMessage(text){
  return encodeURIComponent(text);
}

/* ========== RODAPÉ - ANO ========= */
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

/* ========== LIGHTBOX GALERIA ========= */
const galleryImgs = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

galleryImgs.forEach(img=>{
  img.addEventListener('click', ()=>{
    const src = img.dataset.full || img.src;
    lbImg.src = src;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
if (lightbox) lightbox.addEventListener('click', ()=>{ lightbox.style.display = 'none'; lightbox.setAttribute('aria-hidden','true'); });

/* ========== WHATSAPP - FORMULÁRIO ========= */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const formData = new FormData(form);
    const nome = (formData.get('nome') || '').toString().trim();
    const telefone = (formData.get('telefone') || '').toString().trim();
    const servico = (formData.get('servico') || 'Orçamento').toString().trim();
    const mensagemUser = (formData.get('mensagem') || '').toString().trim();

    // Validação simples
    if (!nome  || !mensagemUser){
      showToast('Preencha nome, telefone e mensagem antes de enviar.');
      return;
    }

    // Monta a mensagem que será enviada via wa.me
    let message = `${WA_DEFAULT_PREFIX}\n\n*Nome:* ${nome} ${telefone}\n*Serviço:* ${servico}\n*Mensagem:* ${mensagemUser}`;

    const url = `https://wa.me/${5571984029542}?text=${encodeMessage(message)}`;

    // Abre em nova aba (ou app no celular)
    window.open(url, '_blank');
  });
}

/* Botão limpar */
const clearBtn = document.getElementById('clearBtn');
if (clearBtn){
  clearBtn.addEventListener('click', ()=>{
    if (form) form.reset();
    showToast('Formulário limpo.');
  });
}

/* ========== BOTÃO FLUTUANTE WHATSAPP (rápido) ========= */
const waFloat = document.getElementById('waFloat');
const waQuick = document.getElementById('waQuick');
const quickMessage = encodeMessage('Olá! Gostaria de mais informações sobre cortinas e instalação.');

if (waFloat){
  waFloat.href = `https://wa.me/${5571984029542}?text=${quickMessage}`;
  waFloat.target = '_blank';
}
if (waQuick){
  waQuick.href = `https://wa.me/${5571984029542}?text=${quickMessage}`;
  waQuick.target = '_blank';
}
 