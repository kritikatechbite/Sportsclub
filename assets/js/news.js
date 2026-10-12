/* Sportsclub – news listing: filters, search, load more, article detail view.
   Articles are SAMPLE EDITORIAL CONTENT (evergreen explainers), not real-time news. */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var CAT = { football: "Football", cricket: "Cricket", basketball: "Basketball", tennis: "Tennis", baseball: "Baseball", "formula-1": "Formula 1" };
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function A(id, cat, ago, mins, img, title, summary, body) {
    return { id: id, cat: cat, ago: ago, mins: mins, img: img, title: title, summary: summary, body: body };
  }

  var ARTICLES = [
    A("a1", "football", 0, 6, "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=75", "Pressing, Patience and Possession: How Modern Football Tactics Keep Evolving",
      "From high presses to patient build-up play, a plain-English look at the ideas shaping how top teams attack and defend.",
      ["Walk into any modern training ground and you will hear the same words: shape, spacing, triggers. The best teams no longer treat pressing and possession as opposites. They treat them as two halves of one plan, where winning the ball high up the pitch creates the chances and keeping it calmly creates the control.",
       "A pressing trigger is a cue – a slow back-pass, a poor first touch, a goalkeeper under pressure – that tells a team to swarm forward together. Done well, it turns defenders into attackers within seconds. Done badly, it leaves huge gaps behind the midfield, which is why coaches rehearse these moments relentlessly.",
       "On the ball, patience matters just as much. Teams build through short passes to pull opponents out of position, then switch play quickly to the space that opens up. The result is a game of patterns rather than chaos – and once you learn to spot them, watching a match becomes a lot more rewarding."]),
    A("a2", "cricket", 1, 5, "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=75", "T20 Powerplay Explained: Why the First Six Overs Decide So Many Matches",
      "Fielding restrictions reshape every T20 innings. Here is how batters and bowlers attack the powerplay.",
      ["In T20 cricket, only two fielders are allowed outside the 30-yard circle during the first six overs. That single rule changes everything: boundaries become easier to find, and bowlers who can take early wickets suddenly become the most valuable players in the team.",
       "Batting sides often aim to score a little over eight an over in the powerplay while keeping wickets in hand. Bowling sides try the opposite – hit good lengths, move the new ball, and force mistakes before the field spreads. It is a small window with an outsized effect on the final total."]),
    A("a3", "basketball", 1, 4, "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=75", "Reading a Box Score in Two Minutes: The Numbers That Actually Matter",
      "Points are only the start. Learn which basketball stats tell you who really controlled the game.",
      ["A box score can look like a wall of numbers, but a few columns do most of the talking. Shooting efficiency tells you whether points were earned cheaply or expensively. Turnovers show who gave possessions away. Rebounds, especially offensive ones, reveal who created second chances.",
       "Next time you open one, start with team field-goal percentage, then compare turnovers and free-throw attempts. Together they explain most close results – and they often explain them better than the final score does."]),
    A("a4", "tennis", 2, 5, "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=75", "Clay, Grass or Hard? How Court Surface Shapes Every Rally",
      "Bounce, speed and sliding – why the same player can look unbeatable on one surface and ordinary on another.",
      ["Court surface changes how the ball behaves after it lands. Clay slows the ball and produces a high, kicking bounce, which rewards patience, heavy topspin and fitness. Grass does the opposite: the ball skids low and fast, which favours big serves and aggressive net play.",
       "Hard courts sit in between and vary widely depending on how the surface is built. That variety is why tennis fans talk about a player's 'best surface' – movement, spin and timing are all tuned to a particular kind of bounce."]),
    A("a5", "baseball", 3, 4, "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=800&q=75", "The Count Matters: Why 3-2 Is Baseball's Most Tense Moment",
      "Balls, strikes and strategy: how the count changes what pitchers throw and what batters look for.",
      ["Every plate appearance is a small negotiation, and the count is the scoreboard of that negotiation. At 2-0 the batter can sit on a fastball in a favourite zone. At 0-2 the pitcher has room to waste a pitch and chase a swing. At 3-2 neither side can afford a mistake.",
       "Understanding the count is the easiest way to follow baseball more closely. Once you see why a pitcher suddenly throws a curveball at 1-2, the game stops looking slow and starts looking like chess played at 90 miles an hour."]),
    A("a6", "formula-1", 3, 6, "https://images.unsplash.com/photo-1504817343863-5092a923803e?auto=format&fit=crop&w=800&q=75", "Tyres, Strategy and Timing: The Hidden Chess Match of a Grand Prix",
      "Why the fastest car does not always win, and how pit-stop timing can swing a race.",
      ["A Grand Prix is decided as much on the pit wall as on the track. Teams choose between softer tyres that are quick but wear out, and harder tyres that last longer but give up lap time. The right mix depends on temperature, track surface and traffic.",
       "The 'undercut' is a classic move: pit one lap earlier than a rival, use fresh tyres to set quick laps, and emerge ahead when they stop. Safety cars scramble the plan completely, which is why strategists prepare several options before the lights go out."]),
    A("a7", "football", 4, 5, "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=75", "A Beginner's Guide to Football Formations: 4-3-3 vs 3-5-2",
      "What the numbers mean, and how different shapes change a team's strengths and weaknesses.",
      ["Formations list players from defence to attack, so 4-3-3 means four defenders, three midfielders and three forwards. It is a starting shape rather than a fixed position – players move constantly depending on whether their team has the ball.",
       "A 4-3-3 tends to give width through its wingers and a strong central midfield trio. A 3-5-2 packs the middle, relies on wing-backs for width and keeps two strikers close together. Neither is better; each simply asks different questions of the opposition."]),
    A("a8", "cricket", 5, 5, "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=75", "Spin vs Swing: How Pitch Conditions Change a Test Match",
      "Dry surfaces turn the ball; overcast skies make it swing. A short guide to reading conditions.",
      ["Cricket pitches change over five days. On day one a hard, grassy surface often helps fast bowlers. As the pitch wears, cracks and rough patches appear, and spinners begin to find sharp turn and uneven bounce.",
       "Overhead conditions matter too. Cloud cover and humidity help the ball swing through the air, which is why captains talk so much about the toss. Choosing to bat or bowl first is really a bet on how the surface will behave later on."]),
    A("a9", "basketball", 6, 4, "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=75", "The Rise of the Three-Pointer: How Shot Selection Changed the Game",
      "Why modern teams hunt corner threes and layups – and skip the long two-pointer.",
      ["Basketball analysts noticed something simple: a three-point shot is worth fifty per cent more than a two. Even at a lower success rate, a good three-point shooter can produce more points per attempt than a mid-range specialist.",
       "That idea has reshaped lineups. Big players now stretch the floor, guards attack the rim or look for open threes, and the mid-range jumper has become the exception rather than the rule."]),
    A("a10", "tennis", 7, 4, "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=75", "Serve and Volley's Quiet Comeback: Can Net Play Return?",
      "Baseline rallies dominate, but smart players are mixing in net rushes to disrupt rhythm.",
      ["Modern rackets and strings let players hit heavy topspin from the baseline, which makes serve-and-volley harder than it used to be. Yet occasional net approaches can still be powerful because they shorten the time an opponent has to react.",
       "Used sparingly, a surprise volley breaks the pattern of a long rally and forces a passing shot under pressure. Many coaches now teach net play as a tactical option, not a lost art."]),
    A("a11", "baseball", 8, 4, "https://images.unsplash.com/photo-1508163223045-1880bc3cbf1c?auto=format&fit=crop&w=800&q=75", "Pitch Clocks and Pace of Play: What Faster Games Mean for Fans",
      "Shorter games, more action – and the trade-offs leagues weigh when they change timing rules.",
      ["Pitch clocks limit how long a pitcher can wait between deliveries. The aim is simple: reduce idle time so that more of the game is spent in action. Supporters say it keeps younger fans engaged; critics worry about fatigue and lost strategy.",
       "Whatever your view, the experiment shows how much a small rule can change the feel of a sport. Game length, crowd energy and even pitching tactics all shift when the rhythm changes."]),
    A("a12", "formula-1", 9, 5, "https://images.unsplash.com/photo-1541773367336-d3f9b1f38dd8?auto=format&fit=crop&w=800&q=75", "DRS, Slipstreams and Overtaking: How Cars Pass on Track",
      "A short guide to the tools drivers use to close gaps and make clean moves.",
      ["Following another car closely disturbs the airflow over your own, which reduces downforce and makes cornering harder. Drivers use the slipstream on long straights to gain speed, then brake late to complete a move.",
       "A drag-reduction system, where allowed, opens a flap on the rear wing to cut drag for a following car. Combined with good exits from the previous corner, it creates the best overtaking chances of the lap."]),
    A("a13", "football", 10, 4, "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=75", "Set-Piece Specialists: The Small Details That Win Tight Matches",
      "Corners, free kicks and throw-ins are rehearsed more than ever. Here is why they matter.",
      ["In tight games a single set piece can be decisive, so coaches treat them as separate mini-games. Teams rehearse blocking runs, decoy movements and delivery zones until every player knows exactly where to be.",
       "Defenders have their own routines too – zonal marking, man-marking or a hybrid. Watching a corner closely, you can often see the plan unfold in the first two seconds."]),
    A("a14", "cricket", 11, 5, "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=75", "Understanding DRS in Cricket: Ball Tracking, Snicko and Umpire's Call",
      "How the Decision Review System works and why 'umpire's call' confuses so many viewers.",
      ["The Decision Review System lets teams challenge on-field decisions using technology such as ball tracking and edge detection. Reviews are limited, so captains must weigh each challenge carefully.",
       "'Umpire's call' applies when the ball is only clipping the stumps. Because tracking has a margin of error, the original decision stands. It feels odd at first, but it protects umpires from being overturned on the thinnest of margins."]),
    A("a15", "basketball", 12, 4, "https://images.unsplash.com/photo-1504450758481-7338eef7ccf8?auto=format&fit=crop&w=800&q=75", "Pick-and-Roll Basics: The Play Every Team Runs",
      "One screen, two players, and a dozen possible outcomes – the simplest play in basketball is never simple.",
      ["The pick-and-roll starts with one player setting a screen for the ball handler. The defence must decide: switch, fight through, or drop back. Each choice opens a different option for the offence.",
       "The ball handler can shoot, pass to the rolling big man, or kick out to a shooter. Great teams read the defence in real time and choose the option the defenders are least ready for."]),
    A("a16", "football", 13, 5, "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=75", "Fan Culture Around the World: Songs, Scarves and Matchday Rituals",
      "Why a stadium full of supporters is part of the sport itself.",
      ["From drum-led chants to choreographed banners, supporters shape the atmosphere of a match. Rituals – a pre-game walk, a favourite pub, a lucky scarf – turn ordinary fixtures into shared traditions passed between generations.",
       "These customs differ from country to country, but the feeling is universal: belonging to something bigger than yourself, even if only for ninety minutes."]),
    A("a17", "tennis", 14, 4, "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=75", "Mental Game: How Players Reset Between Points",
      "Towels, routines and deep breaths – the small habits that protect focus under pressure.",
      ["Tennis gives players about twenty-five seconds between points, and top competitors use every one of them. Many follow a set routine: a glance at the strings, a breath, a plan for the next serve.",
       "These rituals are not superstition. They help players let go of the last point and commit to the next one, which is often the difference between a comeback and a collapse."]),
    A("a18", "formula-1", 15, 5, "https://images.unsplash.com/photo-1532906619279-a4b7267faa66?auto=format&fit=crop&w=800&q=75", "Why Qualifying Position Matters So Much on Narrow Circuits",
      "On tight tracks, starting at the front can be worth more than raw race pace.",
      ["Some circuits offer very few places to pass. On those tracks the fastest lap on Saturday can matter more than the fastest car on Sunday, because a driver who starts in front controls the pace and the pit-stop timing.",
       "That is why teams spend so much effort on one-lap performance: tyre warm-up, fuel load and track evolution all come together in a few minutes of qualifying."]),
    A("a19", "baseball", 16, 4, "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?auto=format&fit=crop&w=800&q=75", "Bullpens and Matchups: How Managers Plan the Late Innings",
      "Why relief pitchers are used in specific situations and what that means for the final score.",
      ["Late in a close game, managers often choose relief pitchers based on matchups: a left-handed specialist against a left-handed hitter, or a power arm with a runner on third. Each choice is a calculated gamble.",
       "Bullpen depth has become a major part of roster building. A team with several reliable relievers can protect narrow leads and shorten the game for starting pitchers."]),
    A("a20", "cricket", 17, 4, "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=75", "Fielding Positions Explained: Slips, Gully, Point and Beyond",
      "A friendly map of cricket's unusual field names and what each position is there to do.",
      ["Cricket's field has colourful names for a reason: each describes a specific job. Slips and gully catch edges off the bat. Point and cover stop drives on the off side. Fine leg and square leg guard against shots played behind the batter.",
       "Captains adjust the field constantly to match the bowler's plan. A packed slip cordon says 'we are attacking'; fielders spread to the boundary say 'we are defending runs'."])
  ];
  var TRENDING = ["a2", "a6", "a1", "a9", "a4"];

  function fmtDate(ago) {
    var d = new Date(); d.setDate(d.getDate() - ago);
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }
  function byId(id) { return ARTICLES.filter(function (a) { return a.id === id; })[0]; }

  /* ---------- Article detail modal (works on any page that links news.html#aN) ---------- */
  var modal = $("#articleModal");
  var lastFocus = null;
  function openArticle(id, push) {
    var a = byId(id);
    if (!a || !modal) return;
    lastFocus = document.activeElement;
    $("#modalImg").src = a.img.replace("w=800", "w=1200");
    $("#modalImg").alt = a.title;
    $("#modalTag").textContent = CAT[a.cat];
    $("#modalMeta").textContent = fmtDate(a.ago) + " · " + a.mins + " min read";
    $("#modalTitle").textContent = a.title;
    $("#modalBody").innerHTML = "<p><strong>" + a.summary + "</strong></p>" + a.body.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
    if (push && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  }
  function closeArticle() {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (modal) {
    $(".modal__close", modal).addEventListener("click", closeArticle);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeArticle(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeArticle();
      if (e.key === "Tab" && modal.classList.contains("is-open")) {
        /* keep focus inside the dialog */
        var f = $$("a[href], button", modal);
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("hashchange", function () {
      var id = location.hash.slice(1);
      if (byId(id)) openArticle(id, false); else closeArticle();
    });
  }

  var grid = $("#newsGrid");
  if (!grid) { if (modal && byId(location.hash.slice(1))) openArticle(location.hash.slice(1), false); return; }

  /* ---------- Listing ---------- */
  var PAGE = 9, STEP = 6;
  var params = new URLSearchParams(location.search);
  var state = { cat: CAT[params.get("cat")] ? params.get("cat") : "all", q: (params.get("q") || "").trim(), shown: PAGE };
  var searchInput = $("#newsSearch");
  var loadBtn = $("#loadMore");
  var info = $("#newsInfo");

  function matches() {
    var q = state.q.toLowerCase();
    return ARTICLES.filter(function (a) {
      if (state.cat !== "all" && a.cat !== state.cat) return false;
      if (state.cat === "all" && !q && a.id === "a1") return false; /* shown as featured story */
      if (!q) return true;
      return (a.title + " " + a.summary + " " + CAT[a.cat] + " " + a.body.join(" ")).toLowerCase().indexOf(q) > -1;
    });
  }

  function card(a) {
    return '<article class="card"><a class="card__media" href="#' + a.id + '" data-article="' + a.id + '" tabindex="-1" aria-hidden="true">' +
      '<img src="' + a.img + '" alt="" loading="lazy" width="800" height="500"><span class="tag">' + CAT[a.cat] + "</span></a>" +
      '<div class="card__body"><h3><a href="#' + a.id + '" data-article="' + a.id + '">' + a.title + "</a></h3><p>" + a.summary + "</p>" +
      '<div class="card__meta"><span>' + fmtDate(a.ago) + "</span><span>·</span><span>" + a.mins + " min read</span></div></div></article>";
  }

  function render() {
    var list = matches();
    var visible = list.slice(0, state.shown);
    grid.innerHTML = visible.length ? visible.map(card).join("") :
      '<div class="empty-state" style="grid-column:1/-1"><strong>No articles found</strong>Try a different keyword or choose another sport.</div>';
    info.textContent = list.length ? "Showing " + visible.length + " of " + list.length + " article" + (list.length === 1 ? "" : "s") +
      (state.q ? ' for "' + state.q + '"' : "") : "";
    var remaining = list.length - visible.length;
    loadBtn.parentNode.classList.toggle("hidden", remaining <= 0);
    if (remaining > 0) loadBtn.querySelector("span").textContent = "Load more (" + remaining + " left)";
  }

  $$("#newsTabs [role=tab]").forEach(function (tab) {
    if (tab.dataset.cat === state.cat) tab.setAttribute("aria-selected", "true"); else tab.setAttribute("aria-selected", "false");
    tab.addEventListener("click", function () {
      $$("#newsTabs [role=tab]").forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      state.cat = tab.dataset.cat; state.shown = PAGE; render();
    });
  });
  searchInput.value = state.q;
  var timer;
  searchInput.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { state.q = searchInput.value.trim(); state.shown = PAGE; render(); }, 150);
  });
  $("#newsSearchForm").addEventListener("submit", function (e) { e.preventDefault(); state.q = searchInput.value.trim(); state.shown = PAGE; render(); });
  loadBtn.addEventListener("click", function () { state.shown += STEP; render(); });

  /* Open article links (cards, featured story, sidebar) */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-article]");
    if (!link) return;
    e.preventDefault();
    openArticle(link.dataset.article, true);
  });

  /* Trending sidebar */
  $("#trendingList").innerHTML = TRENDING.map(function (id, i) {
    var a = byId(id);
    return '<li><a href="#' + a.id + '" data-article="' + a.id + '"><span class="num">' + (i + 1) + "</span><div><h3>" + a.title +
      "</h3><small>" + CAT[a.cat] + " · " + fmtDate(a.ago) + "</small></div></a></li>";
  }).join("");

  render();
  if (byId(location.hash.slice(1))) openArticle(location.hash.slice(1), false);
})();
