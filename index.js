const SITE_TITLE = "Andi Angel's Blog";

function cloneTemplate(id) {
  return document.getElementById(id).content.cloneNode(true);
}

function postUrl(post) {
  return `?post=${encodeURIComponent(post.slug)}`;
}

function tagUrl(tag) {
  return `?tag=${encodeURIComponent(tag)}`;
}

function sameTag(a, b) {
  return a?.toLowerCase() === b?.toLowerCase();
}

function postTags(post) {
  return Array.isArray(post.meta.tags) ? post.meta.tags : [];
}

function renderTags(post, activeTag) {
  const list = document.createDocumentFragment();

  postTags(post).forEach((tag) => {
    const item = cloneTemplate("tag");
    const link = item.querySelector("a");
    const isActive = sameTag(tag, activeTag);
    link.href = isActive ? "./" : tagUrl(tag);
    link.textContent = tag;
    link.classList.toggle("active", isActive);
    list.appendChild(item);
  });

  return list;
}

function renderList(posts, activeTag) {
  const view = cloneTemplate("post-list");
  const list = view.querySelector("ol");

  posts.forEach((post) => {
    const item = cloneTemplate("post-list-item");
    item.querySelector("time").textContent = post.meta.started || "";
    const link = item.querySelector("a");
    link.href = postUrl(post);
    link.textContent = post.title;
    item.querySelector(".excerpt").textContent = post.excerpt;
    item.querySelector(".tags").append(renderTags(post, activeTag));
    list.appendChild(item);
  });

  document.title = SITE_TITLE;
  return view;
}

function renderPost(post) {
  if (!post) {
    document.title = `Not found – ${SITE_TITLE}`;
    return cloneTemplate("not-found");
  }

  const view = cloneTemplate("post");
  view.querySelector("h1").textContent = post.title;

  const meta = view.querySelector(".meta");
  Object.entries(post.meta).forEach(([key, value]) => {
    const term = document.createElement("dt");
    term.textContent = key;
    const detail = document.createElement("dd");
    detail.textContent = Array.isArray(value) ? value.join(", ") : value;
    meta.append(term, detail);
  });

  view.querySelector(".content").innerHTML = post.html;

  document.title = `${post.title} – ${SITE_TITLE}`;
  return view;
}

function render(posts) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("post");
  const tag = params.get("tag");
  const view = slug
    ? renderPost(posts.find((post) => post.slug === slug))
    : renderList(
        tag ? posts.filter((post) => postTags(post).some((each) => sameTag(each, tag))) : posts,
        tag,
      );

  document.querySelector("main").replaceChildren(view);
}

async function loadBlog() {
  const response = await fetch("./posts.json");
  const posts = await response.json();

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    history.pushState(null, "", link.href);
    render(posts);
    window.scrollTo(0, 0);
  });

  window.addEventListener("popstate", () => render(posts));

  render(posts);
}

loadBlog().catch((error) => {
  const main = document.querySelector("main");
  main.classList.add("error");
  main.textContent = error.message;
});
