const express = require("express");
const router = express.Router();
const Book = require('../models/CartModel')
const accountant = require('../models/AccountantModel')
const verifyUser = require("../midddleware/adminAuth");

router.post('/accountant/book/:id', verifyUser.verifyUser, function (req, res) {

    const accountantId = req.params.id
    const bookDays = req.body.bookDays
    const accountantCost = req.body.accountantCost
    const userId = req.userData._id

    accountant.findOne({ _id: accountantId })
        .then(function (data) {
            console.log(data)

            const accountantBook = new Book({
                accountantId: accountantId,
                bookDays: bookDays,
                accountantCost: accountantCost,
                userId: userId

            })
            accountantBook.save()
                .then(function () {
                    console.log("Done")

                    res.status(200).
                        json({ success: true, message: "Accountant Booked!!", })

                })
        })

        .catch(function (err) {
            console.log("Not done")

            res.status(500).json({ message: err, success: false })
            console.log(err)

        })

})
router.get('/book/all', verifyUser.verifyUser, function (req, res) {
    console.log(req.userData._id)

    Book.find({ userId: req.userData._id }).populate({ "path": "accountantId" }).then(function (info) {
        res.status(200).json({
            success: true,
            data:info
        })

        console.log(info)


    }).catch(function (err) {
        res.status(500).json({ error: err })
    })
})

router.delete('/hire/delete/:id',function(req,res){
    const id=req.params.id
    Book.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({success:true,message:"Deleted"})
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})


module.exports = router
