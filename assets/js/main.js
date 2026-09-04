const audioAssetVersion = "20260904-tg03-zh71-no-tg06";
const audio = (src, label) => ({ src: `${src}?v=${audioAssetVersion}`, label });

const codecSpeechEnhance = [1, 3].map((n) => {
  const id = `SE-${String(n).padStart(2, "0")}`;
  const base = `assets/audio/codec/speech-enhance/se-${String(n).padStart(2, "0")}`;
  return {
    id,
    original: audio(`${base}-original.wav`, "Original Input"),
    mossformer: audio(`${base}-mossformer.wav`, "MossFormer"),
    codec: audio(`${base}-codec-fm.wav`, "Codec + FM"),
  };
});

const codecVoiceConversion = [1, 3].map((n) => {
  const id = `VC-${String(n).padStart(2, "0")}`;
  const base = `assets/audio/codec/voice-conversion/vc-${String(n).padStart(2, "0")}`;
  return {
    id,
    source: audio(`${base}-source.wav`, "Source"),
    target: audio(`${base}-target.wav`, "Target Timbre"),
    converted: audio(`${base}-converted.wav`, "Converted"),
  };
});

const speechClone = [1, 2, 3].map((n) => {
  const id = `SC-${String(n).padStart(2, "0")}`;
  const base = `assets/audio/tts/speech-clone/sc-${String(n).padStart(2, "0")}`;
  return {
    id,
    prompt: audio(`${base}-prompt.wav`, "Prompt"),
    generated: audio(`${base}-generated.wav`, "Generated"),
  };
});

const prosodyClone = [1, 2, 3].map((n) => {
  const id = `PC-${String(n).padStart(2, "0")}`;
  const base = `assets/audio/tts/prosody-clone/pc-${String(n).padStart(2, "0")}`;
  return {
    id,
    prosody: audio(`${base}-prosody-prompt.wav`, "Prosody Prompt"),
    timbre: audio(`${base}-timbre-prompt.wav`, "Timbre Prompt"),
    generated: audio(`${base}-generated.wav`, "Generated"),
  };
});

const controllableCloning = [
  ["CC-S1-01", "Speaker A", "DSD", "以青年女性的嗓音进行演绎,说话时展现出愤怒与悲愤的情感,特别在表达控诉时显得直接而充满激情,语言流畅并有很强的爆发力。", "他的父母是在湾南被你们杀害的。", "cc-spk0-dsd-01-generated.wav"],
  ["CC-S1-02", "Speaker A", "DSD", "使用标准普通话,展现出中青年女性的清亮高音,音量洪亮,语速快捷,语调坚定且强调,体现出果断坚决的维护姿态。", "哎，兰香，你的事儿就是我跟魏峰的事儿。", "cc-spk0-dsd-02-generated.wav"],
  ["CC-S1-03", "Speaker A", "DSD", "呈现感到不公时的青年女性角色特征,采用女性常态音高,音色清亮并带有轻微尖锐,中等音量,初始语气自信坚定,随后迅速激化为强烈不满和质疑,语速流畅且略快,确保语言清晰无停顿。", "不怕，我还没说他们呢，有你这样的吗？", "cc-spk0-dsd-03-generated.wav"],
  ["CC-S1-04", "Speaker A", "RP", "在法庭上猛烈质问证人的女律师。", "你是想替李娜道歉，还是想爷数落我一番？", "cc-spk0-rp-01-generated.wav"],
  ["CC-S1-05", "Speaker B", "DSD", "以标准普通话发音,男性中低音区,全程保持流畅,语调在句末显著上扬,体现出自我辩护的急躁性格。", "我一点错都没有我没毛病，不就是房租吗？", "cc-spk1-dsd-01-generated.wav"],
  ["CC-S1-06", "Speaker B", "DSD", "保持男性音色特征,以自信主导的语气陈述内容,表达从叙述过渡到疑问,继而略带得意的确认,情绪自然流露,强调部分适度增加音量,发音准确无误。", "那老高整个会上跟我点头，到最后呢，他赞成。", "cc-spk1-dsd-03-generated.wav"],
  ["CC-S1-07", "Speaker B", "RP", "百科全书似的知识讲解,语速稳,音量饱满,听起来有种让人信服的魅力。", "我们现在应该进入联络范围了。看看包里有没有什么发现。Alpha呼叫3G。", "cc-spk1-rp-01-generated.wav"],
  ["CC-S1-08", "Speaker B", "RP", "民众集会时,用急切而直率的方式呼唤支持。", "他这次出去确实没有组了。我也就是想看看他被你骂的样子。可现在呢？", "cc-spk1-rp-03-generated.wav"],
].map(([id, speaker, type, instruction, text, generatedFile]) => {
  const base = "assets/audio/tts/controllable-cloning";
  const promptFile = speaker === "Speaker A" ? "cc-spk0-prompt.wav" : "cc-spk1-prompt.wav";
  return {
    id,
    speaker,
    type,
    instruction,
    text,
    prompt: audio(`${base}/${promptFile}`, "Fixed Speaker"),
    generated: audio(`${base}/${generatedFile}`, "Generated"),
  };
});

