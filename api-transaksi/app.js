const { app } = require("./config")
const logger = require("pino")(app.logger)

const fastify = require("fastify")({logger, trustProxy: app.trushProxy})

require("./core/plugins")(fastify)
require("./core/logging")(fastify, logger)
require("./core/database")()
require("./core/responses")(fastify)

fastify.get("/", async () => ({Welcome : "API-TRANSAKSI WORLD"}))

//Route
fastify.register(require("./modules/midtrans/midtrans.route"))
fastify.register(require("./modules/transaksi/transaksi.route"))

const start = async () => {
    try {
        await fastify.listen(app.port, "0.0.0.0")
        console.log(`Run localhost:${app.port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()