const path = require('path');
const fs = require('fs/promises');

describe('basics/CounterButtonApp', () => {
  it('Задача добавлена, но требует ручной проверки', () => {});

  it('Исходный код script.ts должен включать создание приложения через "createApp("', async () => {
    const solutionText = await fs.readFile(path.join(__dirname, global.getSolutionPath('script.ts')), 'utf8');
    expect(solutionText).toMatch(/createApp\s*\(/);
  });
});
