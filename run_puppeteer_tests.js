const glob = require('glob').sync;
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

async function runPuppeteerTests() {
    try {
        // Знаходимо всі файли тестів у директорії "src/lab8/Puppeteer"
        const files = glob("src/lab8/Puppeteer/*.js");
        for (const file of files) {
            console.log(`Запуск тесту: ${file}`);
            const { stdout, stderr } = await execPromise(`node ${file}`);
            console.log(`Вивід тесту ${file}:\n${stdout}`);
            if (stderr) {
                console.error(`Помилки тесту ${file}:\n${stderr}`);
            }
        }
        console.log("Всі Puppeteer тести виконано успішно.");
    } catch (error) {
        console.error("Помилка під час виконання тестів:", error);
        process.exit(1);
    }
}

runPuppeteerTests();
