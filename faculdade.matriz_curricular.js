const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('universidade');

        // Inserindo matrizes curriculares
        const result = await db.collection('matrizes_curriculares').insertMany([
            {
                codigo_matriz: 1,
                programa_academico: {
                    codigo_programa: 1,
                    nome_programa: "Ciência da Computação"
                },
                disciplinas_obrigatorias: [
                    { codigo_disciplina: 101, nome_disciplina: "Cálculo" },
                    { codigo_disciplina: 102, nome_disciplina: "Sistemas Operacionais" },
                    { codigo_disciplina: 103, nome_disciplina: "Compiladores" },
                    { codigo_disciplina: 104, nome_disciplina: "Banco de Dados" },
                    { codigo_disciplina: 105, nome_disciplina: "Estrutura de Dados" },
                    { codigo_disciplina: 106, nome_disciplina: "Autômatos" }
                ]
            },
            {
                codigo_matriz: 2,
                programa_academico: {
                    codigo_programa: 2,
                    nome_programa: "Engenharia Elétrica"
                },
                disciplinas_obrigatorias: [
                    { codigo_disciplina: 101, nome_disciplina: "Cálculo" },
                    { codigo_disciplina: 109, nome_disciplina: "Sistemas Digitais" },
                    { codigo_disciplina: 107, nome_disciplina: "Teoria da Computação" },
                    { codigo_disciplina: 108, nome_disciplina: "Engenharia de Software" }
                ]
            }
        ]);

        console.log(`${result.insertedCount} matrizes curriculares foram inseridas com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
