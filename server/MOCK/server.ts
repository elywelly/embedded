import database from './database'
import makeApp from './app'

const app = makeApp(database)

app.listen(5000, () => console.log("listening on port 5000"))