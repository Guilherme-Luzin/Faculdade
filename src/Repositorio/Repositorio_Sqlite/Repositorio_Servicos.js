import db from './SqliteDatabase'

db.transaction((tx) => {
    //tx.executeSql("DROP TABLE servicos;");

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS servicos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descricaoServico TEXT, endereco TEXT, cep INT, valorServico INT, aceito INT, idAceito INT, idUsuario INT,  FOREIGN KEY (idUsuario) REFERENCES usuarios(id));"
    );
});

const incluirServico = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO servicos (titulo, descricaoServico, endereco, cep, valorServico, idUsuario, aceito) values (?, ?, ?, ?, ?, ?, ?);",
            [obj.titulo, obj.descricaoServico, obj.endereco, obj.cepFormatado, obj.valorServico, obj.idUsuario, obj.aceito],
            
            (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Erro ao cadastrar servico: " + JSON.stringify(obj));
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
          "SELECT * FROM servicos;",
          [],
          
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
};

const obterComUsuario = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM usuarios u, servicos s WHERE u.id = s.idUsuario AND s.aceito = 0;",
          [],
          
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
};

const obterAceitosPeloUsuario = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM  usuarios u, servicos s WHERE u.id = s.idUsuario AND s.idAceito=? AND s.aceito = 1;",
        [id],
        
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const obterTodosDoUsuario = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM usuarios u, servicos s WHERE u.id=? AND s.idUsuario=?;",
        [id, id],
        
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const atualizarServico = (obj, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE servicos SET titulo=?, descricaoServico=?, endereco=?, cep=?, valorServico=? WHERE id=?;",
        [obj.titulo, obj.descricaoServico, obj.endereco, obj.cepFormatado, obj.valorServico, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
}

const atualizarAceitoIdAceito = (aceito, idAceito, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE servicos SET aceito=?, idAceito=? WHERE id=?;",
        [aceito, idAceito, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
}

const deletarServico = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM servicos WHERE id=?;",
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
    incluirServico,
    obterTodos,
    obterComUsuario,
    deletarServico,
    atualizarServico,
    obterAceitosPeloUsuario,
    obterTodosDoUsuario,
    atualizarAceitoIdAceito
}