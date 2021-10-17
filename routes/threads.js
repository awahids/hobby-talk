const express = require('express')
const router = express.Router()
const thread = require('../controllers/threads')
const { authToken } = require('../middlewares/auth')
const cloudUpload = require('../middlewares/cloudUpload')
const ThreadsCategory = require('../controllers/ThreadCategory')

router.post('/create', authToken, cloudUpload('image'), thread.createThreads)
router.get('/oldest', thread.readAllThreads)
router.get('/search/:keyword', thread.searchThreads)
router.put('/edit/:id', authToken, thread.updateThreads)
router.delete('/delete/:id', authToken, thread.deleteThreads)
router.get('/get/:id', thread.getOneThread)
router.get('/newest', thread.getThreadNewest)
router.get('/more/:userId/:threadId', thread.moreFromUser)
router.get('/trending', thread.getThreadTrending)
router.get('/mostpopular', thread.getThreadMostPopular)
router.get('/mightlike', authToken, thread.mightLike)
router.get('/hot', thread.getThreadHot)

router.put('/upvote/:id', authToken, thread.addLikes)
router.delete('/upvote/:id', authToken, thread.deleteLikes)
router.put('/downvote/:id', authToken, thread.addDislike)
router.delete('/downvote/:id', authToken, thread.deleteDislike)
router.get('/threadscategory/:id', ThreadsCategory.Threads)


module.exports = router