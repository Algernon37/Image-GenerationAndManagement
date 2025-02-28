const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE images (id INTEGER PRIMARY KEY, prompt TEXT, userId TEXT, imageUrl TEXT, timestamp TEXT)');
});

const storeImageMetadata = ({ prompt, userId, imageUrl, timestamp }) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('INSERT INTO images (prompt, userId, imageUrl, timestamp) VALUES (?, ?, ?, ?)');
        stmt.run(prompt, userId, imageUrl, timestamp, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
        stmt.finalize();
    });
};

const getUserImages = (userId) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT imageUrl, prompt, timestamp FROM images WHERE userId = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { storeImageMetadata, getUserImages };
