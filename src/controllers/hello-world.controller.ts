import { emitLogEvent } from "../index";
import Log from '../models/Log'

export const index = (_req, res) => {
  res.render("pages/index");
};

export const emitLog = async (req, res) => {
  await Log.create(req.body)
  emitLogEvent({
    time: Date.now(),
    ...req.body
  });
  res.send({called: true, message: 'no garantee of logging', log: req.body});
}

export const getLogs = async (req, res) => {
  Log.find({}, null, {$limit: 100, sort: {time: -1}})
    .then(items => {
      res.send(items);
    })
    .catch(err => {
      res.status(500).send({error: true, message: "couldnt get logs"})
    })
}