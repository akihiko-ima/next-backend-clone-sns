const router = require("express").Router()
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");
const lineNotifyClient = require('../utils/lineNoitfy');

const prisma = new PrismaClient();
const lineNotify = new lineNotifyClient();
lineNotify.setToken(process.env.Line_Token);

// post API
router.post("/post", isAuthenticated, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "投稿内容がありません" })
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: {
          include: {
            Profile: true
          }
        }
      }
    })
    // lineに通知
    lineNotify.notify('New POST received.');

    return res.status(201).json(newPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "server error occured!" })
  }
})

// 最新呟き取得用API
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
            Profile: true // プロフィール情報はそのまま含める
          }
        }
      }
    })
    return res.json(latestPosts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "server error occured!" })
  }
})

// 閲覧しているuserの投稿内容だけを取得
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: parseInt(userId)
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true
            // パスワードを除外
          }
        }
      }
    })

    return res.status(200).json(userPosts)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error occured!" })
  }
})

module.exports = router;
