//Função para obter os tipos de caracteres selecionados.
function getChartTypes() {
    // Recupera o status verificado de cada caixa de seleção de tipo de caractere.
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    // Inicializa um array vazio para armazenar os tipos de caracteres selecionados.
    const charTypes = [];

    // Se maiúscula for selecionada, adiciona caracteres maiúsculos ao array charTypes.
    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    // Se letras minúsculas forem selecionadas, adicione caracteres minúsculos ao array charTypes.
    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    // Se o número for selecionado, adicione caracteres numéricos ao array charTypes.
    if (number) {
        charTypes.push('0123456789');
    }

    // Se o caractere especial for selecionado, adicione caracteres especiais ao array charTypes.
    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    // Retorna o array dos tipos de caracteres selecionados.
    return charTypes;
}

//Função para obter o tamanho de senha desejado.
function getPasswordSize() {
    // Recupera o valor inserido no campo de entrada de tamanho.
    const size = document.querySelector('#size').value;
    
    // Valida o tamanho: deve ser um número entre 4 e 128.
    if (isNaN(size) || size < 4 || size > 10) {
        // Exibe uma mensagem de erro se o tamanho for inválido.
        message('Tamanho inválido, digite um número entre 4 e 10!', 'danger');
    }

    // Retorna o tamanho validado.
    return size;
}

//Função para gerar uma senha com tamanho e tipos de caracteres especificados.
function generatePassword(size, charTypes) {
    let passwordGenerated = '';
    // Concatena todos os tipos de caracteres selecionados em uma única string.
    const selectedChars = charTypes.join('');

    // Garanta pelo menos um caractere de cada tipo de caracter selecionado.
    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    // Gera os caracteres restantes aleatoriamente a partir dos tipos de caracteres selecionados.
    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    // Embaralhe a string da senha para aumentar a aleatoriedade.
    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    // Retorna a senha gerada.
    return passwordGenerated;
}

//Função para exibir uma mensagem usando a biblioteca Toastify.
function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

// Ouvinte de evento para o botão "Gerar".
document.querySelector('#generate').addEventListener('click', function () {
    // Obtenha o tamanho de senha desejado.
    const size = getPasswordSize();
    // Obtém os tipos de caracteres selecionados.
    const charTypes = getChartTypes();

    // Se o tamanho não for válido, retorne e não prossiga.
    if (!size) {
        return;
    }
    
    // Se nenhum tipo de caractere for selecionado, exibe uma mensagem de erro e retorna.
    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    //Gera a senha com o tamanho e tipos de caracteres especificados.
    const passwordGenerated = generatePassword(size, charTypes);

    //Exibe a senha gerada.
    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

// Ouvinte de evento para o botão "Copiar".
document.querySelector('#copy').addEventListener('click', function () {
    // Copie a senha gerada para a área de transferência.
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    //Exibe uma mensagem de sucesso.
    message('Senha copiada com sucesso!', 'success');
});
