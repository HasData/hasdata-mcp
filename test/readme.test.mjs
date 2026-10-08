// The README is the catalogue. It lists every tool, every prompt and every group of
// parameter-value resources the hosted server exposes, and none of that lives in this
// repository: the server is remote and its tool list changes without a commit here.
//
// On 2026-10-07 the README had drifted five tools behind and still advertised a count of 63
// against a live 68, which is exactly the failure these checks exist to catch.
//
// initialize, tools/list, prompts/list and resources/list are all served without an API key,
// so this suite needs no secret and runs the same on a fork.
//
// Run: npm test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ENDPOINT = 'https://mcp.hasdata.com/mcp';
const TIMEOUT_MS = 30_000;
const README = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');

// A streamable HTTP body arrives either as plain JSON or as server-sent events, and a server
// may send progress notifications before the answer, so collect every event and pick the one
// carrying our id rather than trusting the first data: line.
function parseRpc(raw, id) {
    const trimmed = raw.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) return JSON.parse(trimmed);
    const messages = [];
    for (const event of trimmed.split(/\r?\n\r?\n+/)) {
        const data = event.split(/\r?\n/).filter((l) => l.startsWith('data:')).map((l) => l.slice(5).replace(/^ /, '')).join('\n');
        if (!data || data === '[DONE]') continue;
        try { messages.push(JSON.parse(data)); } catch { /* keep-alive or partial event */ }
    }
    assert.ok(messages.length, `no JSON-RPC message in the response: ${raw.slice(0, 300)}`);
    const match = messages.find((m) => m.id === id);
    assert.ok(match, `no message with id ${id} in the response: ${raw.slice(0, 300)}`);
    return match;
}

let nextId = 1;
async function rpc(method) {
    const id = nextId++;
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
        body: JSON.stringify({ jsonrpc: '2.0', id, method, params: {} }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    assert.equal(res.status, 200, `${method} returned ${res.status}`);
    return parseRpc(await res.text(), id).result;
}

// The README writes tools in short form: hasdata_google_serp_serp_getSearchResults is listed
// as google_serp_serp. Strip the prefix and the verb suffix to compare like with like.
const shortName = (n) => n.replace(/^hasdata_/, '').replace(/_(get|perform|scrape)[A-Z].*$/, '');

// Only the Tools section. The prompts table and the resources summary further down use the
// same row shape, and counting those as tools is how a first attempt at this test went wrong.
const toolsSection = () => {
    const start = README.indexOf('\n## Tools');
    assert.ok(start >= 0, 'the README has no Tools section');
    const after = README.indexOf('\n## ', start + 1);
    return README.slice(start, after < 0 ? README.length : after);
};
const readmeTools = () => [...toolsSection().matchAll(/^\| `([a-z0-9_]+)`/gm)].map((m) => m[1]);

let cached;
const live = () => (cached ??= Promise.all([rpc('tools/list'), rpc('prompts/list'), rpc('resources/list')]));

test('every tool the server exposes is in the README table', async () => {
    const [tools] = await live();
    const names = tools.tools.map((t) => shortName(t.name));
    const listed = readmeTools();
    const missing = names.filter((n) => !listed.includes(n));
    assert.deepEqual(missing, [], `the server has tools the README does not list: ${missing.join(', ')}`);
});

test('the README lists no tool the server does not have', async () => {
    const [tools] = await live();
    const names = tools.tools.map((t) => shortName(t.name));
    const listed = readmeTools();
    const stale = listed.filter((n) => !names.includes(n));
    assert.deepEqual(stale, [], `the README lists tools the server no longer has: ${stale.join(', ')}`);
});

test('the tools badge carries the live count', async () => {
    const [tools] = await live();
    const badge = README.match(/img\.shields\.io\/badge\/Tools-(\d+)-/);
    assert.ok(badge, 'the README has no tools badge to check');
    assert.equal(
        Number(badge[1]),
        tools.tools.length,
        `the badge says ${badge[1]} tools and the server answers ${tools.tools.length}`
    );
});

test('the prompts and resources section matches what the server serves', async () => {
    const [, prompts, resources] = await live();
    assert.ok(README.includes('## Prompts and resources'), 'the README has no prompts and resources section');

    const nPrompts = (README.match(/ships (\d+) prompts/) || [])[1];
    assert.ok(nPrompts, 'the section does not state how many prompts there are');
    assert.equal(Number(nPrompts), prompts.prompts.length, `the README says ${nPrompts} prompts, the server serves ${prompts.prompts.length}`);

    const nRes = (README.match(/exposes (\d+) resources/) || [])[1];
    assert.ok(nRes, 'the section does not state how many resources there are');
    assert.equal(Number(nRes), resources.resources.length, `the README says ${nRes} resources, the server serves ${resources.resources.length}`);
});

test('every prompt the server serves is named in the README', async () => {
    const [, prompts] = await live();
    const missing = prompts.prompts.map((p) => p.name).filter((n) => !README.includes(`\`${n}\``));
    assert.deepEqual(missing, [], `prompts the README does not name: ${missing.join(', ')}`);
});
