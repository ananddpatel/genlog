import { emitLogEvent } from "../index";
import Log from '../models/Log'

export const index = (_req, res) => {
  res.render("pages/index");
};

export const emitLog = async (req, res) => {
  await Log.create(req.body)
  emitLogEvent({
    time: new Date().toLocaleString(),
    ...req.body
  });
  res.send({called: true, message: 'no garantee of logging'});
}