//javascript
/* ================================
VERIFICAR SE AS AULAS CARREGARAM
================================ */

if (typeof aulas === "undefined") {
console.error("Arquivo dadosAulas.js não carregado");
}

/* ================================
CADASTRO
================================ */

function cadastrar(){
tipo:document.getElementById("tipoConta").value
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let nome = document.getElementById("nome").value;
let usuario = document.getElementById("novoUsuario").value;
let senha = document.getElementById("novaSenha").value;

usuarios.push({
nome:nome,
usuario:usuario,
senha:senha,
pontos:0
});

localStorage.setItem("usuarios",JSON.stringify(usuarios));

alert("Conta criada!");

window.location.href="index.html";

}

/* ================================
LOGIN
================================ */

function login(){

let usuario=document.getElementById("usuario").value;
let senha=document.getElementById("senha").value;

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

let encontrado=usuarios.find(u=>u.usuario===usuario && u.senha===senha);

if(!encontrado){
alert("Usuário não encontrado");
return;
}

localStorage.setItem("usuarioLogado",JSON.stringify(encontrado));

window.location.href="dashboard.html";

}

/* ================================
DASHBOARD
================================ */

function iniciarDashboard(){

carregarUsuario();
carregarAvatar();
carregarRanking();
falarMascote();
atualizarProgresso();
verificarMedalhas();
gerarGrafico();
iniciarBackgroundRotativo();

}

function carregarUsuario(){

let usuario=JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario) return;

let nome=document.getElementById("nomeUsuario");
let pontos=document.getElementById("pontos");

if(nome) nome.innerText=usuario.nome;
if(pontos) pontos.innerText=usuario.pontos;

}

/* ================================
AVATAR
================================ */

function escolherAvatar(img){

localStorage.setItem("avatar",img);

let avatar=document.getElementById("avatarAluno");

if(avatar){
avatar.src="img/"+img;
}

}

function carregarAvatar(){

let avatar=localStorage.getItem("avatar");

if(!avatar) return;

let img=document.getElementById("avatarAluno");

if(img){
img.src="img/"+avatar;
}

}

/* ================================
MASCOTE
================================ */

function falarMascote(){

let frases=[
"Vamos aprender!",
"Você consegue!",
"Continue estudando!",
"Parabéns pelo esforço!"
];

let frase=frases[Math.floor(Math.random()*frases.length)];

let texto=document.getElementById("falaMascote");

if(texto){
texto.innerText=frase;
}

falar(frase);

}

/* VOZ */

function falar(texto){

let fala=new SpeechSynthesisUtterance(texto);

fala.lang="pt-BR";

speechSynthesis.speak(fala);

}

/* ================================
ESCOLHER SÉRIE
================================ */

function selecionarSerie(serie){

localStorage.setItem("serieSelecionada",serie);

aulas[serie].sort(()=>Math.random()-0.5);

if(!localStorage.getItem("aulaAtualIndex_"+serie)){
localStorage.setItem("aulaAtualIndex_"+serie,0);
}

window.location.href="aula.html";

}

/* ================================
RANKING
================================ */

function carregarRanking(){

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

usuarios.sort((a,b)=>b.pontos-a.pontos);

let lista=document.getElementById("ranking");

if(!lista) return;

lista.innerHTML="";

usuarios.forEach(u=>{

let li=document.createElement("li");

li.innerText=u.nome+" - "+u.pontos+" pontos";

lista.appendChild(li);

});

}

/* ================================
PROGRESSO
================================ */

function atualizarProgresso(){

let serie=localStorage.getItem("serieSelecionada");

if(!serie) return;

let index=parseInt(localStorage.getItem("aulaAtualIndex_"+serie))||0;

let total=aulas[serie].length;

let porcentagem=(index/total)*100;

let barra=document.getElementById("progresso");

if(barra){
barra.style.width=porcentagem+"%";
}

}

/* ================================
CARREGAR AULA
================================ */

