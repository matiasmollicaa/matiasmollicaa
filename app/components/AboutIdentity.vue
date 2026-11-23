<template>
  <div
    class="aboutIdentity"
    role="img"
    :aria-label="t('Identidad de Matías Mollica: comunicación visual y desarrollo frontend. Montevideo, Uruguay.', 'Matías Mollica’s identity: visual communication and frontend development. Montevideo, Uruguay.')"
  >
    <div class="identityBacking" aria-hidden="true"></div>
    <div class="identitySheet" aria-hidden="true">
      <div class="identityHeading">
        <span>MONTEVIDEO / UY</span>
        <img :src="sitePath('/images/monograma-b.png')" width="42" height="32" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="identityName"><span>Matías</span><span>Mollica.</span></div>
      <div class="identityStudy">
        <div class="identityGrid"></div>
        <div class="identityPlane"></div>
        <div class="identitySymbol"></div>
        <span class="identityPoint"></span>
      </div>
      <div class="identityDisciplines">
        <span>{{ t('Comunicación visual', 'Visual communication') }} <SiteIcon name="diagonal" /></span>
        <span>{{ t('Desarrollo frontend', 'Frontend development') }} <SiteIcon name="diagonal" /></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = usePortfolioLocale()
const sitePath = useSitePath()
</script>

<style scoped>
.aboutIdentity {
  position: relative;
  isolation: isolate;
  container-type: inline-size;
  width: min(100%, 460px);
  aspect-ratio: 4 / 5;
  margin: 12px 10px 12px 0;
}
.identityBacking {
  position: absolute;
  z-index: -1;
  inset: 3% -2% -1% 5%;
  border: 1px solid #897aef70;
  background: #6b5ce72b;
  transform: rotate(4deg);
}
.identitySheet {
  position: relative;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: clamp(12px, 3.8cqw, 19px);
  width: 100%;
  height: 100%;
  padding: clamp(18px, 7cqw, 32px);
  box-sizing: border-box;
  color: #251d1b;
  border: 1px solid #251d1b24;
  background: #faf9f6;
  box-shadow: 0 24px 65px #100b1429;
  transform: rotate(-2deg);
}
.identityHeading { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 28px; }
.identityHeading > span { font-size: clamp(8px, 2.3cqw, 11px); letter-spacing: .16em; font-weight: 600; }
.identityHeading img { width: clamp(29px, 9cqw, 42px); height: auto; filter: brightness(0); }
.identityName { font-family: Basteleur, Georgia, serif; font-weight: 700; font-size: clamp(42px, 17cqw, 82px); line-height: 1.02; letter-spacing: -.065em; }
.identityName span { display: block; }
.identityName span:last-child { color: #6b5ce7; }
.identityStudy { position: relative; min-height: 0; }
.identityGrid {
  position: absolute;
  inset: 9% 0 9% 17%;
  background-image: linear-gradient(#251d1b14 1px, transparent 1px), linear-gradient(90deg, #251d1b14 1px, transparent 1px);
  background-size: clamp(14px, 4cqw, 20px) clamp(14px, 4cqw, 20px);
  border: 1px solid #251d1b14;
}
.identityPlane { position: absolute; top: 12%; right: 8%; width: 31%; height: 70%; background: #d9744e; transform: rotate(15deg); }
.identitySymbol {
  position: absolute;
  inset: 4% 18% 0 0;
  background: #6b5ce7;
  mask: var(--monogram-mask) center / contain no-repeat;
  -webkit-mask: var(--monogram-mask) center / contain no-repeat;
  transform: rotate(-7deg);
}
.identityPoint { position: absolute; right: 1%; bottom: 2%; width: clamp(8px, 2.6cqw, 12px); aspect-ratio: 1; border-radius: 50%; background: #c8e65b; border: 1px solid #251d1b38; }
.identityDisciplines { display: grid; gap: 8px; border-top: 1px solid #251d1b38; padding-top: clamp(12px, 3.8cqw, 18px); }
.identityDisciplines > span { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: clamp(10px, 2.8cqw, 13px); line-height: 1.3; }
.identityDisciplines .siteIcon { --icon-size: 14px; color: #6b5ce7; flex-shrink: 0; }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .identitySheet, .identityBacking, .identityPlane { transition: transform .55s cubic-bezier(.22, 1, .36, 1); }
  .aboutIdentity:hover .identitySheet { transform: rotate(0deg) translateY(-3px); }
  .aboutIdentity:hover .identityBacking { transform: rotate(6deg); }
  .aboutIdentity:hover .identityPlane { transform: rotate(21deg) translateX(3px); }
}
@media (max-width: 700px) {
  .aboutIdentity { width: min(94%, 370px); margin: 8px auto 24px; }
}
</style>
