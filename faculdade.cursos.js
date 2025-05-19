const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('universidade');

        // Inserindo programas acadêmicos: Ciência da Computação e Engenharia Elétrica
        const resultado = await db.collection('programas_academicos').insertMany([
            {
                codigo_programa: 1,
                nome_programa: "Ciência da Computação",
                unidade_academica: {
                    codigo_unidade: 101,
                    nome_unidade: "Departamento de Computação"
                }
            },
            {
                codigo_programa: 2,
                nome_programa: "Engenharia Elétrica",
                unidade_academica: {
                    codigo_unidade: 102,
                    nome_unidade: "Departamento de Engenharia Elétrica"
                }
            }
        ]);

        console.log(`${resultado.insertedCount} programas acadêmicos foram inseridos com sucesso!`);
    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.error);
