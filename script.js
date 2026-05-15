// FORMULÁRIO DE PREFERÊNCIAS DO USUÁRIO com sessionStorage, capturar dados do formulario

const formulario = document.getElementById('formFocus');

if(formulario) {
    //evento de envio no formulário
    formulario.addEventListener('submit', (event) => {

    // evita o recarregamento da página ao enviar o formulário
    event.preventDefault();

    // cptura os valores que o usuário digitou nos campos do formulário
    const rotina =
    document.getElementById('rotina').value;

    const materias =
    document.getElementById('materias').value;

    const exclusao =
    document.getElementById('exclusao').value;
    
    const checkboxes =
    document.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    // exibe um alerta caso o usuário não tenha preenchido a rotina de estudos
    if(rotina.trim() === ""){

        alert(
            "Por favor, descreva sua rotina de estudos."
        );

        return;
    }

    // exibe um alerta caso o usuário não tenha preenchido os checkboxes de prioridades
    if(checkboxes.length === 0){

        alert(
            "Selecione ao menos uma prioridade."
        );

        return;
    }

    const confirmar = confirm(
        "Deseja salvar suas preferências?"
    );

    if(!confirmar){
        return;
    }

    // array para armazenar prioridades selecionadas pelo usuário
    let prioridades = [];

    // percorre os checkboxes selecionados e adiciona seus valores ao array de prioridades
    checkboxes.forEach(function(item){
        prioridades.push(item.value);
    });

    // objeto com dados
    const usuario = {
        rotina,
        materias,
        exclusao,
        prioridades
    };

    // salvar os dados do usuário no sessionStorage
    sessionStorage.setItem(
        "focusUser",
        JSON.stringify(usuario)
    );

    window.location.href = "dashboard.html";

});
}

const rotinaUsuario = document.getElementById('rotinaUsuario');

if (rotinaUsuario) {

    // recuperando dados do sessionStorage
    const dados = JSON.parse(sessionStorage.getItem("focusUser"));

    if(dados){
        rotinaUsuario.innerHTML = `<strong>Rotina de estudos:</strong> ${dados.rotina}`;

        document.getElementById("organizacaoUsuario").innerHTML = `<strong>Organizar por matérias:</strong> ${dados.materias}`;

        document.getElementById("exclusaoUsuario").innerHTML = `<strong>Exclusão das imagens:</strong> ${dados.exclusao}`;

        document.getElementById("prioridadesUsuario").innerHTML = `<strong>Prioridades:</strong> ${dados.prioridades.join(", ")}`;
    }
}


// EXIBIÇÃO DOS DADOS DO USUÁRIO NO DASHBOARD, recuperar as informações salvas no sessionStorage e exibir na tela
const hero = document.querySelector(".hero");

if(hero){

    //array com imagens para slide
    const imagens = [
        "img/slide00.png",
        "img/slide01.png",
        "img/slide02.png"

    ];

    //controlador das imagens
    let indice = 0;

    const botaoProximo =
    document.getElementById("proximo");

    const botaoAnterior =
    document.getElementById("anterior");

    // evento para avançar (botão)
    botaoProximo.addEventListener("click", () => {
        indice++;

        if(indice >= imagens.length){
            indice = 0;
        }

        hero.style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8),
                rgba(0, 0, 0, 0.4)
            ),
            url(${imagens[indice]})
        `;

    });

    botaoAnterior.addEventListener("click", () => {
        indice--;

        if(indice < 0){
            indice = imagens.length - 1;
        }

        hero.style.backgroundImage = `
            linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8),
                rgba(0, 0, 0, 0.4)
            ),
            url(${imagens[indice]})
        `;

    });
}