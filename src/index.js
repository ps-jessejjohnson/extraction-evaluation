const target = process.env.target;
if (!target) {
    console.error("Not target specified");
    process.exit(1);
}
if(target !== "syphonx" && target !== "native") {
    console.error("Invalid target specified. Must be syphonx or native.");
    process.exit(1);
}

const host = process.env.host;
if (!host) {
    console.error("Not host specified");
    process.exit(1);
}

const iterations = process.env.iterations || 1000;

const { scrape } = await import(`./${target}/index.js`);

function print(total, durations) {
    console.log(`host ${host}`);
    console.log(`target ${target}`);
    console.log(`iterations:`);
    console.log(`- count ${iterations}`);
    console.log(`- time ${total / 1000}s`);
    console.log(`  - max ${Math.max(...durations)}ms`);
    console.log(`  - min ${Math.min(...durations)}ms`);
    console.log(`  - avg ${durations.reduce((a, c) => a + c, 0) / durations.length}ms`);
}

(async () => {
    const durations = [];
    const begin = Date.now();
    for (let i = 0; i < iterations; i++) {
        const start = Date.now();
        const result = await scrape(host);
        const duration = Date.now() - start;
        durations.push(duration);
        console.log(`${i + 1} ${duration}ms: ${result}`);
    }
    const total = Date.now() - begin;
    print(total, durations);
})();