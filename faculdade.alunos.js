const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('universidade');  
        const estudantes = database.collection('estudantes');

        // Inserção de dados atualizados
        const resultado = await estudantes.insertMany([
            {
                id_estudante: 101,
                nome_completo: "Ana Beatriz Martins",
                historico_academico: [
                    {
                        ano_letivo: 2024,
                        semestre: 2,
                        nota_final: 7.8,
                        disciplina: {
                            codigo_disciplina: 201,
                            nome_disciplina: "Redes de Computadores"
                        }
                    }
                ],
                projeto_final: {
                    codigo_projeto: 501,
                    titulo: "Sistema de Monitoramento Agrícola com IoT",
                    orientador: { id_docente: 3001 },
                    integrantes: [
                        { id_estudante: 102, nome_completo: "Lucas Henrique Alves" },
                        { id_estudante: 103, nome_completo: "Carla Mendes" },
                        { id_estudante: 104, nome_completo: "Tiago Souza" }
                    ]
                }
            },
            {
                id_estudante: 102,
                nome_completo: "Lucas Henrique Alves",
                historico_academico: [
                    {
                        ano_letivo: 2023,
                        semestre: 1,
                        nota_final: 8.9,
                        disciplina: {
                            codigo_disciplina: 202,
                            nome_disciplina: "Engenharia de Software"
                        }
                    }
                ],
                projeto_final: {
                    codigo_projeto: 501,
                    titulo: "Sistema de Monitoramento Agrícola com IoT",
                    orientador: { id_docente: 3001 },
                    integrantes: [
                        { id_estudante: 101, nome_completo: "Ana Beatriz Martins" },
                        { id_estudante: 103, nome_completo: "Carla Mendes" },
                        { id_estudante: 104, nome_completo: "Tiago Souza" }
                    ]
                }
            },
            {
                id_estudante: 103,
                nome_completo: "Carla Mendes",
                historico_academico: [
                    {
                        ano_letivo: 2024,
                        semestre: 1,
                        nota_final: 6.5,
                        disciplina: { codigo_disciplina: 203, nome_disciplina: "Estrutura de Dados" }
                    },
                    {
                        ano_letivo: 2024,
                        semestre: 2,
                        nota_final: 9.3,
                        disciplina: { codigo_disciplina: 204, nome_disciplina: "Inteligência Artificial" }
                    }
                ],
                projeto_final: {
                    codigo_projeto: 501,
                    titulo: "Sistema de Monitoramento Agrícola com IoT",
                    orientador: { id_docente: 3001 },
                    integrantes: [
                        { id_estudante: 101, nome_completo: "Ana Beatriz Martins" },
                        { id_estudante: 102, nome_completo: "Lucas Henrique Alves" },
                        { id_estudante: 104, nome_completo: "Tiago Souza" }
                    ]
                }
            },
            {
                id_estudante: 104,
                nome_completo: "Tiago Souza",
                historico_academico: [
                    {
                        ano_letivo: 2024,
                        semestre: 1,
                        nota_final: 8.4,
                        disciplina: { codigo_disciplina: 205, nome_disciplina: "Segurança da Informação" }
                    }
                ],
                projeto_final: {
                    codigo_projeto: 501,
                    titulo: "Sistema de Monitoramento Agrícola com IoT",
                    orientador: { id_docente: 3001 },
                    integrantes: [
                        { id_estudante: 101, nome_completo: "Ana Beatriz Martins" },
                        { id_estudante: 102, nome_completo: "Lucas Henrique Alves" },
                        { id_estudante: 103, nome_completo: "Carla Mendes" }
                    ]
                }
            }
        ]);

        console.log("Estudantes inseridos com sucesso!");

    } finally {
        await client.close();
    }
}

// Executa a função principal
run().catch(console.dir);
