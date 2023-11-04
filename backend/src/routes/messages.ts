import express from "express"
import { z } from "zod"
import { load, save } from "../utils/db"

const router = express.Router()

const QuerySchema = z.object({
  since: z.string().datetime({ offset: true }).optional(),
})

const MessageRequestSchema = z.object({
  user: z.string(),
  message: z.string(),
})

const MessageSchema = MessageRequestSchema.extend({
  createdAt: z.string().datetime({ offset: true }),
  id: z.string()
})

router.get("/", async (req, res) => {
  const queryParseResult = QuerySchema.safeParse(req.query)
  if (!queryParseResult.success)
    return res.sendStatus(400)
  const since = queryParseResult.data.since

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  return res.json(since ? messages.filter(m => m.createdAt > since) : messages)
})

router.post("/", async (req, res) => {
  const bodyParseResult = MessageRequestSchema.safeParse(req.body)
  if (!bodyParseResult.success)
    return res.sendStatus(400)
  const message = bodyParseResult.data

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  const newMessage = { ...message, createdAt: new Date().toISOString(), id: ""+(Math.floor(Math.random() * 1000000000)) }
  await save("messages", [ ...messages, newMessage ])

  return res.json(newMessage)
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  let filteredIds = messages.filter((messages) => messages.id !== id);
  await save("messages", filteredIds)

  res.sendStatus(200);
});


router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newMessage = req.body.message;

  const data = await load("messages")
  const messages = MessageSchema.array().parse(data)
  const messageIndex = messages.findIndex((message) => message.id === id);

  if (messageIndex !== -1) {
    messages[messageIndex].message = newMessage;
    res.status(200).json({ message: 'Üzenet frissítve' });
  } else {
    res.status(404).json({ error: 'Nem található üzenet ezzel az azonosítóval' });
  }
  await save("messages", messages)

  res.sendStatus(200);
});

export { router }