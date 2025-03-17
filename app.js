let listaAmigos = [];
let numExecucao = 0;
const idCampoListaAmigos = 'listaAmigos';
const idCampoResultado = 'resultado';

// Mensagens do sistema
const textoAmigoSorteado = `O amigo secreto sorteado é: {nomeAmigo}.`;
const textoListaAmigosVazia = `Insira nomes de amigos na lista para realizar o sorteio.`;
const textoIdInexistente = `O campo de id '{id}' informado não existe.`;
const textoCampoInvalido = `Oops! Insira um {nomeCampo} válido.`;
const textoErroSorteio = `Erro ao gerar sorteio.`;
const textoErroParametro = `Um ou mais parâmetros estão ausentes ou inválidos na função '{nomeFuncao}'.`;
const textoErroInterno = `Erro interno! Contate o administrador do sistema.`;

// Funções para tratamento de erros
function erroId(id) {
    if (id) {
        alert(textoErroInterno);
        console.error(formatarTextoDinamico(textoIdInexistente, id));
    } else {
        erroParametro(erroId.name);
    }
}

function erroCampoInvalido(nomeCampo) {
    if (nomeCampo) {
        let mensagem = formatarTextoDinamico(textoCampoInvalido, nomeCampo);

        alert(mensagem);
        console.error(mensagem);
    } else {
        erroParametro(erroCampoInvalido.name);
    }
}

function erroSorteio() {
    console.error(textoErroSorteio);
}

function erroParametro(nomeFuncao) {
    let nomeMensagem = nomeFuncao ? nomeFuncao : erroParametro.name;

    alert(textoErroInterno);
    console.error(formatarTextoDinamico(textoErroParametro, nomeMensagem));
}

// Funções utilitárias
function sortearItemLista(lista) {
    if (!lista || !Array.isArray(lista)) {
        erroParametro(sortearItemLista.name);
        return false;
    }

    let numMaximoSorteado = lista.length - 1;
    let chaveAleatoria = Math.floor(Math.random() * (numMaximoSorteado + 1));

    return lista[chaveAleatoria];
}

function exibirTextoNaTela(id, texto) {
    let campo = validaElemento(document.getElementById(id), id);

    if (!texto) {
        erroParametro(exibirTextoNaTela.name);
    }

    campo.innerHTML = texto;
}

function exibirListaNaTela(id, lista) {
    let elementoListaAmigos = validaElemento(document.getElementById(id), id);
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

function limparResultado() {
    if (numExecucao > 0) {
        limparCampo(document.getElementById(idCampoResultado));
    }
}

function formatarNome(nome) {
    if (typeof nome !== 'string') return erroParametro(formatarNome.name);

    return nome.trim()
        .split(" ")
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ");
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

function validaCampoForm(id, nome) {
    let campo = validaElemento(document.getElementById(id), id);

    if (campo && campoVazio(campo)) {
        erroCampoInvalido(nome);
        return false;
    }

    return campo;
}

function validaElemento(elemento, id) {
    if (!campoExiste(elemento)) {
            erroId(id);
            return false;
        }

    return elemento;
}

// Funções principais
function setListaAmigos(valor) {
    listaAmigos = valor;
}

function adicionarAmigo() {
    let campoAmigo = validaCampoForm('amigo', 'nome');

    if (campoAmigo) {
        listaAmigos.push(formatarNome(campoAmigo.value));

        if (listaAmigos.length == 1) {
            limparResultado();
        }

        limparCampo(campoAmigo);
        exibirListaNaTela(idCampoListaAmigos, listaAmigos);
    }
}

function sortearAmigo() {
    if (listaAmigos.length > 0) {
        let amigoSorteado = sortearItemLista(listaAmigos);
        let campoListaAmigos = validaElemento(document.getElementById(idCampoListaAmigos), idCampoListaAmigos);

        if (!amigoSorteado || !campoListaAmigos) {
            return erroSorteio();
        }

        exibirTextoNaTela(idCampoResultado, formatarTextoDinamico(textoAmigoSorteado, amigoSorteado));
        numExecucao++;
        limparCampo(campoListaAmigos);
        setListaAmigos([]);
    } else {
        alert(textoListaAmigosVazia);
        limparResultado();
    }
}