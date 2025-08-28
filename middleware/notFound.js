const {StatusCodes} = require('http-status-codes')

const notFound = (req,res,next)=>{
    res.status(StatusCodes.NOT_FOUND).json({msg:"not a valid route"})
}

module.exports =  notFound