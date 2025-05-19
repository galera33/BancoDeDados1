const { MongoClient } = require('mongodb');

async function insertMoreData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'universidade';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        // Inserindo unidades acadêmicas (antigos departamentos)
        await db.collection('unidades_academicas').insertMany([
            {
                codigo_unidade: 101,
                nome_unidade: "Departamento de Computação",
                chefe: {
                    id_docente: 3001,
                    nome: "Anjoletto"
                }
            },
            {
                codigo_unidade: 102,
                nome_unidade: "Departamento de Engenharia Elétrica",
                chefe: {
                    id_docente: 3002,
                    nome: "Isaac"
                }
            }
        ]);

        console.log("Unidades acadêmicas inseridas com sucesso!");
    } finally {
        await client.close();
    }
}

insertMoreData().catch(console.error);
