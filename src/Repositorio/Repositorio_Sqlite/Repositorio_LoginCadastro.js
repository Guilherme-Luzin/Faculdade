import db from './SqliteDatabase'

db.transaction((tx) => {
    // tx.executeSql("DROP TABLE usuarios;");

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT, celular INT, categoria TEXT, descricao TEXT, avaliacao INT, qtdVotos INT);"
    );
});

const incluirUsuario = (obj) => {
return new Promise((resolve, reject) => {
    db.transaction((tx) => {
    tx.executeSql(
        "INSERT INTO usuarios (nome, email, senha, celular, categoria, descricao, avaliacao, qtdVotos) values (?, ?, ?, ?, ?, ?, 0, 0);",
        [obj.nome, obj.email, obj.senha, obj.celular, obj.categoria, obj.descricao,],
        
        (_, { rowsAffected, insertId }) => {
        if (rowsAffected > 0) resolve(insertId);
        else reject("Erro ao cadastrar usuário: " + JSON.stringify(obj));
        },
        (_, error) => reject(error)
    );
    });
});
};

const obterParaLogin = (email, senha) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM usuarios WHERE email=? and senha=?;",
          [email, senha],
          
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Usuario não encontrado");
          },
          (_, error) => reject(error)
        );
      });
    });
};

const obterPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM usuarios WHERE id=?;",
        [id],
        
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Usuario não encontrado");
        },
        (_, error) => reject(error)
      );
    });
  });
};

const obterTodos = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM usuarios;",
          [],
          
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
};

const atualizarUsuario = (obj, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE usuarios SET nome=?, email=?, celular=?, categoria=?, descricao=? WHERE id=?;",
        [obj.nome, obj.email, obj.celularFormatado, obj.categoria, obj.descricao, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
}

const atualizarAvaliacaoDoUsuario = (avaliacao, qtdVotos, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE usuarios SET avaliacao=?, qtdVotos=? WHERE id=?;",
        [avaliacao, qtdVotos, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
}

const deletarUsuario = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM usuarios WHERE id=?; DELETE FROM servicos WHERE idUsuario=?;",
          [id],
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error)
        );
      });
    });
};

export default {
    incluirUsuario,
    obterParaLogin,
    obterTodos,
    deletarUsuario,
    atualizarUsuario,
    atualizarAvaliacaoDoUsuario,
    obterPorId
}
