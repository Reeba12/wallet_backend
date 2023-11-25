const bcrypt = require('bcrypt');
const saltRounds = 10; // The number of salt rounds for bcrypt

app.post('/signup', async (req, res) => {
  const {
    name,
    email_address,
    password,
    cnic,
    address,
    dob,
    phone_no,
  } = req.body;

  // Implement password strength checks (e.g., minimum length, complexity)

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password is too short' });
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@#$%^&+=]/.test(password);

  if (!(hasLetter && hasNumber && hasSpecialChar)) {
    return res.status(400).json({ error: 'Password is not strong enough' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.error('Password hashing error: ' + err);
      return res.status(500).json({ error: 'Registration failed' });
    }

    const sql =
      'INSERT INTO users (name, email_address, password, cnic, address, dob, phone_no) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email_address, hash, cnic, address, dob, phone_no];

    try {
      await connection.query(sql, values);
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('User registration error: ' + error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });
});


app.post('/login', async (req, res) => {
    const { email_address, password } = req.body;
  
    const sql = 'SELECT * FROM users WHERE email_address = ?';
    const values = [email_address];
    console.log("Req.body", req.body)
    try {
      const [user] = await connection.query(sql, values);
  
      if (user.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Verify the hashed password
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Password is correct; you can generate a JWT token here for authentication
        // and send it to the client
  
        // Example: Generate and send a JWT token
        const token = generateAuthToken(user[0].id, user[0].email_address);
        res.status(200).json({ token });
      });
    } catch (error) {
      console.error('Login error: ' + error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
  