function carregarAula(){

iniciarBackgroundRotativo();

let serie=localStorage.getItem("serieSelecionada");

if(!serie){
alert("Escolha uma série primeiro");
window.location.href="dashboard.html";
return;
}

let aulaIndex=parseInt(localStorage.getItem("aulaAtualIndex_"+serie))||0;

let aula=aulas[serie][aulaIndex];

if(!aula){

alert("Parabéns! Você terminou a série!");

localStorage.removeItem("aulaAtualIndex_"+serie);

window.location.href="dashboard.html";

return;
}

document.getElementById("tituloAula").innerText=aula.titulo;
document.getElementById("descricao").innerText=aula.descricao;
document.getElementById("pergunta").innerText=aula.pergunta;

let opcoesDiv=document.getElementById("opcoes");

opcoesDiv.innerHTML="";

let opcoes=[...aula.opcoes];

opcoes.sort(()=>Math.random()-0.5);

opcoes.forEach(opcao=>{

let botao=document.createElement("button");

botao.innerText=opcao;

botao.onclick=function(){

let indexOriginal=aula.opcoes.indexOf(opcao);

verificarResposta(indexOriginal);

};

opcoesDiv.appendChild(botao);
ajustarDificuldade();

});

}

function ajustarDificuldade(){

let usuario=JSON.parse(localStorage.getItem("usuarioLogado"));

if(!usuario) return;

let pontos=usuario.pontos;

if(pontos>200){

gerarPerguntasMatematica(50,200);

}

else if(pontos>100){

gerarPerguntasMatematica(50,100);

}

}

function verificarMedalhas(){

let usuario=JSON.parse(localStorage.getItem("usuarioLogado"));

let medalhas=document.getElementById("medalhas");

if(!medalhas) return;

medalhas.innerHTML="";

if(usuario.pontos>=50){

medalhas.innerHTML+="🥉 Primeiros 50 pontos<br>";

}

if(usuario.pontos>=100){

medalhas.innerHTML+="🥈 100 pontos conquistados<br>";

}

if(usuario.pontos>=200){

medalhas.innerHTML+="🥇 Mestre do aprendizado<br>";

}

}
function gerarGrafico(){

let usuario=JSON.parse(localStorage.getItem("usuarioLogado"));

let ctx=document.getElementById("grafico");

if(!ctx) return;

new Chart(ctx,{

type:"bar",

data:{
labels:["Pontuação"],
datasets:[{
label:"Progresso",
data:[usuario.pontos]
}]
}

});

}
/* ================================
VERIFICAR RESPOSTA
================================ */

function verificarResposta(opcao){

let serie=localStorage.getItem("serieSelecionada");

let aulaIndex=parseInt(localStorage.getItem("aulaAtualIndex_"+serie))||0;

let aula=aulas[serie][aulaIndex];

let usuario=JSON.parse(localStorage.getItem("usuarioLogado"));

let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];

if(opcao===aula.correta){

document.getElementById("resultado").innerText="✅ Correto";

document.getElementById("somAcerto").play();

usuario.pontos+=10;

}else{

document.getElementById("resultado").innerText="❌ Errado";

document.getElementById("somErro").play();

}

let indexUsuario=usuarios.findIndex(u=>u.usuario===usuario.usuario);

if(indexUsuario!==-1){
usuarios[indexUsuario]=usuario;
}

localStorage.setItem("usuarios",JSON.stringify(usuarios));
localStorage.setItem("usuarioLogado",JSON.stringify(usuario));

let pontosTela=document.getElementById("pontos");

if(pontosTela){
pontosTela.innerText=usuario.pontos;
}

aulaIndex++;

localStorage.setItem("aulaAtualIndex_"+serie,aulaIndex);

atualizarProgresso();

setTimeout(carregarAula,1500);

}

/* ================================
BACKGROUND ROTATIVO
================================ */

function iniciarBackgroundRotativo(){

let imagens=[
"img/image-paisagem.png",
"img/image-paisagem-1.png",
"img/image-paisagem-2.png",
"img/image-paisagem-3.png",
"img/image-paisagem-4.png"
];

let index=0;

document.body.style.backgroundSize="cover";
document.body.style.backgroundPosition="center";
document.body.style.backgroundRepeat="no-repeat";

setInterval(function(){

document.body.style.backgroundImage="url("+imagens[index]+")";

index++;

if(index>=imagens.length){
index=0;
}

},10000);

}

/* ================================
BOTÃO VOLTAR
================================ */

function voltarDashboard(){
window.location.href="dashboard.html";
}

/* ================================
SAIR
================================ */

function sair(){

localStorage.removeItem("usuarioLogado");

window.location.href="index.html";

}

