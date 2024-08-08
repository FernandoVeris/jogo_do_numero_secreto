function resetNumTentativas(){
    numTentativas = 1;    
}

function resetStrTentativas(){
    strTentativas = 'tentativa';
}

function geraNumero(base){
    let numeroGerado = parseInt((Math.random() * base)+1);
    if(lista.length == base){
        lista.length = 0;
    }
    if(lista.includes(numeroGerado)){
        return geraNumero(base);
    }else{        
        lista.push(numeroGerado);
        console.log(lista);
        return numeroGerado;
    }
}

function paragrafoBase(base){
    return(`Escolha um número entre 1 e ${base}`);
}

function textoInicial(){
    modificaTag('h1','Jogo do número secreto');
    modificaTag('p',paragrafoBase(base));
    responsiveVoice.speak(paragrafoBase(base), 'Brazilian Portuguese Female', {rate:1.2} );
}

function reiniciaJogo(){
    textoInicial();
    document.querySelector('input').value = '';
    resetNumTentativas();
    resetStrTentativas();
    numeroSecreto = geraNumero(base);
    document.querySelector('button').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function resultado(chute, numero){
    return chute == numero ? true : false;
}

function modificaTag(tag, texto){
    document.querySelector(tag).innerHTML = texto;
}

function dica(chute, numeroSecreto){
    return chute > numeroSecreto ? 'O numero é menor que '+chute : 'O numero é maior que '+chute;
}

function verificarChute(){
    chute = parseInt(document.querySelector('input').value);
    if(chute == numeroSecreto){
        modificaTag('h1','Parabêns! Você Acertou!');
        modificaTag('p','Você acertou com '+numTentativas+' '+strTentativas);
        let reset = document.getElementById('reiniciar');
        reset.removeAttribute('disabled');
        reset.setAttribute('onclick','reiniciaJogo()');
        document.querySelector('button').setAttribute('disabled',true);

    }else{
        modificaTag('h1', 'Você errou!!!!!!!!!!!:(');
        modificaTag('p',dica(chute, numeroSecreto));
        numTentativas++;
        strTentativas = 'Tentativas';
        document.querySelector('input').value = '';
    }
}

let lista = [];
let base = 100;
let numeroSecreto = geraNumero(base);
//let numeroSecreto = 5;
let numTentativas = 1;
let strTentativas = 'tentativa';


textoInicial();