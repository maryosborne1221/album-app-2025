const daoCommon = require('./common/daoCommon')

const albumDao = {
    ...daoCommon,
    ...require('./common/api/albumDao')
}

const artistDao = {
    ...daoCommon,
    ...require('./common/api/artistDao')
}

const bandDao = {
    ...daoCommon,
    ...require('./common/api/bandDao')
}

const labelDao = {
    ...daoCommon,
    ...require('./common/api/labelDao')
}

module.exports = {
    albumDao,
    artistDao,
    bandDao,
    labelDao
}