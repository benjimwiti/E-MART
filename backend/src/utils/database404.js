export function handleDB404(DBres, res) {
    if (!DBres) {
        console.log('data not present in mongoDB')
        res.status(404)
            .json({
                message: `data not present in mongoDB`
            })
    } else {
        return
    }
}