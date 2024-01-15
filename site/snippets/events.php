<?php
$events = $pages->template('events')->children()->published();
?>

<?php foreach ($events as $event): ?>
  <div class="event" id="<?= $event->eventdate()->toDate() ?>">
    <?php if ($event->eventdate()->isNotEmpty()): ?>
      <h1 class="evdate">
        <?= $event->eventdate()->toDate('d-m-Y') ?>
      </h1>
    <?php endif ?>

    <div class="evheader">
      <?php if ($event->eventtitle()->isNotEmpty()): ?>
        <div class="evtitle">
          <?= $event->eventtitle() ?>
        </div>
      <?php endif ?>

      <?php if ($event->serie()->isNotEmpty()): ?>
        <div class="evserie">
          <?= $event->serie() ?>
        </div>
      <?php endif ?>
    </div>

    <div class="hidden" data-hidden="true">
      <?php if ($event->artists()->isNotEmpty()): ?>
        <?php
        $items = $event->artists()->toStructure();
        foreach ($items as $item): ?>
          <div class="evmulti">

            <?php if ($item->name()->isNotEmpty()): ?>
              <div class="evartistdetails">
                <div class="artist">
                  <?= $item->name() ?>
                </div>
              <?php endif ?>

              <?php if ($item->show()->isNotEmpty()): ?>
                <div class="show">
                  <?= $item->show() ?>
                </div>
              <?php endif ?>

              <?php if ($item->genre()->isNotEmpty()): ?>
                <div class="genre">
                  <?= $item->genre() ?>
                </div>
              <?php endif ?>
            </div>

            <?php if ($item->link()->isNotEmpty()): ?>
              <a href="<?= $item->link() ?>" target="_blank" rel="noopener noreferrer">🔗🔗🔗</a>
            <?php endif ?>

          </div>
          <?php if ($item->bio()->isNotEmpty()): ?>
            <div class="evbio">
              <?= $item->bio()->kt() ?>
            </div>
          <?php endif ?>
          <div>~~~~</div>
        <?php endforeach ?>
      <?php endif ?>
      <div class="evmulti midsize">
        <?php if ($event->start()->isNotEmpty()): ?>
          <div class="evstart">
            <?= $event->start() ?> <br>
          </div>
        <?php endif ?>

        <?php if ($event->end()->isNotEmpty()): ?>
          <div>
            ==>
          </div>
          <div class="evend">
            <?= $event->end() ?> <br>
          </div>
        <?php endif ?>
      </div>
    </div>

  </div>
<?php endforeach ?>