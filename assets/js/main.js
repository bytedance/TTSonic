const audioAssetVersion = "20260908-audiobook-demo";
const audio = (src, label) => ({
  src: `${src}?v=${audioAssetVersion}`,
  label,
});

const codecBase = "assets/audio/scenes/codec";

const codecSpeechEnhancement = [
  ["1008233_p2_fed35af2.wav", "1008233_p2_fed35af2__restore.wav"],
  ["1010161_0fa0e99f.wav", "1010161_0fa0e99f__restore.wav"],
  ["1011788_1542c4d9.wav", "1011788_1542c4d9__restore.wav"],
  ["1021735_052dcca5.wav", "1021735_052dcca5__restore.wav"],
  ["1416.wav", "1416__restore.wav"],
  ["146.wav", "146__restore.wav"],
  ["1893.wav", "1893__restore.wav"],
  ["769.wav", "769__restore.wav"],
].map(([source, restored]) => ({
  source: audio(`${codecBase}/source/${source}`, "Noisy Input"),
  restored: audio(`${codecBase}/speech-enhancement/${restored}`, "Enhanced Output"),
}));

const codecVoiceConversion = [
  ["voice-conversion/source/vc-01.wav", "voice-conversion/target/vc-01.wav", "voice-conversion/output/vc-01.wav"],
  ["voice-conversion/source/vc-02.wav", "voice-conversion/target/vc-02.wav", "voice-conversion/output/vc-02.wav"],
  ["voice-conversion/source/vc-03.wav", "voice-conversion/target/vc-03.wav", "voice-conversion/output/vc-03.wav"],
  ["voice-conversion/source/vc-04.wav", "voice-conversion/target/vc-04.wav", "voice-conversion/output/vc-04.wav"],
  ["source/1010161_0fa0e99f.wav", "voice-conversion/target/vc-05.wav", "voice-conversion/output/vc-05.wav"],
  ["source/1021735_052dcca5.wav", "voice-conversion/target/vc-06.wav", "voice-conversion/output/vc-06.wav"],
  ["source/146.wav", "voice-conversion/target/vc-07.wav", "voice-conversion/output/vc-07.wav"],
  ["source/769.wav", "voice-conversion/target/vc-08.wav", "voice-conversion/output/vc-08.wav"],
].map(([source, target, converted]) => ({
  source: audio(`${codecBase}/${source}`, "Source Audio"),
  target: audio(`${codecBase}/${target}`, "Target Voice"),
  converted: audio(`${codecBase}/${converted}`, "Converted Audio"),
}));

const cloningCases = [
  {
    text: "电影七点开场，我们提前十分钟进场。",
    prompt: "1416.wav",
    clone: "1416__different_09.wav",
    target: "00103467-00000038.wav",
    conversion: "1416__different_09__vc_05__00103467-00000038.wav",
  },
  {
    text: "欢迎来到本期节目，有请嘉宾登场！",
    prompt: "146.wav",
    clone: "146__same_01.wav",
    target: "00004533-00000120.wav",
    conversion: "146__same_01__vc_06__00004533-00000120.wav",
  },
  {
    text: "今晚的特别节目邀请了多位嘉宾，他们将通过现场访谈分享创作背后的经历和珍贵回忆。",
    prompt: "1893.wav",
    clone: "1893__same_01.wav",
    target: "10003602-00000052.wav",
    conversion: "1893__same_01__vc_06__10003602-00000052.wav",
  },
  {
    text: "这间屋子白天采光还可以，可是一到晚上楼下就很吵，我已经连续好几天都没睡好。",
    prompt: "769.wav",
    clone: "769__same_01.wav",
    target: "10002751-00000038.wav",
    conversion: "769__same_01__vc_03__10002751-00000038.wav",
  },
  {
    text: "爸爸把热汤盛进碗里，叫大家先放下手中的事情，一起尝尝刚做好的晚饭和新鲜点心。",
    prompt: "1017378_2b847e76.wav",
    clone: "1017378_2b847e76__different_04.wav",
    target: "10002290-00000094.wav",
    conversion: "1017378_2b847e76__different_04__vc_03__10002290-00000094.wav",
  },
  {
    text: "这次坦诚的交谈没有立刻解决问题，却让他们重新理解了彼此沉默背后的顾虑。",
    prompt: "1026478_a27f675d.wav",
    clone: "1026478_a27f675d__same_02.wav",
    target: "00005022-00000119.wav",
    conversion: "1026478_a27f675d__same_02__vc_03__00005022-00000119.wav",
  },
].map((item) => {
  const base = "assets/audio/scenes/cloning";
  return {
    ...item,
    prompt: audio(`${base}/prompt/${item.prompt}`, "Prompt"),
    clone: audio(`${base}/clone/${item.clone}`, "Clone"),
    target: audio(`${base}/target/${item.target}`, "Target Voice"),
    conversion: audio(`${base}/vc/${item.conversion}`, "Voice Conversion"),
  };
});

