// Jei lankytojas išjungęs judesį, video sustabdomas ir rodomas pirmas kadras.
const video = document.querySelector('.herojus-video video');
const maziauJudesio = window.matchMedia('(prefers-reduced-motion: reduce)');

function pritaikytiJudesi() {
  if (!video) return;
  if (maziauJudesio.matches) {
    video.pause();
    video.removeAttribute('autoplay');
  } else {
    video.play().catch(() => {});
  }
}
pritaikytiJudesi();
maziauJudesio.addEventListener('change', pritaikytiJudesi);

// 3D emblema piešiama tik tada, kai jos langas matomas ekrane: taip telefonas nekaista be reikalo.
const emblema = document.querySelector('.emblema iframe');
if (emblema && 'IntersectionObserver' in window) {
  const saltinis = emblema.getAttribute('src');
  const tuscia = 'about:blank';
  emblema.setAttribute('src', tuscia);
  new IntersectionObserver((irasai) => {
    irasai.forEach((irasas) => {
      const reikia = irasas.isIntersecting ? saltinis : tuscia;
      if (emblema.getAttribute('src') !== reikia) emblema.setAttribute('src', reikia);
    });
  }, { rootMargin: '200px' }).observe(emblema);
}
