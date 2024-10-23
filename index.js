//externos 
const inquirer = require("inquirer")
const chalk = require("chalk")

//internos

const fs = require("fs")

console.log('iniciando o Accounts')

operation()

function operation(){
    inquirer.prompt([
        {

        type: 'list',
        name: 'action',
        massage: 'O que voce deseja fazer?',
        choices:[
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],
        }
    ])
    .then((answer) => {
        const action = answer['action']

        if(action === 'Criar Conta'){
            createAccount()
        } else if( action ==='Consultar Saldo'){

        } else if( action ==='Depositar'){
            
        } else if( action ==='Sacar'){
            
        }
        else if( action ==='Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'))
            process.exit()
        }
    })
    .cath((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher nosso Banco'))
    console.log(chalk.green('Defina as opções de sua conta a seguir:'))
    
    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: "accountName",
            message:'Digite um nome para sua conta'
        }
    ])
    .then((answer) =>{
        const accountName = answer['accountName']

        console.info(accountName)
        
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já exite'))
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}',
            function(err){
                console.log(err)
            },
        )

        console.log(chalk.green('Conta criada com sucesso'))
        operation()
    })
    .catch((err) => console.log(err))
}