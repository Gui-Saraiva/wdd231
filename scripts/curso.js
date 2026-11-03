const cursos = [
    {
        assunto: 'CSE',
        numero: 110,
        titulo: 'Introduction to Programming',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        tecnologia: [
            'Python'
        ],
        concluido: false
    },
    {
        assunto: 'WDD',
        numero: 130,
        titulo: 'Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        tecnologia: [
            'HTML',
            'CSS'
        ],
        concluido: false
    },
    {
        assunto: 'CSE',
        numero: 111,
        titulo: 'Programming with Functions',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        tecnologia: [
            'Python'
        ],
        concluido: false
    },
    {
        assunto: 'CSE',
        numero: 210,
        titulo: 'Programming with Classes',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        tecnologia: [
            'C#'
        ],
        concluido: false
    },
    {
        assunto: 'WDD',
        numero: 131,
        titulo: 'Dynamic Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        tecnologia: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        concluido: false
    },
    {
        assunto: 'WDD',
        numero: 231,
        titulo: 'Frontend Web Development I',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        tecnologia: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        concluido: false
    }
]

// selecionando botoes
const btnTodos = document.querySelector(".btn-todos");
const btnCse = document.querySelector(".btn-cse");
const btnWdd = document.querySelector(".btn-wdd");

// selecionando div container dos cursos
const divCursosCse = document.querySelector(".cursos-cse");
const divCursosWdd = document.querySelector(".cursos-wdd");

// selecionando span dos creditos
const creditos = document.querySelector(".creditos");

// função que gera os elementos dentro da div dos cursos
function gerarCursos(cursos) {

    // deixa as divs do curso e os creditos zerados e vazios para cada clique
    divCursosCse.innerHTML = "";
    divCursosWdd.innerHTML = "";
    let creditoCurso = 0;

    cursos.forEach(element => {
        // cria o elemento span
        let curso = document.createElement("span");
        // coloca o texto na span criada usando dados da array
        curso.textContent = `${element.assunto} ${element.numero}`;
        // adiciona uma classe à span criada para estilos no css
        curso.classList.add("cursos-byu");
        // soma os creditos de cada curso usando o valor na array
        creditoCurso += element.creditos;

        // adiciona cada curso em sua div respectiva
        if (element.assunto === "CSE") {            
            divCursosCse.appendChild(curso);
        } else if (element.assunto === "WDD") {
            divCursosWdd.appendChild(curso);
        }

        // adiciona outra classe para os cursos respectivos para estilos em css
        if (element.numero == 210 || element.numero == 231) {
            curso.classList.add("cursando");
        }
    });
    // adiciona o texto da span dos creditos no html com o numero certo de cada credito
    creditos.textContent = `O total de créditos para os cursos listados acima é ${creditoCurso}`
}

// filtra os cursos respectivos e mostra cada um deles
btnCse.addEventListener('click', () => {
    const cursosCse = cursos.filter(curso => {
        return curso.assunto === "CSE";
    })
    gerarCursos(cursosCse);
})

// filtra os cursos respectivos e mostra cada um deles
btnWdd.addEventListener('click', () => {
    const cursosCse = cursos.filter(curso => {
        return curso.assunto === "WDD";
    })
    gerarCursos(cursosCse);
})

// mostra todos os cursos
btnTodos.addEventListener('click', () => {
    gerarCursos(cursos);
});


