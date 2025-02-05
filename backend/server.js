const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Seu usuário do MySQL
  password: "root", // Sua senha do MySQL
  database: "ifixtrack",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

// Rota para listar todos os FIIs
app.get("/fiis", (req, res) => {
  db.query("SELECT * FROM fiis", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

//Rota selecionar fiis por id
app.get("/fiis/:fiiId", (req, res) => {
  const { fiiId } = req.params

  db.query("SELECT * FROM fiis WHERE id = ?", [fiiId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

//Rota para selecionar os Fiis salvos
app.get("/fiisSaves/:userId", (req, res) => {
  const { userId } = req.params

  db.query('SELECT fiiId FROM usersfiis WHERE userId = ?', [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  })
})


// Rota para salvar um FII
app.post("/save", (req, res) => {
  const { userId, fiiId } = req.body;
  db.query(
    "INSERT INTO usersfiis (userId, fiiId) VALUES (?, ?)",
    [userId, fiiId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ userId, fiiId });
    }
  );
});


// Rota para deletar o FII da lista
app.delete("/deleteFii/:userId/:fiiId", (req, res) => {
  const { userId, fiiId } = req.params
  db.query('DELETE FROM usersfiis WHERE userId = ? AND fiiId = ?', [userId, fiiId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao deletar FII" })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'FII deletado com sucesso' });

  })
})



//Rota para fazer login
app.get("/login/:email", (req, res) => {
  const { email } = req.params;  // Captura o valor do parâmetro 'email' da URL

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err)  // Trata erros de consulta
    if (result.length === 0) return res.status(404).json({ message: "Usuário não encontrado" }); // Se não encontrar o usuário


    res.json(result[0])  // Retorna o primeiro usuário encontrado
  })
})

//Rota para cadastrar
app.post('/register', (req, res) => {
  const { email, name } = req.body
  if (!email || !name) {
    return res.status(400).json({ message: "Todos os campos sao obrigatorios!" })
  }

  db.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name], (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Erro ao salvar usuario" })
    }

    res.json({ id: result.insertId, email, name }); // Retorna os dados do usuário e o id gerado
  })
})


//Rota para puxar usuario
app.get('/user/:userId', (req, res) => {
  const { userId } = req.params

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json(err)  // Trata erros de consulta
    if (result.length === 0) return res.status(404).json({ message: "Usuário não encontrado" }); // Se não encontrar o usuário


    res.json(result[0])  // Retorna o primeiro usuário encontrado
  })

})

//Rota para atualizar usuario
app.put('/updateUser/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body

  db.query("UPDATE users SET name = ? WHERE id = ?", [name, userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário' })
    if (result.length === 0) return res.status(404).json({ message: "Usuário não encontrado" })

    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
  })

})

//Rota para DELETAR CONTA
app.delete("/deleteAccount/:userId", (req, res) => {
  const { userId } = req.params;

  // Inicia uma transação
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao iniciar transação" });
    }

    // Primeiro, exclui os dados de 'users'
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return db.rollback(() => {
          return res.status(500).json({ message: "Erro ao deletar conta" });
        });
      }

      if (result.affectedRows === 0) {
        return db.rollback(() => {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        });
      }

      // Agora, exclui os dados de 'usersfiis'
      db.query('DELETE FROM usersfiis WHERE userId = ?', [userId], (err, result) => {
        if (err) {
          return db.rollback(() => {
            return res.status(500).json({ message: "Erro ao deletar fiis da conta" });
          });
        }

        if (result.affectedRows === 0) {
          return db.rollback(() => {
            return res.status(404).json({ message: 'Fiis não encontrados para o usuário' });
          });
        }

        // Se tudo ocorrer bem, comita a transação
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              return res.status(500).json({ message: "Erro ao finalizar transação" });
            });
          }

          res.status(200).json({ message: 'Conta e fiis deletados com sucesso' });
        });
      });
    });
  });
});




// Iniciar o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
