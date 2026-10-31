const DATA_URL = `./data/data.json?v=${Date.now()}`;

const money = new Intl.NumberFormat("ko-KR");

function grade(amount) {
  if (amount >= 3_000_000) return "S CLASS";
  if (amount >= 1_000_000) return "A CLASS";
  if (amount >= 500_000) return "B CLASS";
  return "C CLASS";
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDate(value) {
  if (!value) return "-";
  const parts = value.split("-");
  if (parts.length !== 3) return value;
  return `${parts[0]}.${parts[1]}.${parts[2]}`;
}

function renderRoyal(items) {
  const list = document.querySelector("#royalList");
  list.replaceChildren();

  if (!items.length) {
    list.append(el("div", "empty", "등록된 데이터가 없습니다."));
    return;
  }

  items.forEach((item, index) => {
    const row = el("article", "case-row");

    const rank = el("div", "rank", `#${index + 1}`);
    const name = el("div", "name", item.name);
    const date = el("div", "date", formatDate(item.damageDate));
    const loss = el("div", "loss", `${money.format(item.amount)}원`);

    const currentGrade = grade(item.amount);
    const gradeWrap = el("div");
    gradeWrap.append(
      el(
        "span",
        `grade ${currentGrade === "S CLASS" ? "grade--s" : ""}`,
        currentGrade
      )
    );

    const note = el("div", "note", item.story || "-");

    row.append(rank, name, date, loss, gradeWrap, note);
    list.append(row);
  });
}

function renderContacts(items) {
  const list = document.querySelector("#contactList");
  list.replaceChildren();

  if (!items?.length) {
    list.append(el("div", "empty", "등록된 접촉 사례가 없습니다."));
    return;
  }

  const sorted = [...items].sort((a, b) =>
    String(b.contactDate || "").localeCompare(String(a.contactDate || ""))
  );

  sorted.forEach((item) => {
    const card = el("article", "contact-card");

    const nameField = el("div", "contact-card__field");
    nameField.append(
      el("span", "", "이름"),
      el("strong", "", item.name || "-")
    );

    const dateField = el("div", "contact-card__field");
    dateField.append(
      el("span", "", "연락일자"),
      el("strong", "", formatDate(item.contactDate))
    );

    const methodField = el("div", "contact-card__field");
    methodField.append(el("span", "", "연락수단"));
    methodField.append(el("span", "contact-badge", item.contactMethod || "기타"));

    const summaryField = el("div", "contact-card__field contact-card__field--summary");
    summaryField.append(
      el("span", "", "내용 요약"),
      el("p", "", item.summary || "-")
    );

    card.append(nameField, dateField, methodField, summaryField);
    list.append(card);
  });
}

function renderPoor(items) {
  const list = document.querySelector("#seopseopList");
  list.replaceChildren();

  if (!items?.length) {
    list.append(el("div", "empty", "등록된 데이터가 없습니다."));
    return;
  }

  items.forEach((item) => {
    const card = el("article", "poor-card");
    const stamp = el("span", "poor-card__stamp", "OFFICIAL");
    const name = el("strong", "poor-card__name", item.name);
    const story = el("p", "poor-card__story", item.story || "-");

    card.append(stamp, name, story);
    list.append(card);
  });
}

async function init() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    const royal = [...(data.claims || data.royalClub || [])]
      .map(item => ({ ...item, amount: Number(item.amount) || 0 }))
      .sort((a, b) => b.amount - a.amount);

    const total = royal.reduce((sum, item) => sum + item.amount, 0);

    document.querySelector("#totalCases").textContent = royal.length;
    document.querySelector("#totalAmount").textContent = money.format(total);
    document.querySelector("#updatedAt").textContent = formatDate(data.updatedAt);
    document.querySelector("#footerUpdated").textContent =
      `UPDATED ${formatDate(data.updatedAt)}`;

    const kakaoButton = document.querySelector("#kakaoChatButton");
    const kakaoUrl = String(data.kakaoChatUrl || "").trim();

    if (kakaoUrl && kakaoUrl !== "#" && !kakaoUrl.includes("REPLACE_ME")) {
      kakaoButton.href = kakaoUrl;
      kakaoButton.classList.remove("is-disabled");
      kakaoButton.removeAttribute("aria-disabled");
    } else {
      kakaoButton.href = "#";
      kakaoButton.classList.add("is-disabled");
      kakaoButton.setAttribute("aria-disabled", "true");
    }

    renderRoyal(royal);
    renderContacts(data.contacts || []);
    renderPoor(data.seopseopClub || []);
  } catch (error) {
    console.error(error);
    document.querySelector("#royalList").append(
      el("div", "empty", "data/data.json 파일을 불러오지 못했습니다.")
    );
  }
}

init();
