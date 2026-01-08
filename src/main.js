import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#1d1f2a',
  scene: {
    preload,
    create,
    update
  }
};

let money = 0;
let incomePerSec = 0;
let lastTick = 0;
let moneyText, incomeText, buyBtn;

function preload() {
  // no assets required for this prototype
}

function create() {
  const scene = this;

  // Display: simple graphics as placeholder
  scene.add.text(20, 20, 'Tycoon Simulator (Prototype)', { fontSize: '22px', color: '#ffffff' });

  // A simple "factory" sprite using graphics
  const g = scene.add.graphics();
  g.fillStyle(0x4caf50, 1);
  g.fillRect(300, 200, 200, 120);
  scene.add.text(330, 240, 'Factory', { fontSize: '20px', color: '#fff' });

  // Hook UI DOM elements
  moneyText = document.getElementById('money');
  incomeText = document.getElementById('income');
  buyBtn = document.getElementById('buyBtn');

  buyBtn.addEventListener('click', () => {
    const cost = 10;
    if (money >= cost) {
      money -= cost;
      incomePerSec += 1; // each upgrade gives +1 income/sec
      updateUI();
    } else {
      // simple feedback
      buyBtn.innerText = 'Not enough money';
      setTimeout(() => buyBtn.innerText = 'Buy Upgrade (cost: 10)', 800);
    }
  });

  lastTick = scene.time.now;
  updateUI();
}

function update(time, delta) {
  // passive income tick using time
  if (time - lastTick >= 1000) {
    const seconds = Math.floor((time - lastTick) / 1000);
    money += incomePerSec * seconds;
    lastTick += 1000 * seconds;
    updateUI();
  }
}

function updateUI() {
  moneyText.innerText = `Money: ${Math.floor(money)}`;
  incomeText.innerText = `Income/sec: ${incomePerSec}`;
}

new Phaser.Game(config);

// Optional: expose some state for debugging in console
window.tycoon = {
  getState: () => ({ money, incomePerSec }),
  addMoney: (amt) => { money += amt; updateUI(); }
};
