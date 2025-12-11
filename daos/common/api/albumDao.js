const con = require('../../../config/dbconfig')
const { queryAction } = require('../../../helpers/queryAction')

const albumDao = {

    table: 'album',

    findAlbumInfo: (res, table)=> {

        const sql = `SELECT al.album_id, al.title, al.artist_id, al.band_id, al.label_id, al.yr_released,
        CASE 
             WHEN ar.fName IS NULL THEN ''
             ELSE ar.fName
             END fName,
        CASE 
            WHEN ar.lName IS NULL THEN ''
            ELSE ar.lName 
            END lName,
        CASE
            WHEN b.band IS NULL THEN ''
            ELSE b.band
            END band,
        l.label
        FROM album al
        LEFT OUTER JOIN artist ar USING (artist_id)
        LEFT OUTER JOIN band b USING (band_id)
        JOIN label l USING (label_id)
        ORDER BY al.album_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
           }
        )
    },


    findAlbumsByArtistId: (res, table, id)=> {

        const sql = `SELECT title, album_id, yr_released FROM ${table} WHERE 
          artist_id = ${id};`

      con.query(
        sql,
        (error, rows)=> {
            queryAction(res, error, rows, table)
        } 
    ) 
},

createAlbum: (req, res, table)=> {

    //capture fName, lName, band, and label
    const fName = req.body.fName
    const lName = req.body.lName
    const band = req.body.band
    const label = req.body.label


    //need an object that will hold data to be added to album table
    let albumInfo = {
        title: req.body.title,
        artist_id: null,
        band_id: null,
        label_id: null,
        yr_released: req.body.yr_released
    }

    //check to see if artist is already in table. If so, return the artist_id; if not, add the artist and return artist_id
    const artistId = con.execute(
        `SELECT * FROM artist;`,
        (error, rows)=> {
            let artist //going to be an object
            let id
            if (!error) {
               if (fName != null || lName != null) {
                artist = rows.find(row => row.fName == fName && row.lName == lName)
                if (artist == undefined) { // no match; insert data}
                    con.execute(
                        `INSERT INTO artist SET fName = "${fName}", lName = "${lName}";`,
                        (error, dbres)=> {
                            if (!error) {
                                id = dbres.insertId
                                return id
                            } else {
                                console.log(error)

                            }    

                        }

                   )
                } else {
                    return artist.artist_id
                } 
            } else {
                return
            }
        } else {
            console.log(error)
        }
   }
)

console.log(artistId)
albumInfo.artist_id = artistId

 res.json(albumInfo)


}

}



module.exports = albumDao