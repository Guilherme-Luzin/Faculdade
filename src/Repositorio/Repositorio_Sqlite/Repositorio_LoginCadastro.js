import db from './SqliteDatabase'

db.transaction((tx) => {
    //tx.executeSql("DROP TABLE cars;");

    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT, celular INT, categoria TEXT, descricao TEXT);"
    );
});

const incluirUsuario = (obj) => {
return new Promise((resolve, reject) => {
    db.transaction((tx) => {
    tx.executeSql(
        "INSERT INTO usuarios (nome, email, senha, celular, categoria, descricao) values (?, ?, ?, ?, ?, ?);",
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

const deletarUsuario = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM usuarios WHERE id=?;",
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
    deletarUsuario
}
