
const openCadAluno = document.getElementById("btn-open-cad-aluno");
const modalAluno = document.getElementById("modal-aluno");
const cadAluno = document.getElementById("btn-cad-aluno");
const openCadProf = document.getElementById("btn-open-cad-prof");
const modalProf = document.getElementById("modal-prof");
const cadProf = document.getElementById("btn-cad-prof");
const modalTurma = document.getElementById("modal-turma");
const openCadTurma = document.getElementById("btn-open-cad-turma");
const CadTurma = document.getElementById("btn-cad-turma");
const modalNota = document.getElementById("modal-nota");    
const openCadNota = document.getElementById("btn-open-cad-nota");
const cadNota = document.getElementById("btn-cad-nota");

function renderizarTabela (listaAlunos) {
    
    const tbody = document.getElementById("tabela-media");

    tbody.innerHTML = "";

    listaAlunos.forEach(aluno => {

        if (aluno.notas.length === 0)
           return;

           const materias = {};

           aluno.notas.forEach(n => {
            if(!materias[n.materia]) {
                materias[n.materia] = { notas: [], professor: n.professor};
            }
            materias[n.materia].notas.push(n.valor);
           });

        
        Object.entries(materias).forEach(([materia, dados]) => {
            const nota1 = dados.notas[0] ?? "-";
            const nota2 = dados.notas[1] ?? "-";
            const media = dados.notas.reduce((s, n) => s + n, 0) / dados.notas.length;

            const tr = document.createElement("tr");

            tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${media}</td>
            <td>${nota1}</td>
            <td>${nota2}</td>
            <td>${materia}</td>
            <td>${dados.professor}</td>`;

            tbody.appendChild(tr);
        });        
    });
};

function salvarDados() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
    localStorage.setItem("professores", JSON.stringify(professores));
    localStorage.setItem("turmas", JSON.stringify(turmas));
};

function carregarDados() {
    const alunosSalvos = localStorage.getItem("alunos");
    const professoresSalvos = localStorage.getItem("professores");
    const turmasSalvas = localStorage.getItem("turmas");

    if(alunosSalvos) {
        JSON.parse(alunosSalvos).forEach(a => {
            const aluno = new Aluno(a.nome);
            aluno.turma = a.turma;
            a.notas.forEach(n => aluno.adicionarNotas(new Nota(n.valor, n.materia, n.professor)));
            alunos.push(aluno);

            const select = document.getElementById("selecao-aluno");
            const option = document.createElement("option");
            option.value = alunos.length -1;
            option.textContent = aluno.nome;
            select.appendChild(option);
        });
    };

    if(professoresSalvos) {
        JSON.parse(professoresSalvos).forEach(p => {
            const novoProf = new Professor(p.nome, p.materia);
            professores.push(novoProf);

            const select = document.getElementById("selecao-prof-nota");
            const option = document.createElement("option");
            option.value = professores.length -1;
            option.textContent = novoProf.nome;
            select.appendChild(option);
        });
    };

    if(turmasSalvas) {
        JSON.parse(turmasSalvas).forEach(t => {
            const turma = new Turma(t.nome);
            turmas.push(turma);


            const selectTurma = document.getElementById("selecao-turma");
            const option = document.createElement("option");
            option.value = turmas.length -1;
            option.textContent = turma.nome;

            selectTurma.appendChild(option);

            const filtroTurma = document.getElementById("selecao-filtro-turma");
            const optionFiltro = document.createElement("option");
            optionFiltro.value = turma.nome;
            optionFiltro.textContent = turma.nome;

            filtroTurma.appendChild(optionFiltro);
        })
    };

    const filtroInicial = document.getElementById("selecao-filtro-turma").value;
    renderizarTabela(alunos.filter(a => a.turma === filtroInicial));
};



openCadAluno.addEventListener("click", (e) => {
    e.preventDefault();
    modalAluno.showModal();

})

const alunos = [];
const professores = [];
const turmas = [];




cadAluno.addEventListener("click", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    
    const indiceTurma = document.getElementById("selecao-turma").value;
    const turmaSelecionada = turmas[indiceTurma];

    console.log("Indice:", indiceTurma);
    console.log("Turmas:", turmas);

    const novoAluno = new Aluno(
        titulo);
        novoAluno.turma = turmaSelecionada.nome;
    alunos.push(novoAluno);
    salvarDados();
    const select = document.getElementById("selecao-aluno");
    const option = document.createElement("option");
    option.value = alunos.length -1;
    option.textContent = novoAluno.nome;
    select.appendChild(option);
    console.log(alunos);
    modalAluno.close();
    
})

openCadProf.addEventListener("click", (e) => {
    e.preventDefault();
    modalProf.showModal();
})

cadProf.addEventListener("click", (e) => {
    e.preventDefault();
    const professor = document.getElementById("professor").value;
    const materia = document.getElementById("materia-prof").value;

    const novoProf = new Professor(professor, materia);

    professores.push(novoProf);
    salvarDados();
    const select = document.getElementById("selecao-prof-nota");
    const option = document.createElement("option");
    option.value = professores.length -1;
    option.textContent = novoProf.nome;
    select.appendChild(option);
    // const selectNota = document.getElementById("selecao-prof-nota");
    // const optionNota = document.createElement("option");
    // optionNota.value = professores.length -1;
    // optionNota.textContent = novoProf.nome;
    // selectNota.appendChild(optionNota);
    console.log(professores);
    modalProf.close();
    
})

openCadTurma.addEventListener("click", (e) => {
    e.preventDefault();
    modalTurma.showModal();
});

CadTurma.addEventListener("click", (e) => {
    e.preventDefault();
    const turma = document.getElementById("turma").value;
    


    const novaTurma = new Turma(turma);
    
    turmas.push(novaTurma);
    salvarDados();

    const selectTurma = document.getElementById("selecao-turma");
    const option = document.createElement("option");
    option.value = turmas.length -1;
    option.textContent = novaTurma.nome;

    selectTurma.appendChild(option);

    const filtroTurma = document.getElementById("selecao-filtro-turma");
    const optionFiltro = document.createElement("option");
    optionFiltro.value = novaTurma.nome;
    optionFiltro.textContent = novaTurma.nome;

    filtroTurma.appendChild(optionFiltro);

    console.log(turmas);
    modalTurma.close();
    
})

openCadNota.addEventListener("click", (e) => {
    e.preventDefault();
    modalNota.showModal();

    const indiceProf = document.getElementById("selecao-prof-nota").value;
    const prof = professores[indiceProf];
    if(prof) document.getElementById("materia-exibida").textContent = prof.materia;
})

document.getElementById("selecao-prof-nota").addEventListener("change", (e) => {
    const indiceProf = e.target.value;
    const prof = professores[indiceProf];
    document.getElementById("materia-exibida").textContent = prof.materia;
})

cadNota.addEventListener("click", (e) => {
    e.preventDefault();

    const indiceAluno = document.getElementById("selecao-aluno").value;
    const alunoSelecionado = alunos[indiceAluno];
    const nota1 = Number(document.getElementById("nota1").value);
    const nota2 = Number(document.getElementById("nota2").value);
    const materiaAluno = document.getElementById("materia-exibida").textContent;
    const indiceProf = document.getElementById("selecao-prof-nota").value;

    const notasDaMateria = alunoSelecionado.notas.filter(
    n => n.materia === materiaAluno);

    if(notasDaMateria.length >= 2) {
    alert(`${alunoSelecionado.nome} já tem 2 notas em ${materiaAluno}!`);
    return;} 



    if(indiceProf !== null && professores[indiceProf]) {
        const prof = professores[indiceProf];
        document.getElementById("materia-exibida").textContent = prof.materia;
    }

    const professorSelecionado = professores[indiceProf];

    const novaNota1 = new Nota(
        nota1, 
        materiaAluno,
        professorSelecionado.nome
    );
    const novaNota2 = new Nota(
        nota2, 
        materiaAluno,
        professorSelecionado.nome
    );
    alunoSelecionado.adicionarNotas(novaNota1);
    alunoSelecionado.adicionarNotas(novaNota2);

    salvarDados();

    const turmaSelecionada =
    document.getElementById("selecao-filtro-turma").value;

if (turmaSelecionada) {

    const alunosFiltrados = alunos.filter(
        aluno => aluno.turma === turmaSelecionada
    );

    renderizarTabela(alunosFiltrados);

} else {

    renderizarTabela(alunos);

}


    console.log(alunoSelecionado);
    console.log(indiceProf);
    modalNota.close();
})

document.getElementById("selecao-filtro-turma").addEventListener("change", (e) => {

    const turmaSelecionada = e.target.value;

    const alunosFiltrados = alunos.filter(
        aluno => aluno.turma === turmaSelecionada
    );

    renderizarTabela(alunosFiltrados);

});




class Aluno {

    static contador =1;

    constructor(nome, matricula, turma) {
        const ano = new Date().getFullYear();
        this.nome = nome;
        this.matricula = `${ano}${String(Aluno.contador++).padStart(4, "0")}`;
        this.notas = [];
        this.turma = turma;
    }

    adicionarNotas(nota) {
        this.notas.push(nota)
    }

    media(){
        if(this.notas.length === 0) {
            return "-";
        }

        return this.notas.reduce(
            (soma, nota) => soma + nota.valor, 0
        ) / this.notas.length;
    }

};

class Professor {
    constructor(nome, materia) {
        this.nome = nome;
        this.materia = materia;
    }
};

class Turma {
    constructor(nome, professor, alunos) {
        // this.professor = professor;
        this.nome = nome;
        this.alunos = [];
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }

    listaAlunos() {
        return this.alunos;
    };
}

class Nota {
    constructor(valor, materia, professor) {
        this.professor = professor;
        this.valor = valor;
        this.materia = materia;
    }
};

carregarDados();



