let listaAmigos = [];
const idCampoListaAmigos = 'listaAmigos';
const idCampoResultado = 'resultado';

// Mensagens do sistema
const textoAmigoSorteado = `O amigo secreto sorteado é: {nomeAmigo}.`;
const textoListaAmigosVazia = `Insira nomes de amigos na lista para realizar o sorteio.`;
const textoIdInexistente = `O campo de id '{id}' informado não existe.`;
const textoCampoInvalido = `Oops! Insira um {nomeCampo} válido.`;
const textoParametroObrigatorio = `O parâmetro {parametro} é obrigatório.`;
const textoErroInterno = `Erro interno! Contate o administrador do sistema.`;

// Funções utilitárias
function sortearItemLista(lista) {
    let numMaximoSorteado = lista.length - 1;
    let chaveAleatoria = Math.floor(Math.random() * (numMaximoSorteado + 1));

    return lista[chaveAleatoria];
}

function exibirTextoNaTela(id, texto) {
    let campo = validaElemento(document.getElementById(id), id);
    validaParam(texto);

    campo.innerHTML = texto;
}

function exibirListaNaTela(id, lista) {
    let elementoListaAmigos = document.getElementById(id);
    let li = document.createElement('li');
    li.textContent = lista.at(-1);
    elementoListaAmigos.appendChild(li);
}

function limparCampo(campo) {
    if (campo && 'value' in campo) {
        campo.value = '';
    } else {
        campo.innerHTML = '';
    }
}

function formatarTextoDinamico(template, ...values) {
    return template.replace(/\{.*?\}/g, () => values.shift());
}

// Funções de validação
function campoVazio(campo) {
    return !campo.value;
}

function campoExiste(campo) {
    return !!campo;
}

function validaCampoForm(campo, nomeCampo) {
    if (campoExiste(campo)) {
        if (campoVazio(campo)) {
            alert(formatarTextoDinamico(textoCampoInvalido, nomeCampo));
            return false;
        }
    } else {
        alert(textoErroInterno);
        console.error(formatarTextoDinamico(textoIdInexistente, campo.id));
        return false;
    }

    return campo;
}

function validaElemento(elemento, id) {
    if (!campoExiste(elemento)) {
            alert(textoErroInterno);
            console.error(formatarTextoDinamico(textoIdInexistente, id));
            return false;
        }

    return elemento;
}

function validaParam(param) {
    if (!param) {
        alert(textoErroInterno);
        console.error(formatarTextoDinamico(textoParametroObrigatorio, param));
        return false;
    }

    return param;
}

// Funções principais
function setListaAmigos(valor) {
    listaAmigos = valor;
}

function adicionarAmigo() {
    let campoAmigo = validaCampoForm(document.getElementById('amigo'), 'nome');
    listaAmigos.push(campoAmigo.value);

    limparCampo(campoAmigo);
    exibirListaNaTela(idCampoListaAmigos, listaAmigos);
}

function sortearAmigo() {
    if (listaAmigos.length > 0) {
        let amigoSorteado = sortearItemLista(listaAmigos);
        let campoListaAmigos = document.getElementById(idCampoListaAmigos);

        exibirTextoNaTela(idCampoResultado, formatarTextoDinamico(textoAmigoSorteado, amigoSorteado));
        limparCampo(campoListaAmigos);
        setListaAmigos([]);
    } else {
        alert(textoListaAmigosVazia);
        limparCampo(document.getElementById(idCampoResultado));
    }
}