const { remote } = require('webdriverio');
const httpServer = require('http-server');

let exitCode = -1;

const server = httpServer.createServer({});
server.listen(8080);

;(async () => {
    try {
        const browser = await remote({
            capabilities: {
                browserName: 'chrome'
            }
        })

        await browser.url('http://localhost:8080/index.html');
        const text = await browser.$('body').getText();
        await browser.deleteSession();
        if (text === "hello world!") exitCode = 0;
    } catch (e) {
        console.error(e);
    } finally {
        server.close();
        process.exit(exitCode);
    }
})();