const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 900 } }
  },
  scene: { preload, create, update }
};

let player, coins, score = 0, scoreText;
new Phaser.Game(config);

function preload() {
  this.load.image('player', 'https://i.imgur.com/6qKcKqT.png');
  this.load.image('coin', 'https://i.imgur.com/2rmU6Yp.png');
}

function create() {
  player = this.physics.add.sprite(100, 300, 'player').setScale(0.4);
  player.setCollideWorldBounds(true);

  coins = this.physics.add.group({
    key: 'coin',
    repeat: 15,
    setXY: { x: 300, y: 0, stepX: 150 }
  });

  scoreText = this.add.text(16, 16, 'BILL: 0', {
    fontSize: '20px',
    fill: '#00ffcc'
  });

  this.physics.add.overlap(player, coins, collectCoin, null, this);

  this.input.keyboard.on('keydown-SPACE', () => {
    if (player.body.touching.down) {
      player.setVelocityY(-450);
    }
  });
}

function update() {}

function collectCoin(player, coin) {
  coin.disableBody(true, true);
  score++;
  scoreText.setText('BILL: ' + score);
}
