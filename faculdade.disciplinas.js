const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('universidade');

        // Inserindo disciplinas diretamente
        const result = await db.collection('disciplinas').insertMany([
            {
                codigo_disciplina: 101,
                nome_disciplina: "Cálculo",
                docente_responsavel: {
                    id_docente: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                codigo_disciplina: 102,
                nome_disciplina: "Sistemas Operacionais",
                docente_responsavel: {
                    id_docente: 1,
                    nome: "Charles"
                }
            },
            {
                codigo_disciplina: 103,
                nome_disciplina: "Compiladores",
                docente_responsavel: {
                    id_docente: 1,
                    nome: "Charles"
                }
            },
            {
                codigo_disciplina: 104,
                nome_disciplina: "Banco de Dados",
                docente_responsavel: {
                    id_docente: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                codigo_disciplina: 105,
                nome_disciplina: "Estrutura de Dados",
                docente_responsavel: {
                    id_docente: 1,
                    nome: "Charles"
                }
            },
            {
                codigo_disciplina: 106,
                nome_disciplina: "Autômatos",
                docente_responsavel: {
                    id_docente: 2,
                    nome: "Isaac"
                }
            },
            {
                codigo_disciplina: 107,
                nome_disciplina: "Teoria da Computação",
                docente_responsavel: {
                    id_docente: 3,
                    nome: "Paulo Sérgio"
                }
            },
            {
                codigo_disciplina: 108,
                nome_disciplina: "Engenharia de Software",
                docente_responsavel: {
                    id_docente: 2,
                    nome: "Isaac"
                }
            },
            {
                codigo_disciplina: 109,
                nome_disciplina: "Sistemas Digitais",
                docente_responsavel: {
                    id_docente: 2,
                    nome: "Isaac"
                }
            }
        ]);

        console.log(`${result.insertedCount} disciplinas foram inseridas com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
