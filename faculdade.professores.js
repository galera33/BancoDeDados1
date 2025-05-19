const { MongoClient } = require('mongodb');

async function insertMoreData() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'universidade';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        // Inserindo mais professores
        await db.collection('professores').insertMany([
            {
                codigo_professor: 1,
                nome_professor: "Charles",
                disciplinas_ministradas: [
                    {
                        codigo_disciplina: 103,
                        nome_disciplina: "Compiladores",
                        ano: 2024,
                        semestre: 2
                    },
                    {
                        codigo_disciplina: 102,
                        nome_disciplina: "Sistemas Operacionais",
                        ano: 2024,
                        semestre: 1
                    },
                    {
                        codigo_disciplina: 105,
                        nome_disciplina: "Estrutura de Dados",
                        ano: 2024,
                        semestre: 2
                    }
                ],
                chefe_departamento: {
                    codigo_departamento: 1,
                    nome_departamento: "Ciência da Computação"
                }
            },
            {
                codigo_professor: 2,
                nome_professor: "Isaac",
                disciplinas_ministradas: [
                    {
                        codigo_disciplina: 106,
                        nome_disciplina: "Autômatos",
                        ano: 2024,
                        semestre: 1
                    },
                    {
                        codigo_disciplina: 108,
                        nome_disciplina: "Engenharia de Software",
                        ano: 2024,
                        semestre: 1
                    }
                ],
                chefe_departamento: {
                    codigo_departamento: 2,
                    nome_departamento: "Engenharia Elétrica"
                }
            },
            {
                codigo_professor: 3,
                nome_professor: "Paulo Sérgio",
                disciplinas_ministradas: [
                    {
                        codigo_disciplina: 101,
                        nome_disciplina: "Cálculo",
                        ano: 2024,
                        semestre: 2
                    },
                    {
                        codigo_disciplina: 107,
                        nome_disciplina: "Teoria da Computação",
                        ano: 2024,
                        semestre: 2
                    }
                ]
            },
            {
                codigo_professor: 4,
                nome_professor: "Leonardo Anjoletto",
                disciplinas_ministradas: [
                    {
                        codigo_disciplina: 104,
                        nome_disciplina: "Banco de Dados",
                        ano: 2024,
                        semestre: 1
                    }
                ]
            }
        ]);

        console.log("Dados inseridos com sucesso!");
    } finally {
        await client.close();
    }
}

insertMoreData().catch(console.error);
