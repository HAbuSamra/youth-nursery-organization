const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const { User } = require("./sequelize");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// تسجيل الدخول
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } }); // البحث عن المستخدم في قاعدة البيانات
  if (!user) {
    return res.status(404).json({ message: "المستخدم غير موجود." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "كلمة المرور غير صحيحة." });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// إنشاء حساب
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // eslint-disable-next-line no-unused-vars
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح." });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء إنشاء الحساب.", error });
  }
});

// تسجيل الدخول باستخدام Google
app.post("/google-login", async (req, res) => {
  const { email, name } = req.body;

  let user = await User.findOne({ where: { email } });
  if (!user) {
    user = await User.create({ email, name });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// بدء الخادم
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
