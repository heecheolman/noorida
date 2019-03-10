const express = require('express')
const subscriptionService = require('../service/subscription')

const router = express.Router();


router.post('/reporter', async (req, res) => {
  const { reader, reporter } = req.body;
  const result = await subscriptionService.subscribeReporter({ reader, reporter })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');

});

router.post('/local', async (req, res) => {
  const { reader, localId } = req.body;
  const result = await subscriptionService.subscribeLocal({ reader, localId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/reader', async (req, res) => {
  const { userId } = req.query;
  const result = await subscriptionService.readerList({ userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/is-subscribed', async (req, res) => {
  const { reader, reporter } = req.query;
  const result = await subscriptionService.isSubscribed({ reader, reporter })
    .then(results => results)
    .catch(err => err);
  if (result) {
    res.json(true);
  } else {
    res.json(false);
  }
});

router.get('/reporter', async (req, res) => {
  const { userId } = req.query;
  const result = await subscriptionService.reporterList({ userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.get('/local', async (req, res) => {
  const { userId, localId } = req.query;
  const result = await subscriptionService.localList({ userId, localId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

router.delete('/reporter', async (req, res) => {
  const { reader, reporter } = req.query;
  const result = await subscriptionService.cancelSubscriptionReporter({ reader, reporter })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.delete('/local', async (req, res) => {
  const { reader, localId } = req.query;
  const result = await subscriptionService.cancelSubscriptionLocal({ reader, localId })
    .then(results => results)
    .catch(err => err);
  return res.json('ok');
});

router.get('/countSubscription', async (req, res) => {
  const { userId } = req.query;
  const result = await subscriptionService.countSubscription({ userId })
    .then(results => results)
    .catch(err => err);
  return res.json(result);
});

module.exports = router;