const shortInstructionFollowing = [
  {
    id: "official_011",
    instruction: "中年女声，压着怒火训斥，每个字都咬得很重，语速慢，音量不高但有压迫感。",
    text: "我问你三次，你三次都不说实话，你让我以后还怎么信你？",
    voiceOne: "official_011-text2emb-b.wav",
    voiceTwo: "official_011-text2emb-e.wav",
  },
  {
    id: "official_140",
    instruction: "村支书大喇叭喊话，洪亮接地气，尾音拖长。",
    text: "乡亲们注意啦，明天卫生院来村里免费体检，六十岁以上的老人都能去，记得空腹别吃饭！",
    voiceOne: "official_140-text2emb-b.wav",
    voiceTwo: "official_140-text2emb-d.wav",
  },
  {
    id: "official_188",
    instruction: "极快语速男声报菜名贯口，嘴皮子利索，字字清楚不黏。",
    text: "蒸羊羔蒸熊掌蒸鹿尾儿烧花鸭烧雏鸡烧子鹅卤煮咸鸭酱鸡腊肉松花小肚儿，您各位先尝尝这头几样！",
    voiceOne: "official_188-text2emb-b.wav",
    voiceTwo: "official_188-text2emb-d.wav",
  },
  {
    id: "official_218",
    instruction: "四川人同学聚会打招呼，语速由慢转快，惊讶处拔高，重音多，全程四川话。",
    text: "哎呀老同学，好多年没见咯，你娃硬是一点没变，今天必须整两杯，摆哈龙门阵。",
    voiceOne: "official_218-text2emb-a.wav",
    voiceTwo: "official_218-text2emb-c.wav",
  },
  {
    id: "official_187",
    instruction: "北京大爷男声，贫嘴松弛，儿化自然，自嘲口吻，重音往下咂摸。",
    text: "您猜怎么着，我排了一个钟头队，到我这儿，豆汁儿卖完了，嘿，您说这叫什么事儿。",
    voiceOne: "official_187-text2emb-a.wav",
    voiceTwo: "official_187-text2emb-b.wav",
  },
  {
    id: "official_069",
    instruction: "性别: 女性。\n音高: 女童高音区，细软微颤。\n语速: 偏慢，开头犹豫。\n音量: 轻而认真，逐渐放稳。\n年龄: 儿童阶段，六岁上下。\n清晰度: 稚齿音清楚，带怯意。\n流畅度: 开头卡顿，后段渐顺。\n口音: 标准普通话，无口音。\n音色质感: 细软稚嫩，乖巧。\n情绪: 胆怯转为坚定，认真。\n语调: 先低后稳，句尾收得认真。\n性格: 胆小但要强，乖巧懂事。",
    text: "老师，我、我也想参加讲故事比赛，虽然我有一点点害怕，但是我会努力的。",
    voiceOne: "official_069-text2emb-a.wav",
    voiceTwo: "official_069-text2emb-e.wav",
  },
].map((item) => {
  const base = "assets/audio/scenes/short-instruction-following";
  return {
    ...item,
    voiceOne: audio(`${base}/${item.voiceOne}`, item.voiceOneLabel || "Voice Design 1"),
    voiceTwo: audio(`${base}/${item.voiceTwo}`, item.voiceTwoLabel || "Voice Design 2"),
  };
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAudio(item) {
  return `<div class="audio-cell"><span class="sr-only">${escapeHtml(item.label)}</span><audio controls preload="none" src="${escapeHtml(item.src)}"></audio></div>`;
}

function renderText(text) {
  return `<span class="text-preview">${escapeHtml(text)}</span>`;
}

function renderTable(targetId, headers, rows) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = `
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>${rows.join("")}</tbody>
    </table>
  `;
}

function renderShortInstructionFollowing() {
  const target = document.getElementById("short-instruction-following-table");
  if (!target) return;
  target.innerHTML = `
    <div class="instruction-card-grid">
      ${shortInstructionFollowing
        .map(
          (row, index) => `
            <article class="instruction-card">
              <div class="instruction-card-header">
                <span class="sample-badge">Sample ${String(index + 1).padStart(2, "0")}</span>
              </div>
              <p class="instruction-card-instruction">${escapeHtml(row.instruction)}</p>
              <p class="instruction-card-text">${escapeHtml(row.text)}</p>
              <div class="instruction-card-voices">
                <div class="instruction-voice-item output">
                  <span>${escapeHtml(row.voiceOneLabel || "Voice Design 1")}</span>
                  ${renderAudio(row.voiceOne)}
                </div>
                <div class="instruction-voice-item output">
                  <span>${escapeHtml(row.voiceTwoLabel || "Voice Design 2")}</span>
                  ${renderAudio(row.voiceTwo)}
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderCodecDemos() {
  const enhancementTarget = document.getElementById("codec-speech-enhancement-table");
  if (enhancementTarget) {
    enhancementTarget.innerHTML = `
      <div class="audio-comparison-grid">
        ${codecSpeechEnhancement
          .map(
            (row, index) => `
              <article class="audio-comparison-card">
                <div class="comparison-card-header">
                  <span class="sample-badge">Sample ${String(index + 1).padStart(2, "0")}</span>
                </div>
                <div class="comparison-audio-row">
                  <div class="comparison-audio-item"><span>Noisy Input</span>${renderAudio(row.source)}</div>
                  <div class="comparison-audio-item output"><span>Enhanced Output</span>${renderAudio(row.restored)}</div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  const conversionTarget = document.getElementById("codec-voice-conversion-table");
  if (conversionTarget) {
    conversionTarget.innerHTML = `
      <div class="voice-conversion-grid">
        ${codecVoiceConversion
          .map(
            (row, index) => `
              <article class="voice-conversion-card">
                <div class="conversion-card-header">
                  <span class="sample-badge">Sample ${String(index + 1).padStart(2, "0")}</span>
                </div>
                <div class="conversion-flow">
                  <div class="conversion-stage"><span>Source Audio</span>${renderAudio(row.source)}</div>
                  <span class="conversion-arrow" aria-hidden="true">+</span>
                  <div class="conversion-stage"><span>Target Voice</span>${renderAudio(row.target)}</div>
                  <span class="conversion-arrow" aria-hidden="true">→</span>
                  <div class="conversion-stage output"><span>Converted Audio</span>${renderAudio(row.converted)}</div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }
}

function renderCloningCases() {
  const renderCards = (targetId, prosody) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.innerHTML = `
      <div class="clone-card-grid">
        ${cloningCases
          .map(
            (row, index) => `
              <article class="clone-card">
                <div class="clone-card-header">
                  <span class="sample-badge">Sample ${String(index + 1).padStart(2, "0")}</span>
                </div>
                <p class="clone-card-text">${escapeHtml(row.text)}</p>
                <div class="clone-card-audios${prosody ? " prosody-flow" : ""}">
                  <div class="clone-audio-item"><span>Prompt</span>${renderAudio(row.prompt)}</div>
                  ${
                    prosody
                      ? `<span class="clone-flow-symbol" aria-hidden="true">+</span>
                         <div class="clone-audio-item"><span>Target Voice</span>${renderAudio(row.target)}</div>
                         <span class="clone-flow-symbol" aria-hidden="true">→</span>`
                      : ""
                  }
                  <div class="clone-audio-item output"><span>Clone</span>${renderAudio(prosody ? row.conversion : row.clone)}</div>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  };

  renderCards("cloning-table", false);
  renderCards("prosody-cloning-table", true);
}

function audiobookAsset(relativePath) {
  const base = "assets/audio/scenes/long-instruction-following";
  return audio(`${base}/${relativePath}`, "Audiobook audio");
}

function renderAudiobookSegment(segment) {
  return `
    <article class="audiobook-segment">
      <div class="audiobook-segment-role">
        <strong>${escapeHtml(segment.speaker)}</strong>
        <span>${escapeHtml(segment.instructionSummary)}</span>
      </div>
      <p class="audiobook-segment-text">${escapeHtml(segment.text)}</p>
      ${renderAudio(audiobookAsset(segment.audio))}
    </article>
  `;
}

function renderAudiobookScenePanel(scene, sceneIndex) {
  const segments = scene.segments.map(renderAudiobookSegment).join("");
  const voiceDescriptions = scene.voiceDescriptions?.length
    ? `
      <div class="audiobook-voice-descriptions">
        <div class="audiobook-voice-descriptions-label">Timbre Instruct</div>
        ${scene.voiceDescriptions
          .map(
            (voice) => `
              <div class="audiobook-voice-description">
                <div class="audiobook-voice-description-heading">
                  <strong>${escapeHtml(voice.speaker)}</strong>
                </div>
                <p>${escapeHtml(voice.description)}</p>
              </div>
            `,
          )
          .join("")}
      </div>
    `
    : "";
  const referenceAudio = scene.referenceAudio
    ? `
      <div class="audiobook-reference-audio">
        <span>Reference Audio</span>
        ${renderAudio(audiobookAsset(scene.referenceAudio))}
      </div>
    `
    : "";
  return `
    <section
      id="audiobook-chapter-panel-${scene.id}"
      class="audiobook-chapter-panel${sceneIndex === 0 ? " active" : ""}"
      role="tabpanel"
      aria-labelledby="audiobook-chapter-tab-${scene.id}"
      data-chapter="${scene.id}"
      ${sceneIndex === 0 ? "" : "hidden"}
    >
      <div class="audiobook-scene-content">
        <h3>${escapeHtml(scene.title)}</h3>
        ${scene.id === 2 ? "" : voiceDescriptions}
        <div class="audiobook-featured-audios">
          <div class="audiobook-featured-audio">
            <span>Long-form Audio</span>
            ${renderAudio(audiobookAsset(scene.longAudio))}
          </div>
        </div>
        <p class="audiobook-full-text">${escapeHtml(scene.fullText)}</p>
        ${scene.id === 2 ? voiceDescriptions : ""}
        ${referenceAudio}
        <div class="audiobook-divider"></div>
        <div class="audiobook-segments">${segments}</div>
      </div>
    </section>
  `;
}

function renderLongAudiobook() {
  const data = window.longAudiobookData;
  const chapterTabs = document.getElementById("audiobook-chapter-tabs");
  const chapterPanels = document.getElementById("audiobook-chapter-panels");
  if (!data || !chapterTabs || !chapterPanels) return;

  chapterTabs.innerHTML = data.scenes
    .map(
      (scene, index) => `
        <button
          id="audiobook-chapter-tab-${scene.id}"
          class="audiobook-chapter-tab${index === 0 ? " active" : ""}"
          type="button"
          role="tab"
          aria-selected="${index === 0}"
          aria-controls="audiobook-chapter-panel-${scene.id}"
          data-chapter="${scene.id}"
        >${escapeHtml(scene.label)}</button>
      `,
    )
    .join("");
  chapterPanels.innerHTML = data.scenes
    .map((scene, index) => renderAudiobookScenePanel(scene, index))
    .join("");

  chapterTabs.querySelectorAll(".audiobook-chapter-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const chapterId = button.dataset.chapter;
      chapterTabs.querySelectorAll(".audiobook-chapter-tab").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      chapterPanels.querySelectorAll(".audiobook-chapter-panel").forEach((panel) => {
        const active = panel.dataset.chapter === chapterId;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
        if (!active) {
          panel.querySelectorAll("audio").forEach((player) => player.pause());
        }
      });
    });
  });
}

function setupAudioFocus() {
  document.addEventListener(
    "play",
    (event) => {
      if (event.target.tagName !== "AUDIO") return;
      document.querySelectorAll("audio").forEach((player) => {
        if (player !== event.target) {
          player.pause();
        }
      });
    },
    true,
  );
}

renderCodecDemos();
renderCloningCases();
renderShortInstructionFollowing();
renderLongAudiobook();
setupAudioFocus();
