<?php snippet('header_about') ?>
<section class="about">
  <div class="ab-left">
    <div class="ab-title">
      <div class="title-big">Giacun Caduff</div>
      <div class="title-small">Director, Creative Producer</div>
    </div>
    <div class="ab-bio">
      <div>
        <span class="lang_btn" id="de_btn">DE</span> / <span class="lang_btn" id="en_btn">EN</span>
      </div>
      <div class="ab_txt" id="en">
        <?= $page->texten()->kt() ?>
      </div>
      <div class="ab_txt" id="de">
        <?= $page->textde()->kt() ?>
      </div>
    </div>
  </div>
  <div class="ab-right">
    <div class="ab-contact">
      <div class="title-small">
        Contact
      </div>
      <div class="ab-email">
        <div class="ab_txt">
          <?= Html::email($page->email()) ?>
        </div>
      </div>
      <!-- <div class="title-small">
        Social Handles
      </div> -->
      <div class="social">
          <a class="video-center" href="<?= $page->ig() ?>" target="_blank" rel="noopener noreferrer">
            <img class="ab-logo video-center" src="assets/icons/ig/IG-white.png" alt="Instagram" srcset=""
            >
          </a>
          <a class="video-center" href="<?= $page->fb() ?>" target="_blank" rel="noopener noreferrer">
            <img class="ab-logo video-center" src="assets/icons/facebook/Facebook_Logo_Secondary.png" alt="Facebook" srcset=""
            >
          </a>
          <a class="video-center" href="<?= $page->vi() ?>" target="_blank" rel="noopener noreferrer">
            <img class="ab-logo video-center" src="assets/icons/vimeo_icons-3/vimeo_icon_white.png" alt="Vimeo"
            >
          </a>
          <a class="video-center" href="<?= $page->yt() ?>" target="_blank" rel="noopener noreferrer">
            <img class="ab-logo video-center"
              src="assets/icons/youtube_monochrome_light_icon/youtube.png"
              alt="Youtube">
          </a>
      </div>
    </div>
    <div class="ab-partners">
      <div class="title-small">
        Partners
        <div class="ab_img">
          <?php
          $items = $page->partners()->toStructure();
          foreach ($items as $item): ?>
            <a href="<?= $item->link()->url() ?>" target="_blank" rel="noopener noreferrer">
              <img src="<?= $item->logo()->toFile()->url() ?>">
            </a>
          <?php endforeach ?>
        </div>
      </div>
    </div>
</section>

<script>
  const get_browser_lang = () => {
    return navigator.language || navigator.userLanguage;
  }
  const summary_de = document.querySelector('#de')
  const summary_en = document.querySelector('#en')
  const de_btn = document.querySelector('#de_btn')
  de_btn.addEventListener('click', switch_to_de)
  const en_btn = document.querySelector('#en_btn')
  en_btn.addEventListener('click', switch_to_en)


  if (get_browser_lang().includes('en')) {
    switch_to_en();
  } else {
    switch_to_de();
  }

  function switch_to_de() {
    summary_de.style.display = 'block';
    summary_en.style.display = 'none';
  }

  function switch_to_en() {
    summary_de.style.display = 'none';
    summary_en.style.display = 'block';
  }
</script>

<?php snippet('footer') ?>