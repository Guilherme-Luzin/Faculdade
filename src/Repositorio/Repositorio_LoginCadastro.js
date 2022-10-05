import AsyncStorage from "@react-native-async-storage/async-storage";

async function incluirUsuario(dadosUsuario){
    dadosUsuario.id = new Date().getTime();
    const usuariosSalvos = await obterTodos();

    usuariosSalvos.push(dadosUsuario);

    return AsyncStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
}

async function obterTodos(){
    return AsyncStorage.getItem('usuarios')
        .then(response => {
            if(response)
                return Promise.resolve(JSON.parse(response))
            else
                return Promise.resolve([]);
        });
}

async function obterParaLogin(email, senha){
    const usuariosSalvos = await obterTodos();
    var usuarioLogin = usuariosSalvos.find(usuario => usuario.email == email && usuario.senha == senha);
    return usuarioLogin;
}

async function deletarUsuario(id){
    let usuariosSalvos = await getAll();
    const index = await usuariosSalvos.findIndex(afazer => afazer.id == id);
    usuariosSalvos.splice(index, 1);
    return AsyncStorage.setItem('usuarios', JSON.stringify(usuariosSalvos));
}

module.exports = {
    incluirUsuario,
    obterTodos,
    obterParaLogin,
    deletarUsuario,
}
