const app = require("./server");
const port = process.env.PORT || 5000
const db = require('./db/database')

db(() =>
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
);