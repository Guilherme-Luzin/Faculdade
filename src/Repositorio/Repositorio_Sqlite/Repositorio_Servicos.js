import db from './SqliteDatabase'

db.transaction((tx) => {
    //tx.executeSql("DROP TABLE servicos;");

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS servicos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descricao TEXT, endereco TEXT, cep INT, valorServico INT, idUsuario INT,  FOREIGN KEY (idUsuario) REFERENCES usuarios(id));"
    );
});

const incluirServico = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO servicos (titulo, descricao, endereco, cep, valorServico, idUsuario) values (?, ?, ?, ?, ?, ?);",
            [obj.titulo, obj.descricao, obj.endereco, obj.cepFormatado, obj.valorServico, obj.idUsuario],
            
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
          "SELECT * FROM usuarios u, servicos s ON u.id = s.idUsuario;",
          [],
          
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
};

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
    deletarServico
}