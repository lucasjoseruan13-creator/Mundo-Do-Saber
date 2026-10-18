let aulas = {

pre_escola: [

{
titulo:"Cores",
descricao:"Aprendendo cores",
pergunta:"Qual é a cor do céu?",
opcoes:["Azul","Verde","Vermelho"],
correta:0
},

{
titulo:"Animais",
descricao:"Conhecendo animais",
pergunta:"Qual destes é um animal?",
opcoes:["Urso","Carro","Mesa"],
correta:0
},

{
titulo:"Formas",
descricao:"Formas básicas",
pergunta:"Qual forma é redonda?",
opcoes:["Círculo","Quadrado","Triângulo"],
correta:0
},

{
titulo:"Contagem",
descricao:"Aprenda a contar",
pergunta:"Quanto é 1 + 1?",
opcoes:["2","3","4"],
correta:0
},

{
titulo:"Letras",
descricao:"Reconhecendo letras",
pergunta:"Qual é a primeira letra do alfabeto?",
opcoes:["A","B","C"],
correta:0
},

// continue até 50

],

primeiro_ano:[

{
titulo:"Matemática",
descricao:"Soma simples",
pergunta:"Quanto é 2 + 3?",
opcoes:["5","4","6"],
correta:0
},

{
titulo:"Português",
descricao:"Alfabeto",
pergunta:"Qual vem depois da letra B?",
opcoes:["C","D","A"],
correta:0
},

{
titulo:"Matemática",
descricao:"Números",
pergunta:"Qual número vem depois do 9?",
opcoes:["10","8","11"],
correta:0
},

{
titulo:"Leitura",
descricao:"Palavras simples",
pergunta:"Qual destas é uma fruta?",
opcoes:["Maçã","Carro","Sapato"],
correta:0
},

// até 50

],

segundo_ano:[

{
titulo:"Matemática",
descricao:"Soma",
pergunta:"Quanto é 10 + 5?",
opcoes:["15","12","20"],
correta:0
},

{
titulo:"Português",
descricao:"Palavras",
pergunta:"Qual palavra é um animal?",
opcoes:["Cachorro","Mesa","Porta"],
correta:0
},

{
titulo:"Matemática",
descricao:"Subtração",
pergunta:"Quanto é 8 - 3?",
opcoes:["5","4","6"],
correta:0
},

// até 50

],

terceiro_ano:[

{
titulo:"Matemática",
descricao:"Multiplicação",
pergunta:"Quanto é 4 × 3?",
opcoes:["12","10","14"],
correta:0
},

{
titulo:"Português",
descricao:"Plural",
pergunta:"Qual é o plural de 'flor'?",
opcoes:["Flores","Flor","Flors"],
correta:0
},

{
titulo:"Ciências",
descricao:"Animais",
pergunta:"Qual animal vive na água?",
opcoes:["Peixe","Cachorro","Cavalo"],
correta:0
},

// até 50

],

quarto_ano:[

{
titulo:"Matemática",
descricao:"Multiplicação",
pergunta:"Quanto é 7 × 8?",
opcoes:["56","54","64"],
correta:0
},

{
titulo:"Matemática",
descricao:"Divisão",
pergunta:"Quanto é 20 ÷ 4?",
opcoes:["5","4","6"],
correta:0
},

{
titulo:"Português",
descricao:"Ortografia",
pergunta:"Qual palavra está correta?",
opcoes:["Exemplo","Ezemplo","Exenplo"],
correta:0
},

{
titulo:"Ciências",
descricao:"Planetas",
pergunta:"Em qual planeta vivemos?",
opcoes:["Terra","Marte","Júpiter"],
correta:0
}

// até 50

]

};

/* ============================
GERADOR AUTOMÁTICO DE PERGUNTAS
============================ */

function gerarPerguntasMatematica(quantidade, maxNumero){

let perguntas=[];

for(let i=0;i<quantidade;i++){

let a=Math.floor(Math.random()*maxNumero);
let b=Math.floor(Math.random()*maxNumero);

let resposta=a+b;

let opcoes=[
resposta,
resposta+1,
resposta-1
];

opcoes.sort(()=>Math.random()-0.5);

perguntas.push({

titulo:"Matemática",
descricao:"Resolva a conta",
pergunta:"Quanto é "+a+" + "+b+" ?",
opcoes:opcoes,
correta:opcoes.indexOf(resposta)

});

}

return perguntas;

}
/* ============================
ADICIONAR PERGUNTAS GERADAS
============================ */

aulas.pre_escola = aulas.pre_escola.concat(
gerarPerguntasMatematica(50,5)
);

aulas.primeiro_ano = aulas.primeiro_ano.concat(
gerarPerguntasMatematica(50,10)
);

aulas.segundo_ano = aulas.segundo_ano.concat(
gerarPerguntasMatematica(50,20)
);

aulas.terceiro_ano = aulas.terceiro_ano.concat(
gerarPerguntasMatematica(50,50)
);

aulas.quarto_ano = aulas.quarto_ano.concat(
gerarPerguntasMatematica(50,100)
);