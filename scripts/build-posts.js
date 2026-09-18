import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(ROOT, "posts");
const OUTPUT_FILE = path.join(ROOT, "posts.json");
const POST_FILE = "text.md";
const EXCERPT_LENGTH = 200;

function parseFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: text };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    meta[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  return { meta, body: text.slice(match[0].length) };
}

function parseDate(value) {
  const match = value?.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  return match ? Date.UTC(match[3], match[2] - 1, match[1]) : null;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isRelative(url) {
  return !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(url);
}

function plainText(tokens) {
  return tokens
    .map((token) => (token.tokens ? plainText(token.tokens) : token.text ?? ""))
    .join("");
}

function createExcerpt(tokens) {
  const paragraph = tokens.find((token) => token.type === "paragraph");
  if (!paragraph) return "";

  const text = plainText(paragraph.tokens).replace(/\s+/g, " ").trim();
  if (text.length <= EXCERPT_LENGTH) return text;

  const cut = text.slice(0, EXCERPT_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")) || cut}…`;
}

function renderPost(body, mediaUrl) {
  const marked = new Marked({
    walkTokens(token) {
      if ((token.type === "image" || token.type === "link") && isRelative(token.href)) {
        token.href = `${mediaUrl}/${token.href}`;
      }
    },
  });

  return {
    html: marked.parse(body),
    excerpt: createExcerpt(marked.lexer(body)),
  };
}

function readPost(postsDir, entry) {
  const isDirectory = entry.isDirectory();
  const file = isDirectory ? path.join(postsDir, entry.name, POST_FILE) : path.join(postsDir, entry.name);
  if (isDirectory ? !fs.existsSync(file) : path.extname(entry.name) !== ".md") return null;

  const name = isDirectory ? entry.name : path.basename(entry.name, ".md");
  const mediaUrl = encodeURI(isDirectory ? `posts/${entry.name}` : "posts");
  const { meta, body } = parseFrontMatter(fs.readFileSync(file, "utf8"));
  const { title, ...rest } = meta;

  return {
    slug: slugify(name),
    title: title || name,
    meta: rest,
    ...renderPost(body, mediaUrl),
  };
}

function buildPosts() {
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .map((entry) => readPost(POSTS_DIR, entry))
    .filter(Boolean)
    .sort((a, b) => (parseDate(b.meta.started) ?? -Infinity) - (parseDate(a.meta.started) ?? -Infinity));
}

const posts = buildPosts();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + "\n");
console.log(`Wrote ${posts.length} posts to ${OUTPUT_FILE}`);
