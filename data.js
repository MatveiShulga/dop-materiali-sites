/* ============================================================================
   ГДЕ ЛЕЖАТ ТЯЖЁЛЫЕ ФАЙЛЫ (видео, фото, архивы).
   Всё медиа хостится в GitHub Releases — сам лендинг остаётся лёгким.
   Хочешь другой репозиторий/тег — поменяй ТОЛЬКО эти три строки.
   После заливки (см. upload-to-github.sh) ссылки заработают сами.
   ========================================================================== */
const REPO = "MatveiShulga/dop-materiali-sites";
const TAG  = "v1";
// Локально (localhost / открытый файл) медиа берётся из папки release-assets —
// превью видно сразу, без заливки. На проде (Vercel и т.п.) — с GitHub Releases.
const IS_LOCAL =
  location.protocol === "file:" ||
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1";
const BASE = IS_LOCAL
  ? "./release-assets/"
  : "https://github.com/" + REPO + "/releases/download/" + TAG + "/";

window.SITE_DATA = {

  /* ======================= КЕЙС 1 — ПОВОРОТ ГОЛОВЫ ======================= */
  head: {
    tab: "Поворот головы",
    name: "Поворот головы",
    ru: "Кейс 1 · нейро-портрет «kernel»",
    accent: "#2f93ad",
    accent2: "#7fcfe0",
    preview: BASE + "site1-photo-main.jpg",
    blurb: "Светлый hero-экран: портрет в CRT-шлеме, который поворачивает голову вслед за курсором. Видео не проигрывается само — оно «скрабится» позицией мыши слева-направо.",

    archive: {
      href: BASE + "site1-archive.zip",
      size: "4.0 МБ",
      note: "Промпт пересборки + hero-видео. Распакуй, открой папку в ИИ-агенте — и вставь промпт ниже.",
    },

    recreate: {
      note: "Отдаёшь ИИ-агенту один промпт и одно видео — он собирает весь проект (React + Vite + Tailwind).",
      steps: [
        "Скачай архив выше и распакуй в пустую папку.",
        "Открой эту папку в ИИ-агенте (в ней должно лежать только видео).",
        "Скачай промпт пересборки и вставь его целиком в чат.",
        "Приложи hero-видео к сообщению — агент сам положит его в public/ и соберёт сайт.",
        "Дальше: npm install, npm run dev — открой адрес из консоли.",
      ],
      prompt: {
        label: "Промпт пересборки сайта (RECREATE_PROMPT.md)",
        href: BASE + "site1-recreate-prompt.md",
        size: "30 КБ",
        kind: "doc",
      },
      attachments: [
        {
          label: "Hero-видео «поворот головы» — приложить к промпту",
          href: BASE + "site1-video.mp4",
          size: "4.0 МБ",
          kind: "video",
        },
      ],
    },

    gen: [
      {
        title: "Фото 1 — основное (смотрит в камеру)",
        desc: "Базовый портрет. Из него дальше генерятся повороты и видео.",
        assets: [
          { label: "Референс композиции «Референс 1 кейс» — приложить", href: BASE + "site1-ref.webp", size: "33 КБ", kind: "image" },
          { label: "Готовый результат (основное фото)", href: BASE + "site1-photo-main.jpg", size: "148 КБ", kind: "image" },
        ],
        code:
`Edit the reference image into a clean, photorealistic futuristic studio portrait.

Create a centered, perfectly symmetrical, waist-up portrait of a young woman facing straight forward, looking directly at the camera. She is wearing a clean white retro-futuristic helmet with a built-in vintage CRT monitor used as a visor. The visor should sit high on the face, covering only the eyes and forehead, while the lower half of the face remains fully visible and uncovered — nose tip, lips, closed mouth, and chin must be clearly visible. Calm neutral expression, lips closed.

Keep the helmet design sleek, minimal, and white, inspired by retro computer hardware. The CRT screen should glow softly in a light blue / pale cyan tone and display faint lines of code or interface elements. The code should be subtle and elegant.

Dress the character in a clean white minimal high-neck outfit / turtleneck. She must be fully clothed from the neck down, with shoulders and chest fully covered. No bare skin below the neck.

Background must be a pure solid white background only — completely clean, flat, seamless, with no texture, no gradient, no pattern, no room elements, no shadows, and no blur. Bright even studio lighting, sharp focus, photorealistic skin, clean sharp edges, premium futuristic aesthetic. The composition should be ideal for a website hero section and suitable for head-tracking animation, so the head must remain perfectly centered and balanced.

Important: preserve the overall concept of the original reference, but make the final image clean, polished, minimal, and original. Absolutely no text, no letters, no words, no numbers, no logos, no watermark anywhere in the image, except faint code displayed inside the CRT screen.`,
        tip: "Во вложении — файл «Референс 1 кейс».",
      },
      {
        title: "Фото 2 — поворот вправо",
        desc: "Тот же персонаж, меняется только направление головы.",
        assets: [
          { label: "Приложить «основное фото» (результат шага 1)", href: BASE + "site1-photo-main.jpg", size: "148 КБ", kind: "image" },
          { label: "Готовый результат (поворот вправо)", href: BASE + "site1-photo-right.jpg", size: "148 КБ", kind: "image" },
        ],
        code:
`Keep this exact character, helmet, screen, white turtleneck, framing and pure white background 100% identical. Change ONLY the head direction: the CRT monitor head is turned to the left, as if looking left. Body and shoulders stay still and centered. Same lighting, same pose, sharp focus, no blur, clean outline. Absolutely no text except the code on screen, pure solid white background.`,
        tip: "Во вложении — «основное фото».",
      },
      {
        title: "Фото 3 — поворот влево",
        desc: "Второй крайний кадр для развилки поворота.",
        assets: [
          { label: "Приложить «основное фото» (результат шага 1)", href: BASE + "site1-photo-main.jpg", size: "148 КБ", kind: "image" },
          { label: "Готовый результат (поворот влево)", href: BASE + "site1-photo-left.jpg", size: "132 КБ", kind: "image" },
        ],
        code:
`Keep this exact character, helmet, CRT screen, white turtleneck, body position, scale and framing 100% identical. Change ONLY the head direction: turn the CRT monitor head clearly to the LEFT side, so the head faces toward the left edge of the image. Body, shoulders, neck and torso stay completely still, centered and frozen — no body movement. Same lighting, same scale, sharp focus, clean outline, same faint code on screen.`,
        tip: "Во вложении — «основное фото».",
      },
      {
        title: "Видео — поворот головы (Kling)",
        desc: "Оживляем портрет: голова плавно поворачивается слева-направо. Это и есть hero-видео для сборки сайта.",
        assets: [
          { label: "Стартовый кадр — приложить фото «поворот влево»", href: BASE + "site1-photo-left.jpg", size: "132 КБ", kind: "image" },
          { label: "Готовый результат (видео)", href: BASE + "site1-video.mp4", size: "4.0 МБ", kind: "video" },
        ],
        code:
`The character slowly and smoothly turns its head from left to right at a steady, natural pace. Only the CRT monitor head rotates. The body, shoulders, neck and torso stay completely still, facing forward, frozen in place. Keep the same white CRT helmet, the same code on the screen, the same white turtleneck, the same scale and position. Keep the environment, lighting, composition and character design unchanged. Pure white background stays identical.
No camera movement, no zoom, no cuts, no scene change, no body movement.
The motion should feel smooth, subtle and realistic, like a person calmly looking from one side to the other.`,
        tip: "В Kling как первый кадр приложи «поворот влево» — движение пойдёт влево → вправо.",
      },
    ],
  },

  /* ==================== КЕЙС 2 — СВЕТЛАЯ / ТЁМНАЯ ТЕМА ==================== */
  theme: {
    tab: "Светлая / тёмная тема",
    name: "Светлая / тёмная тема",
    ru: "Кейс 2 · кемпинг «Emberline»",
    accent: "#c8663a",
    accent2: "#e79a63",
    preview: BASE + "site2-photo-day.jpg",
    blurb: "Кинематографичный кемпинг с переключением день/ночь: два видео-фона плавно перетекают друг в друга по одному клику. Один и тот же кадр — светлая и тёмная тема.",

    archive: {
      href: BASE + "site2-archive.zip",
      size: "8.6 МБ",
      note: "Промпт пересборки + оба видео (день и ночь). Распакуй, открой в ИИ-агенте — и вставь промпт.",
    },

    recreate: {
      note: "Один большой промпт + два видео → готовый сайт с переключателем темы (React + Vite + Tailwind + Framer Motion).",
      steps: [
        "Скачай архив выше и распакуй в пустую папку.",
        "Открой эту папку в ИИ-агенте (в ней два видео: день и ночь).",
        "Скачай промпт пересборки и вставь его целиком в чат.",
        "Приложи оба видео — агент положит их в public/ как camp-day / camp-night и соберёт сайт.",
        "Дальше: npm install, npm run dev — открой адрес из консоли.",
      ],
      prompt: {
        label: "Промпт пересборки сайта (RECREATE_PROMPT.md)",
        href: BASE + "site2-recreate-prompt.md",
        size: "920 КБ",
        kind: "doc",
      },
      attachments: [
        { label: "Видео — день (светлая тема)", href: BASE + "site2-video-day.mp4", size: "4.3 МБ", kind: "video" },
        { label: "Видео — ночь (тёмная тема)", href: BASE + "site2-video-night.mp4", size: "3.6 МБ", kind: "video" },
      ],
    },

    gen: [
      {
        title: "Фото 1 — светлый кемпинг (день)",
        desc: "Базовый дневной кадр. Text-to-image, вложение не нужно.",
        assets: [
          { label: "Готовый результат (светлый кемпинг)", href: BASE + "site2-photo-day.jpg", size: "224 КБ", kind: "image" },
        ],
        code:
`A wide cinematic camping scene on a grassy mountain plateau, created in a stylized semi-realistic render — balanced between realism and a polished animated look, with a subtle miniature diorama feel. Cinematic, refined, atmospheric, but NOT a cartoon and NOT a real photo. Soft stylized surfaces, elegant lighting, and clean forms. Apply a warm vintage film tone with soft analog grain/noise across the whole image, a muted slightly desaturated palette, dreamy moody cinematic atmosphere, and a soft haze.

Composition is very important: horizontal 16:9, low horizon, with the upper half of the image occupied by a large open cloudy sky, leaving generous empty negative space at the top for a future headline. In the background, place a stylized rocky mountain formation around the center. Frame the scene with stylized pine trees on both the left and right sides.

The camping layout should be clearly staged and visually balanced:
- In the left foreground, a large tent is partially visible, cropped by the frame.
- Slightly left of center, there is a second tent, and next to its entrance a person is crouching and dealing with the tent, seen from behind, face not visible.
- Slightly right of center, there is a small warm campfire burning on the grass.
- Beside the fire sits a man, turned away from the camera so his face is not visible. He is sitting calmly and roasting a marshmallow over the flames using a long thin stick. His pose is relaxed and natural. On the grass near him lies an open pack or bag of marshmallows.
- On the right side, near a third tent, a girl lies diagonally on a mat reading a book. She is seen from behind or at an angle so her face is hidden and not visible.

All people must remain relatively small in the mid-ground and their faces must never be visible — only backs, turned heads, or obscured angles. Keep figures simple and activity-focused. Warm golden-hour lighting, soft shadows, clean scenic depth, and a calm tranquil outdoor feeling.

Important style notes: keep the same polished semi-realistic stylized render quality throughout, with soft filmic grain, warm nostalgic color grading, slightly dreamy atmosphere, and a subtle handcrafted miniature-like feel. The image must feel visually premium, calm, cinematic, and cohesive.

Important restrictions: absolutely NO text, NO letters, NO words, NO numbers, NO logos, NO watermarks. Clean image only.`,
        tip: "",
      },
      {
        title: "Фото 2 — тёмный кемпинг (ночь)",
        desc: "Та же композиция, перекрашенная в глубокую ночь + правки по людям.",
        assets: [
          { label: "Приложить «светлый кемпинг» (результат шага 1)", href: BASE + "site2-photo-day.jpg", size: "224 КБ", kind: "image" },
          { label: "Готовый результат (тёмный кемпинг)", href: BASE + "site2-photo-night.jpg", size: "210 КБ", kind: "image" },
        ],
        code:
`Edit the provided reference image and keep the scene composition as close as possible to the original: same wide horizontal 16:9 framing, same grassy mountain plateau, same tents placement, same rocky mountain in the background, same pine trees on the sides, same campfire position, same overall layout and stylized semi-realistic cinematic render quality.

Transform the scene from golden-hour daylight into a much darker deep night scene. The sky must be full dark night, not twilight and not dusk: deep navy blue fading to near-black at the top, filled with bright clear stars and a visible Milky Way. Make the entire landscape much darker: grass, trees, mountains, and tents should all fall into deep cool moonlit shadow. Overall brightness should be low, with rich blacks and a moody cinematic nighttime atmosphere.

The campfire must remain the main focal point and the only strong light source. It should cast a warm orange glow in a small pool of light around the couple and nearby ground. The surrounding environment should stay dark beyond the firelight. Add subtle cool blue moonlight in the rest of the scene. The tents may glow very faintly from inside.

Keep the style polished, cinematic, semi-realistic, slightly stylized, with a subtle miniature diorama feel. Preserve the calm atmosphere and clean composition.

Now fix the people and their placement:
- Remove the crouching person near the left-middle tent completely. Replace that area with plain grass so no person remains there.
- Remove the woman lying on the ground reading on the right side.
- The central man remains seated near the campfire, seen from behind, face not visible. He is no longer roasting a marshmallow. Remove the marshmallow stick completely. He should simply sit calmly beside the fire, looking ahead toward the fire, not looking upward. Add a cozy knit beanie on his head.
- Add a woman sitting close beside him at the campfire. She is wrapped in a blanket, seen from behind, face not visible. She is holding a cup of hot tea, with a small visible trail of steam rising from the cup.
- The couple should sit close together near the campfire, forming the main human focus of the scene.
- Feet should stick out of ONLY the far right tent, indicating someone sleeping inside. Only one pair of feet in the whole image. No feet visible from any other tent.

Important constraints:
- Keep the background composition, mountain, tents, sky placement, trees, and campfire layout as consistent as possible with the reference image.
- No visible faces.
- No extra people.
- No text, no letters, no words, no numbers, no logos, no watermarks.`,
        tip: "Во вложении — «светлый кемпинг».",
      },
      {
        title: "Видео — день (dayy)",
        desc: "Оживляем дневной кадр: огонь, дым, лёгкий ветер. Камера зафиксирована.",
        assets: [
          { label: "Стартовый кадр — приложить «светлый кемпинг»", href: BASE + "site2-photo-day.jpg", size: "224 КБ", kind: "image" },
          { label: "Готовый результат (видео день)", href: BASE + "site2-video-day.mp4", size: "4.3 МБ", kind: "video" },
        ],
        code:
`LOCKED CAMERA, completely static fixed frame. No camera movement, no camera shake, no zoom, no pan, no drift, no parallax — the camera is 100% locked and still like a tripod shot. The frame does not move at all.Only these subtle elements animate, everything else is frozen:The campfire flames flicker and burn naturally in front of the central man.A thin wisp of smoke rises and drifts gently upward from the fire.The central man sits still holding the stick with the marshmallow over the flames — only a tiny subtle movement of his hand, body stays in place.The person at the left tent makes small hand movements in place.The woman on the right slightly sways her raised lower legs slowly.The grass and pine trees sway very gently in a light breeze.Nobody walks across the scene. The background, mountains, tents and sky stay completely static. Calm, slow, realistic. Seamless loop, end matches the beginning.`,
        tip: "Seamless loop — конец совпадает с началом, чтобы фон крутился бесшовно.",
      },
      {
        title: "Видео — ночь (night)",
        desc: "Ночная версия: статичное звёздное небо, один метеор, огонь и пар от чая.",
        assets: [
          { label: "Стартовый кадр — приложить «тёмный кемпинг»", href: BASE + "site2-photo-night.jpg", size: "210 КБ", kind: "image" },
          { label: "Готовый результат (видео ночь)", href: BASE + "site2-video-night.mp4", size: "3.6 МБ", kind: "video" },
        ],
        code:
`LOCKED CAMERA, completely static fixed frame — no camera movement, no zoom, no pan, no drift, like a tripod shot. The frame does not move at all.THE SKY IS COMPLETELY STATIC AND FROZEN LOCKED — the stars and Milky Way do NOT move, do NOT shift, do NOT drift at all. The night sky stays perfectly still. The ONLY thing that happens in the sky is a single shooting star that briefly streaks across once in the distance, then it's gone. Nothing else in the sky moves.Only these subtle elements animate on the ground, everything else frozen:The campfire flames flicker and burn naturally.A thin wisp of smoke rises gently from the fire.Light steam rises softly from the woman's cup of tea.The man and woman sit still with only very subtle breathing movement, staying in place.A few fireflies glow and float softly near the grass.The grass sways gently in a light breeze; the pine trees sway very gently.The sky, stars, background, mountains and tents all stay completely static and locked. Nobody moves across the scene. Calm, slow, peaceful. Seamless loop, end matches the beginning.`,
        tip: "Seamless loop — для бесшовного ночного фона.",
      },
    ],
  },
};

window.SITE_ORDER = ["head", "theme"];