const timbreGeneration = [
  ["TG-01", "女童", "展现出小小主持人的女声特质,音色清澈而明亮,语调上扬活泼,语速应偏快,表现积极热情和开朗自信的情绪。"],
  ["TG-02", "男童", "以响亮清晰的声音表达,抑扬顿挫,充满表现力,发音稍显夸张,并融入孩童式的欢快笑声,给人一种开心愉悦的感觉。"],
  ["TG-03", "青年女声", "以女性高音区的清亮音色,表现出青年阶段的特质,音量略强,语速适中稍快,语调带有解释意味和急切的情感流露,确保语音流畅自然。"],
  ["TG-04", "青年男声", "呈现出青年男性的声音特征,音色清亮略带锐利感,音高在男性中音区,显得有些激昂。说话时音量要较高,特别是在表达初期愤怒和激动的情绪时要更加强调,语速急促且节奏紧凑。"],
  ["TG-05", "中年女声", "语音应展现出中年规劝者果断直接的风格,语速在交流初期较快,而在给出意见时略有放缓,音量保持正常但在强调不满与质问时稍有提高,确保整体流畅连贯。"],
].map(([id, label, instruction]) => {
  const n = id.slice(-2).toLowerCase();
  return {
    id,
    label,
    instruction,
    reference: audio(`assets/audio/tts/timbre-generation/tg-${n}-reference.wav`, "GT Reference"),
    generated: audio(`assets/audio/tts/timbre-generation/tg-${n}-generated.wav`, "Generated"),
  };
});

const instructFollowing = [
  ["IF-01", "DSD", "声音需表现出资讯播报员的专业风范,语音标准,语调平直,音量适中,情绪保持客观,不带个人情感,确保信息准确传达。", "靠着普通网友把网页翻成自己的母语,这个网站现在有超过70个语言版本。"],
  ["IF-02", "DSD", "以温和的音色叙述往事,语气轻松且带有丝丝怀旧,女性中高音调略微降低,语速较慢,音量适中,突出青年女性感恩与轻松的特质,整体表达清晰而流畅。", "我在颁奖台上，我就跟底下观众还有我的粉丝，我就说我最要感谢的。就是大树咖啡厅。我最要感谢的人就是猴子哥。你说那个时候咱这咖啡厅还筹咖啡，卖不出去吗？"],
  ["IF-03", "DSD", "展现出果敢坚定、充满理想与热忱的青年女性音色特征,音高保持中高音区,语调抑扬顿挫分明,发音标准且吐字清晰,语句显得流畅连贯,表现出由沉稳转向激昂的情绪。", "俗话说，风风雨雨一家女嘛，可我从小风里来浪里去，不过是为了一网鱼，从来没想到淋一场大雨是为国为人民，这不是一个好机会吗？"],
  ["IF-04", "DSD", "声音应体现出自信直接的中年女性特征,语速快慢有致,表达清晰。采用标准普通话,高音区,说话时语气肯定,并在结尾带有反问意味。", "我就是看在。你是叮当老爷的份儿上。我这还坐下来跟你说话，懂吗？"],
  ["IF-05", "DSD", "以中老年男性的角色特点为基础,音色沉稳自然,表达流畅无停顿,使用标准普通话,语速舒缓,句末语调略降,分享经验时保持自信而平静的语气。", "要说这行，我比你多干了几年，对待顾客是有窍门的。"],
  ["IF-06", "RP", "在法庭上,控诉者愤怒质问对方。", "你不用说了，你就是想开小差，怕困难贪图享受，我绝不是光为自己。"],
  ["IF-07", "RP", "以标准普通话,略带磁性和叙述风格的中低声调,表达平静但让人感兴趣的内容。", "为了进一步了解玉石的雕刻过程，天啸跟随王朝阳老师来到了他的工作室。但是进去后却发现，这里只有机器，却看不到雕刻师的影子。"],
  ["IF-08", "RP", "用一个像着急找东西却找不到的语气,语速快,语调逐渐升高。", "人哪儿了?我慌急了,到处都是警车枪。"],
  ["IF-09", "RP", "回想起自己被孩子上次的承诺所失望,带着一丝勉强的笑意责备。", "家长会上让我好丢脸，他两门功课不及格，还骗我。"],
  ["IF-10", "RP", "用清晰、快速的普通话陈述观点,传达出不容质疑的坚定和果敢。", "没有任何问题，有什么差别啊。"],
].map(([id, type, instruction, text]) => ({
  id,
  type,
  instruction,
  text,
  generated: audio(`assets/audio/tts/instruct-following/${id.toLowerCase()}-generated.wav`, "Generated"),
}));

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

