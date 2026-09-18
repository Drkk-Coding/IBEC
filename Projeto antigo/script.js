// ANIMAÇÃO DE SCROLL
const elements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

elements.forEach(el => observer.observe(el));


// VIDEO MODAL
function openVideo(videoSrc) {

  const modal = document.getElementById('videoModal');
  const video = document.getElementById('mainVideo');

  video.src = videoSrc;

  modal.style.display = 'flex';

  video.play();
}

function closeVideo() {

  const modal = document.getElementById('videoModal');
  const video = document.getElementById('mainVideo');

  modal.style.display = 'none';

  video.pause();
  video.currentTime = 0;
}


// FECHAR AO CLICAR FORA
window.addEventListener('click', function (e) {

  const modal = document.getElementById('videoModal');

  if (e.target === modal) {
    closeVideo();
  }

});

function copiarPix() {

  const chave = "03074173000142";

  navigator.clipboard.writeText(chave);

  alert("Chave PIX copiada com sucesso!");
}