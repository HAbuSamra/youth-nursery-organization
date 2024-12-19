const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // قاعدة بيانات مؤقتة

// تسجيل الدخول
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);
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
  const user = { id: users.length + 1, firstName, lastName, email, password: hashedPassword, phoneNumber };
  users.push(user);

  res.status(201).json({ message: "تم إنشاء الحساب بنجاح." });
});

// تسجيل الدخول باستخدام Google
app.post("/google-login", (req, res) => {
  const { email, name } = req.body;

  let user = users.find((user) => user.email === email);
  if (!user) {
    user = { id: users.length + 1, email, name };
    users.push(user);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
    expiresIn: "1h",
  });
  res.json({ token });
});

// بدء الخادم
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
