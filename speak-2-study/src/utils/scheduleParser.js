
const KNOWN_SUBJECTS = [
  "social science",
  "computer science",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "geography",
  "history",
  "english",
  "economics",
  "maths",
  "m1",
  "m2",
  "m3",
  "dm",
];

export function parseScheduleCommand(text) {
  const transcript = String(text || "").toLowerCase();

  return {
    topics: extractTopics(transcript),
    day: extractDay(transcript),
    time: extractTime(transcript),
    duration: extractDuration(transcript),
    range: extractTimeRange(transcript),
    period: extractPeriod(transcript)
  };
}

// ------------------ TOPIC EXTRACTION ------------------
function extractTopics(text) {
  let cleaned = text;

  // 1️⃣ Remove duration FIRST
  cleaned = cleaned.replace(/for\s+\d+\s+(hours?|minutes?|hrs?|mins?)/gi, " ");

  // 2️⃣ Remove time expressions like 10:00 am, 5pm
  cleaned = cleaned.replace(/\b\d{1,2}:\d{2}\s*(am|pm|a\.m\.|p\.m\.)?\b/gi, " ");

  // 3️⃣ Remove simple times like "10 am"
  cleaned = cleaned.replace(/\b\d{1,2}\s*(am|pm|a\.m\.|p\.m\.)\b/gi, " ");

  // 4️⃣ Remove broken AM/PM from mic (a m / p m)
  cleaned = cleaned.replace(/\ba\s*m\b/gi, " ");
  cleaned = cleaned.replace(/\bp\s*m\b/gi, " ");

  // 5️⃣ Remove standalone numbers (10, 5, 7:30 → 7)
  cleaned = cleaned.replace(/\b\d{1,2}(:\d{2})?\b/g, " ");

  // 6️⃣ Remove day names
  cleaned = cleaned.replace(
    /\btoday|tomorrow|tonight|monday|tuesday|wednesday|thursday|friday|saturday|sunday\b/gi,
    " "
  );

  // 7️⃣ Remove period words BEFORE topics ("in the morning")
  cleaned = cleaned.replace(/\bin the morning\b/gi, " ");
  cleaned = cleaned.replace(/\bin the evening\b/gi, " ");
  cleaned = cleaned.replace(/\bin the afternoon\b/gi, " ");
  cleaned = cleaned.replace(/\bin the night\b/gi, " ");
  cleaned = cleaned.replace(/\bmorning|evening|night|afternoon\b/gi, " ");

  // 8️⃣ Remove filler words
  cleaned = cleaned.replace(
   /i want to|i need to|study|learn|about|schedule|add|please|can you|to|at|in|the|from/gi,
    " "
  );

  // 9️⃣ Fix broken "maths" (m hs → maths)
  cleaned = cleaned.replace(/\bm\s*hs\b/gi, "maths");

  // 🔟 Clean punctuation
  cleaned = cleaned.replace(/[.,]/g, " ");

  // 1️⃣1️⃣ Clean spacing
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  // 1️⃣2️⃣ Split into pieces
  const rawParts = cleaned.split(/ and | also | then |,/gi);

  // 1️⃣3️⃣ Split into words & filter small junk
  const topicWords = rawParts
    .flatMap(part => part.trim().split(" "))
    .filter(w => w.length > 2);

  return topicWords;
}
 



// ------------------ DAY EXTRACTION ------------------

function extractDay(text) {
  const keywords = [
    "today", "tomorrow", "tonight",
    "monday","tuesday","wednesday","thursday","friday","saturday","sunday",
    "every day","daily",
    "every monday","every tuesday","every wednesday","every thursday","every friday"
  ];

  return keywords.find(day => text.includes(day)) || null;
}

// ------------------ TIME (single) ------------------

function extractTime(text) {
  const regex =
    /\b\d{1,2}(:\d{2})?\s*(a\.?m\.?|p\.?m\.?|am|pm|a m|p m)\b/i;

  const match = text.match(regex);
  return match ? match[0].replace(/\s+/g, "") : null; 
}


// ------------------ TIME RANGE ------------------

function extractTimeRange(text) {
  const rangeRegex =
    /(?:from\s*)?(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?|am|pm|a m|p m)?)\s*(?:to|-)\s*(\d{1,2}(?::\d{2})?\s*(?:a\.?m\.?|p\.?m\.?|am|pm|a m|p m)?)/i;

  const match = text.match(rangeRegex);

  if (!match) return null;

  const start = match[1].replace(/\s+/g, "");
  const end = match[2].replace(/\s+/g, "");

  return { start, end };
}

// ------------------ DURATION ------------------

function extractDuration(text) {
  const regex = /for\s(\d+)\s?(hours?|minutes?|hrs?|mins?)/;
  const match = text.match(regex);

  return match
    ? { value: Number(match[1]), unit: match[2] }
    : null;
}

// ------------------ PERIOD (morning / evening) ------------------

function extractPeriod(text) {
  if (text.includes("morning")) return "morning";
  if (text.includes("afternoon")) return "afternoon";
  if (text.includes("evening")) return "evening";
  if (text.includes("night")) return "night";
  return null;
}


