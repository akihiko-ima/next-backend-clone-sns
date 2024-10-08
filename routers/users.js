const router = require("express").Router()
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();


router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } })

    if (!user) {
      res.status(404).json({ error: "ユーザーが見つかりませんでした。" })
    }

    res.status(200).json({ user: { id: user.id, email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            Profile: true // プロフィール情報を含める
          }
        }
      }
    });

    if (!profile) {
      return res.status(404).json({ message: "プロフィールが見つかりませんでした。" })
    }
    res.status(200).json(profile)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;

