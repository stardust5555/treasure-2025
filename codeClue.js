const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("treasure.db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS treasure_encoded");

  //ERROR: Should be NOT EXISTS
  db.run(`
    CREATE TABLE IF NOT EXISTS treasure_encoded (
      id INTEGER PRIMARY KEY,
      encoded_line TEXT
    )
  `);

  const encodedLines = [
    "fHx8fHx8ICAgfHwgIA==",
    "ICAgICB8fCAgfHwgIA==",
    "ICAgfHx8ICAgfHw=",
    "ICB8fCAgICAgfHwgIA==",
    "ICB8fCAgICAgfHwgIA==",
  ];

  encodedLines.forEach((line, i) => {
    db.run("INSERT INTO treasure_encoded (id, encoded_line) VALUES (?, ?)", [
      i + 1,
      line,
    ]);
  });

  //ERROR: encode when it should be "encoded"
  db.all(
    "SELECT encoded_line FROM treasure_encoded ORDER BY id ASC",
    (err, rows) => {
      if (err) {
        console.log("Error fetching lines:", err.message);
      } else {
        console.log('The number for the green boxes is...');
        rows.forEach((row) => {
          //ERROR: rows when it should be rows
          const decoded = Buffer.from(row.encoded_line, "base64").toString(
            "utf-8"
          );
          console.log(decoded);
        });
      }
    }
  );
});