function renderLongText(text) {
  const safe = escapeHtml(text);
  return `<span class="text-preview always-visible">${safe}</span>`;
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

function renderAllTables() {
  renderTable(
    "codec-speech-enhance",
    ["Sample", "Original Input", "MossFormer", "Codec + FM"],
    codecSpeechEnhance.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td>${renderAudio(row.original)}</td><td>${renderAudio(row.mossformer)}</td><td>${renderAudio(row.codec)}</td></tr>`,
    ),
  );

  renderTable(
    "codec-voice-conversion",
    ["Sample", "Source", "Target Timbre", "Converted"],
    codecVoiceConversion.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td>${renderAudio(row.source)}</td><td>${renderAudio(row.target)}</td><td>${renderAudio(row.converted)}</td></tr>`,
    ),
  );

  renderTable(
    "tts-speech-clone",
    ["Sample", "Prompt", "Generated"],
    speechClone.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td>${renderAudio(row.prompt)}</td><td>${renderAudio(row.generated)}</td></tr>`,
    ),
  );

  renderTable(
    "tts-prosody-clone",
    ["Sample", "Prosody Prompt", "Timbre Prompt", "Generated"],
    prosodyClone.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td>${renderAudio(row.prosody)}</td><td>${renderAudio(row.timbre)}</td><td>${renderAudio(row.generated)}</td></tr>`,
    ),
  );

  renderTable(
    "tts-controllable-cloning",
    ["Sample", "Speaker", "Prompt", "Instruction Summary", "Text", "Generated"],
    controllableCloning.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td><span class="label-pill">${escapeHtml(row.speaker)}</span></td><td>${renderAudio(row.prompt)}</td><td class="text-cell">${renderLongText(row.instruction)}</td><td class="text-cell">${renderLongText(row.text)}</td><td>${renderAudio(row.generated)}</td></tr>`,
    ),
  );

  renderTable(
    "tts-timbre-generation",
    ["Sample", "Timbre Label", "Instruction Summary", "GT Reference", "Generated"],
    timbreGeneration.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td><span class="label-pill">${escapeHtml(row.label)}</span></td><td class="text-cell">${renderLongText(row.instruction)}</td><td>${renderAudio(row.reference)}</td><td>${renderAudio(row.generated)}</td></tr>`,
    ),
  );

  renderTable(
    "tts-instruct-following",
    ["Sample", "Instruction Summary", "Text", "Generated"],
    instructFollowing.map(
      (row) => `<tr><td class="sample-id">${row.id}</td><td class="text-cell">${renderLongText(row.instruction)}</td><td class="text-cell">${renderLongText(row.text)}</td><td>${renderAudio(row.generated)}</td></tr>`,
    ),
  );
}

function setupTabs() {
  document.querySelectorAll("[data-tabs]").forEach((group) => {
    group.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;
        group.querySelectorAll(".tab-button").forEach((item) => {
          item.classList.toggle("active", item === button);
        });
        group.querySelectorAll(".tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.panel === target);
        });
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

renderAllTables();
setupTabs();
setupAudioFocus();
