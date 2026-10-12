/* Sportsclub – scores, fixtures, standings and homepage ticker.
   ALL DATA BELOW IS FICTIONAL DEMO DATA (invented clubs, players and scores).
   Replace SC_MATCHES / SC_STANDINGS with a live sports API feed for real results. */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Demo teams ---------- */
  var T = {
    NGT: ["Northgate FC", "#1e6fd9"], RIV: ["Riverside United", "#d9381e"], HBC: ["Harbor City", "#2aa6c9"],
    IRB: ["Ironbridge Town", "#7a4bd1"], WVR: ["Westvale Rovers", "#1f9d55"], EFA: ["Eastfield Athletic", "#e08a00"],
    LKW: ["Lakeside Wanderers", "#c2185b"], SUM: ["Summit Albion", "#455a64"],
    CPK: ["Capital Kings", "#b8860b"], CST: ["Coastal Strikers", "#0d8aa6"], DSF: ["Desert Falcons", "#c25e00"],
    HLL: ["Highland Lions", "#2e7d32"], MTR: ["Metro Royals", "#6a1b9a"], VLY: ["Valley Hawks", "#1565c0"],
    BAY: ["Bayside Hawks", "#c62828"], SWL: ["Summit Wolves", "#37474f"], MTT: ["Metro Titans", "#1976d2"],
    HRK: ["Harbor Kings", "#ef6c00"], PRK: ["Parkview Rockets", "#ad1457"], CLD: ["Cloud City Flyers", "#00838f"],
    AMO: ["A. Moreau", "#3949ab"], LKO: ["L. Kowalski", "#00897b"], SNA: ["S. Nakamura", "#c62828"], DPE: ["D. Pereira", "#6d4c41"],
    RGA: ["R. Gallo", "#5e35b1"], TBE: ["T. Bergstrom", "#039be5"],
    LSM: ["Lakeshore Mariners", "#0277bd"], PSX: ["Prairie Sox", "#b71c1c"], CVT: ["Canyon Vultures", "#8d6e63"],
    GDS: ["Granite Dockers", "#546e7a"], OAK: ["Oakmont Owls", "#2e7d32"], RDG: ["Redrock Giants", "#e65100"]
  };
  function team(k) { return { k: k, n: T[k][0], c: T[k][1] }; }

  /* m(sport, competition, dayOffset, time, status, home, away, homeScore, awayScore, clock/note, venue, winner) */
  function m(sp, comp, day, time, st, h, a, hs, as, info, venue, win) {
    return { sp: sp, comp: comp, day: day, time: time, st: st, h: team(h), a: team(a), hs: hs, as: as, info: info || "", venue: venue, win: win || null };
  }
  var NPD = "Northern Premier Division", MCS = "Metro Cricket Series", CBL = "Continental Basketball League",
      HOP = "Harbor Open", GDL = "Grand Diamond League";

  var SC_MATCHES = [
    /* Today – live */
    m("football", NPD, 0, "19:30", "live", "NGT", "RIV", 2, 1, "67'", "Northgate Park"),
    m("football", NPD, 0, "20:00", "live", "HBC", "IRB", 0, 0, "34'", "Harbor Stadium"),
    m("cricket", MCS, 0, "14:00", "live", "CPK", "CST", "186/4", "—", "Over 31.2 · 1st Inns", "Capital Oval"),
    m("basketball", CBL, 0, "18:30", "live", "BAY", "SWL", 78, 74, "Q3 · 5:42", "Bayside Arena"),
    m("tennis", HOP, 0, "16:00", "live", "AMO", "LKO", 1, 1, "Set 3 · 4-3", "Centre Court"),
    m("baseball", GDL, 0, "17:05", "live", "LSM", "PSX", 3, 2, "Top 6th", "Lakeshore Field"),
    /* Today – upcoming */
    m("football", NPD, 0, "21:45", "upcoming", "WVR", "EFA", null, null, "", "Westvale Ground"),
    m("basketball", CBL, 0, "21:00", "upcoming", "MTT", "HRK", null, null, "", "Metro Dome"),
    m("cricket", MCS, 0, "19:00", "upcoming", "DSF", "HLL", null, null, "", "Desert Sands Ground"),
    m("baseball", GDL, 0, "20:10", "upcoming", "CVT", "GDS", null, null, "", "Canyon Park"),
    /* Today – completed */
    m("football", NPD, 0, "12:30", "completed", "LKW", "SUM", 1, 3, "FT", "Lakeside Road", "a"),
    m("tennis", HOP, 0, "11:00", "completed", "SNA", "DPE", 2, 0, "6-3, 6-4", "Court 2", "h"),
    /* Yesterday */
    m("football", NPD, -1, "17:00", "completed", "RIV", "WVR", 2, 2, "FT", "Riverside Park"),
    m("football", NPD, -1, "19:45", "completed", "IRB", "NGT", 0, 1, "FT", "Ironbridge Arena", "a"),
    m("cricket", MCS, -1, "14:00", "completed", "VLY", "MTR", "241/7", "238/9", "Valley Hawks won by 3 runs", "Valley Oval", "h"),
    m("basketball", CBL, -1, "20:00", "completed", "PRK", "CLD", 102, 97, "FT", "Parkview Centre", "h"),
    m("baseball", GDL, -1, "18:05", "completed", "OAK", "RDG", 4, 6, "Final", "Oakmont Park", "a"),
    /* Two days ago */
    m("football", NPD, -2, "15:00", "completed", "EFA", "HBC", 1, 1, "FT", "Eastfield Road"),
    m("basketball", CBL, -2, "19:30", "completed", "SWL", "MTT", 88, 91, "FT", "Summit Gym", "a"),
    m("tennis", HOP, -2, "13:00", "completed", "RGA", "TBE", 1, 2, "4-6, 6-3, 5-7", "Centre Court", "a"),
    m("cricket", MCS, -2, "14:00", "completed", "HLL", "CPK", "199/10", "201/5", "Capital Kings won by 5 wkts", "Highland Ground", "a"),
    /* Three days ago */
    m("football", NPD, -3, "16:30", "completed", "SUM", "NGT", 0, 2, "FT", "Summit Lane", "a"),
    m("baseball", GDL, -3, "19:05", "completed", "PSX", "CVT", 7, 1, "Final", "Prairie Park", "h"),
    m("basketball", CBL, -3, "20:30", "completed", "HRK", "BAY", 95, 99, "FT", "Harbor Hall", "a"),
    /* Tomorrow */
    m("football", NPD, 1, "15:00", "upcoming", "RIV", "LKW", null, null, "", "Riverside Park"),
    m("football", NPD, 1, "17:30", "upcoming", "SUM", "IRB", null, null, "", "Summit Lane"),
    m("cricket", MCS, 1, "14:00", "upcoming", "CST", "VLY", null, null, "", "Coastal Ground"),
    m("basketball", CBL, 1, "19:30", "upcoming", "CLD", "PRK", null, null, "", "Cloud City Arena"),
    m("tennis", HOP, 1, "12:00", "upcoming", "LKO", "SNA", null, null, "", "Centre Court"),
    m("baseball", GDL, 1, "18:05", "upcoming", "RDG", "LSM", null, null, "", "Redrock Stadium"),
    /* Day +2 */
    m("football", NPD, 2, "19:45", "upcoming", "HBC", "NGT", null, null, "", "Harbor Stadium"),
    m("basketball", CBL, 2, "20:00", "upcoming", "BAY", "HRK", null, null, "", "Bayside Arena"),
    m("cricket", MCS, 2, "14:00", "upcoming", "MTR", "DSF", null, null, "", "Metro Park"),
    m("tennis", HOP, 2, "14:30", "upcoming", "DPE", "AMO", null, null, "", "Court 1"),
    /* Day +3 */
    m("football", NPD, 3, "16:00", "upcoming", "WVR", "SUM", null, null, "", "Westvale Ground"),
    m("baseball", GDL, 3, "19:05", "upcoming", "GDS", "OAK", null, null, "", "Granite Field"),
    m("basketball", CBL, 3, "19:00", "upcoming", "SWL", "CLD", null, null, "", "Summit Gym")
  ];

  /* ---------- Demo standings ---------- */
  var SC_STANDINGS = {
    football: { title: "Northern Premier Division", cols: ["P", "W", "D", "L", "GD", "Pts"], form: true, rows: [
      ["NGT", 9, 7, 1, 1, "+13", 22, "WWDWW"], ["HBC", 9, 6, 2, 1, "+9", 20, "WDWWD"], ["RIV", 9, 5, 2, 2, "+6", 17, "DWLWW"],
      ["WVR", 9, 5, 1, 3, "+4", 16, "LWWDW"], ["EFA", 9, 3, 4, 2, "+1", 13, "DDWLD"], ["SUM", 9, 3, 2, 4, "-3", 11, "LLWDL"],
      ["IRB", 9, 2, 2, 5, "-7", 8, "LDLLW"], ["LKW", 9, 0, 2, 7, "-14", 2, "LLLDL"]] },
    basketball: { title: "Continental Basketball League", cols: ["P", "W", "L", "Pct", "Streak"], rows: [
      ["BAY", 12, 9, 3, ".750", "W3"], ["MTT", 12, 8, 4, ".667", "W1"], ["PRK", 12, 7, 5, ".583", "L1"],
      ["CLD", 12, 5, 7, ".417", "L2"], ["HRK", 12, 4, 8, ".333", "L1"], ["SWL", 12, 3, 9, ".250", "W1"]] },
    cricket: { title: "Metro Cricket Series", cols: ["P", "W", "L", "NR", "Pts"], rows: [
      ["CPK", 8, 6, 2, 0, 12], ["VLY", 8, 5, 3, 0, 10], ["DSF", 8, 4, 3, 1, 9],
      ["CST", 8, 3, 4, 1, 7], ["MTR", 8, 3, 5, 0, 6], ["HLL", 8, 2, 6, 0, 4]] },
    baseball: { title: "Grand Diamond League", cols: ["P", "W", "L", "Pct", "GB"], rows: [
      ["LSM", 20, 13, 7, ".650", "—"], ["PSX", 20, 12, 8, ".600", "1.0"], ["RDG", 20, 10, 10, ".500", "3.0"],
      ["OAK", 20, 9, 11, ".450", "4.0"], ["GDS", 20, 8, 12, ".400", "5.0"], ["CVT", 20, 8, 12, ".400", "5.0"]] },
    tennis: { title: "Harbor Open – Demo Rankings", cols: ["P", "W", "L", "Pts"], rows: [
      ["AMO", 6, 5, 1, 1200], ["LKO", 6, 4, 2, 950], ["SNA", 6, 4, 2, 880],
      ["DPE", 6, 3, 3, 640], ["TBE", 6, 2, 4, 410], ["RGA", 6, 1, 5, 260]] }
  };

  /* ---------- Helpers ---------- */
  var SPORT_LABEL = { football: "Football", cricket: "Cricket", basketball: "Basketball", tennis: "Tennis", baseball: "Baseball" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function addDays(n) { var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return d; }
  function dayLabel(n) { var d = addDays(n); return d.getDate() + " " + MONTHS[d.getMonth()]; }
  function initials(name) {
    var p = name.split(" ");
    return (p.length > 1 ? p[0][0] + p[1][0] : name.slice(0, 3)).toUpperCase();
  }
  function crest(t, cls) { return '<span class="crest ' + (cls || "") + '" style="--c:' + t.c + '" aria-hidden="true">' + (t.n.indexOf(".") > -1 ? t.n.replace(/[^A-Z]/g, "").slice(0, 2) : initials(t.n)) + "</span>"; }
  function statusBadge(x) {
    if (x.st === "live") return '<span class="live-badge">LIVE</span>';
    if (x.st === "upcoming") return '<span class="status-pill status-pill--upcoming">Upcoming</span>';
    return '<span class="status-pill">Full time</span>';
  }
  var icons = {
    pin: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    cal: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'
  };

  /* ---------- Renderers ---------- */
  function matchCard(x) {
    var live = x.st === "live";
    var score = function (v) { return v === null ? "–" : v; };
    var mid = x.st === "upcoming" ? x.time : (x.info || "");
    return '<article class="match-card' + (live ? " is-live" : "") + '" aria-label="' + x.h.n + " versus " + x.a.n + '">' +
      '<div class="match-card__top"><span>' + SPORT_LABEL[x.sp] + " · " + x.comp + "</span>" + statusBadge(x) + "</div>" +
      '<div class="match-card__teams">' +
      '<div class="mt' + (x.win === "h" ? " is-winner" : "") + '"><span class="mt__name">' + crest(x.h, "crest--lg") + "<span>" + x.h.n + '</span></span><span class="mt__score">' + score(x.hs) + "</span></div>" +
      '<div class="mt' + (x.win === "a" ? " is-winner" : "") + '"><span class="mt__name">' + crest(x.a, "crest--lg") + "<span>" + x.a.n + '</span></span><span class="mt__score">' + score(x.as) + "</span></div>" +
      "</div>" +
      '<div class="match-card__foot"><span>' + icons.clock + (x.st === "upcoming" ? "Kick-off " + mid + " (local)" : (mid || x.time)) + "</span>" +
      "<span>" + icons.pin + x.venue + "</span><span>" + icons.cal + dayLabel(x.day) + "</span></div></article>";
  }

  function tickCard(x) {
    var live = x.st === "live";
    var sc = function (v) { return v === null ? "–" : v; };
    return '<article class="tick-card">' +
      '<div class="tick-card__meta"><span>' + SPORT_LABEL[x.sp] + "</span>" +
      (live ? '<span class="live-badge">LIVE</span>' : '<span class="status-pill status-pill--upcoming">' + x.time + "</span>") + "</div>" +
      '<div class="tick-row"><span>' + crest(x.h) + "<span>" + x.h.n + '</span></span><span class="score">' + sc(x.hs) + "</span></div>" +
      '<div class="tick-row"><span>' + crest(x.a) + "<span>" + x.a.n + '</span></span><span class="score">' + sc(x.as) + "</span></div>" +
      "</article>";
  }

  function fixtureRow(x) {
    return '<article class="fixture">' +
      '<div class="fixture__info"><strong>' + dayLabel(x.day) + "</strong>" + x.time + " · " + SPORT_LABEL[x.sp] + "</div>" +
      '<div class="fixture__teams"><span class="fixture__team">' + crest(x.h) + x.h.n + '</span><span class="fixture__vs">VS</span><span class="fixture__team">' + crest(x.a) + x.a.n + "</span></div>" +
      '<div class="fixture__info"><strong>' + x.venue + "</strong>" + x.comp + "</div></article>";
  }

  /* ---------- Homepage ticker + fixtures ---------- */
  var homeTrack = $("[data-home-ticker]");
  if (homeTrack) {
    var tickerMatches = SC_MATCHES.filter(function (x) { return x.day === 0 && x.st !== "completed"; });
    homeTrack.innerHTML = tickerMatches.map(tickCard).join("");
  }
  var homeFix = $("[data-home-fixtures]");
  if (homeFix) {
    homeFix.innerHTML = SC_MATCHES.filter(function (x) { return x.st === "upcoming" && x.sp !== "tennis"; })
      .sort(function (a, b) { return a.day - b.day || a.time.localeCompare(b.time); })
      .slice(0, 5).map(fixtureRow).join("");
  }

  /* ---------- Scores page ---------- */
  var grid = $("#matchGrid");
  if (!grid) return;

  var state = { sport: "all", status: "all", day: 0 };
  var info = $("#resultInfo");

  function renderMatches() {
    var list = SC_MATCHES.filter(function (x) {
      return x.day === state.day &&
        (state.sport === "all" || x.sp === state.sport) &&
        (state.status === "all" || x.st === state.status);
    });
    var order = { live: 0, upcoming: 1, completed: 2 };
    list.sort(function (a, b) { return order[a.st] - order[b.st] || a.time.localeCompare(b.time); });
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><strong>No matches found</strong>Try another sport, status or date.</div>';
    } else {
      grid.innerHTML = list.map(matchCard).join("");
    }
    info.textContent = list.length + (list.length === 1 ? " match" : " matches") + " · " + dayLabel(state.day) +
      (state.sport !== "all" ? " · " + SPORT_LABEL[state.sport] : "") + (state.status !== "all" ? " · " + state.status : "");
  }

  function renderSide() {
    var sp = state.sport;
    var up = SC_MATCHES.filter(function (x) { return x.st === "upcoming" && x.day >= 0 && (sp === "all" || x.sp === sp); })
      .sort(function (a, b) { return a.day - b.day || a.time.localeCompare(b.time); }).slice(0, 6);
    $("#fixtureList").innerHTML = up.length ? up.map(fixtureRow).join("") : '<div class="empty-state">No upcoming fixtures for this sport.</div>';

    var res = SC_MATCHES.filter(function (x) { return x.st === "completed" && (sp === "all" || x.sp === sp); })
      .sort(function (a, b) { return b.day - a.day || b.time.localeCompare(a.time); }).slice(0, 6);
    $("#resultList").innerHTML = res.length ? res.map(function (x) {
      return '<div class="mini-row"><span>' + x.h.n + "</span><b>" + x.hs + " – " + x.as + "</b><span>" + x.a.n + "</span><small>" +
        dayLabel(x.day) + " · " + x.comp + "</small></div>";
    }).join("") : '<div class="empty-state">No recent results for this sport.</div>';
  }

  function renderTable() {
    var key = state.sport === "all" ? "football" : state.sport;
    var s = SC_STANDINGS[key];
    $("#tableTitle").textContent = s.title + " – demo standings";
    var head = "<tr><th>#</th><th>" + (key === "tennis" ? "Player" : "Team") + "</th>" +
      s.cols.map(function (c) { return "<th>" + c + "</th>"; }).join("") + (s.form ? "<th>Form</th>" : "") + "</tr>";
    var body = s.rows.map(function (r, i) {
      var t = team(r[0]);
      var stats = r.slice(1, 1 + s.cols.length);
      var last = s.cols.length - 1;
      var tds = stats.map(function (v, j) { return j === last && key !== "baseball" && key !== "basketball" ? "<td><strong>" + v + "</strong></td>" : "<td>" + v + "</td>"; }).join("");
      var form = s.form ? '<td><span class="form-dots" aria-label="Recent form ' + r[r.length - 1] + '">' +
        r[r.length - 1].split("").map(function (c) { return "<i class=\"" + c.toLowerCase() + "\"></i>"; }).join("") + "</span></td>" : "";
      return "<tr><td>" + (i + 1) + '</td><td><span class="team-cell">' + crest(t) + t.n + "</span></td>" + tds + form + "</tr>";
    }).join("");
    $("#standingsTable").innerHTML = "<thead>" + head + "</thead><tbody>" + body + "</tbody>";
  }

  function renderAll() { renderMatches(); renderSide(); renderTable(); }

  /* Sport tabs */
  $$("#sportTabs [role=tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$("#sportTabs [role=tab]").forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      state.sport = tab.dataset.sport;
      renderAll();
    });
  });
  /* Status tabs */
  $$("#statusTabs [role=tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$("#statusTabs [role=tab]").forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      state.status = tab.dataset.status;
      renderMatches();
    });
  });
  /* Arrow-key navigation inside tab lists */
  $$("[role=tablist]").forEach(function (list) {
    list.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var tabs = $$("[role=tab]", list), i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      n.focus(); n.click();
    });
  });

  /* Date strip */
  var strip = $("#dateStrip");
  var html = "";
  for (var d = -3; d <= 3; d++) {
    var dt = addDays(d);
    html += '<button type="button" class="date-btn" data-day="' + d + '" aria-pressed="' + (d === 0) + '">' +
      "<small>" + (d === 0 ? "Today" : DAYS[dt.getDay()]) + "</small><strong>" + dt.getDate() + "</strong><small>" + MONTHS[dt.getMonth()] + "</small></button>";
  }
  strip.innerHTML = html;
  $$(".date-btn", strip).forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$(".date-btn", strip).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      state.day = parseInt(btn.dataset.day, 10);
      renderMatches();
    });
  });

  renderAll();
})();
