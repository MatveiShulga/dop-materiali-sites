(function () {
  const DATA = window.SITE_DATA;
  const ORDER = window.SITE_ORDER;
  const root = document.getElementById("case-root");
  const tabsWrap = document.getElementById("tabs");

  const I = {
    dl:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
    ok:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 6"/></svg>',
    img:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4 4 3-3 4 4"/></svg>',
    vid:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z"/></svg>',
    doc:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M6 3h8l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M9 13h6M9 17h6"/></svg>',
  };

  const esc = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  };

  function icFor(kind) {
    if (kind === "video") return I.vid;
    if (kind === "doc") return I.doc;
    return I.img;
  }

  function fileRow(a) {
    return `<a class="file file--${a.kind}" href="${a.href}" download>
        <span class="file-ic">${icFor(a.kind)}</span>
        <span class="file-label">${esc(a.label)}</span>
        <span class="file-size">${esc(a.size || "")}</span>
        <span class="file-dl">${I.dl}</span>
      </a>`;
  }

  function fileList(assets, head) {
    if (!assets || !assets.length) return "";
    const h = head ? `<p class="mini-label">${esc(head)}</p>` : "";
    return `<div class="files">${h}${assets.map(fileRow).join("")}</div>`;
  }

  function kitList(c) {
    const vids = c.recreate.attachments.filter((a) => a.kind === "video").length;
    const g = c.gen.length;
    return [
      "Промпт пересборки проекта",
      `${vids} ${plural(vids, "видео", "видео", "видео")} для hero-фона`,
      `${g} ${plural(g, "промпт", "промпта", "промптов")} для генерации фото и видео`,
      "Все вложения и готовые результаты",
    ];
  }

  function promptBlock(item) {
    const desc = item.desc ? `<p class="prompt-desc">${esc(item.desc)}</p>` : "";
    const tip = item.tip ? `<p class="tip">${esc(item.tip)}</p>` : "";
    return `
      <article class="prompt">
        <header class="prompt-head">
          <h3 class="prompt-title">${esc(item.title)}</h3>
          ${desc}
        </header>
        ${fileList(item.assets, "Вложения и результат")}
        <div class="code">
          <div class="code-bar">
            <span class="code-tag">промпт для нейросети</span>
            <button class="btn-copy" type="button">${I.copy}<span>Копировать</span></button>
          </div>
          <pre class="code-pre">${esc(item.code)}</pre>
        </div>
        ${tip}
      </article>`;
  }

  function render(key) {
    const c = DATA[key];
    const rs = document.documentElement.style;
    rs.setProperty("--accent", c.accent);
    rs.setProperty("--accent-2", c.accent2);

    const prompts = c.gen.map(promptBlock).join("");
    const kit = kitList(c).map((k) => `<li>${esc(k)}</li>`).join("");
    const recreateFiles = [c.recreate.prompt].concat(c.recreate.attachments);
    const steps = c.recreate.steps.map((s) => `<li>${esc(s)}</li>`).join("");

    root.innerHTML = `
      <section class="case" data-key="${key}">
        <div class="case-grid">

          <aside class="rail">
            <p class="rail-kicker">${esc(c.ru)}</p>
            <h1 class="rail-title">${esc(c.name)}</h1>
            <p class="rail-blurb">${esc(c.blurb)}</p>

            <div class="rail-kit">
              <p class="mini-label">В наборе</p>
              <ul class="kit">${kit}</ul>
            </div>

            <a class="btn-archive" href="${c.archive.href}" download>
              ${I.dl}<span>Скачать архив · ${esc(c.archive.size)}</span>
            </a>
            <p class="rail-note">${esc(c.archive.note)}</p>
          </aside>

          <div class="content">
            <figure class="media">
              <img src="${c.preview}" alt="Превью: ${esc(c.name)}" loading="eager" decoding="async" fetchpriority="high" />
            </figure>

            <section class="block">
              <div class="block-head">
                <p class="mini-label">Один промпт — весь проект</p>
                <h2>Как собрать сайт</h2>
              </div>
              <p class="block-note">${esc(c.recreate.note)}</p>
              <ol class="steps">${steps}</ol>
              ${fileList(recreateFiles, "Скачать по отдельности")}
            </section>

            <section class="block">
              <div class="block-head">
                <p class="mini-label">Генерация исходников</p>
                <h2>Промпты для фото и видео</h2>
              </div>
              <p class="block-note">Каждый промпт вставляй в нейросеть и прикладывай указанное вложение. Готовые результаты тоже можно скачать.</p>
              <div class="prompts">${prompts}</div>
            </section>
          </div>

        </div>
      </section>`;

    bindCopy();
    Array.from(tabsWrap.querySelectorAll(".tab")).forEach((t) =>
      t.classList.toggle("active", t.dataset.tab === key)
    );
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function bindCopy() {
    root.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const code = btn.closest(".code").querySelector("pre.code-pre").textContent;
        try {
          await navigator.clipboard.writeText(code);
        } catch (e) {
          const ta = document.createElement("textarea");
          ta.value = code;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        btn.classList.add("done");
        btn.innerHTML = I.ok + "<span>Скопировано</span>";
        clearTimeout(btn._t);
        btn._t = setTimeout(() => {
          btn.classList.remove("done");
          btn.innerHTML = I.copy + "<span>Копировать</span>";
        }, 1800);
      });
    });
  }

  // case switcher: leading label + segmented control
  const seg = ORDER.map(
    (k) => `<button class="tab" data-tab="${k}" role="tab">${esc(DATA[k].tab)}</button>`
  ).join("");
  tabsWrap.innerHTML = `<span class="tabs-label">Кейс</span><div class="seg">${seg}</div>`;

  Array.from(tabsWrap.querySelectorAll(".tab")).forEach((t) =>
    t.addEventListener("click", () => {
      if (!t.classList.contains("active")) render(t.dataset.tab);
    })
  );

  render(ORDER[0]);
})();
