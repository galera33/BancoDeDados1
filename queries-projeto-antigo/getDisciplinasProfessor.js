const { MongoClient } = require('mongodb');

// Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getDisciplinasPorProfessor(id_professor) {
    try {
        await client.connect();
        const db = client.db('faculdade');

        // Buscando o nome do professor
        const professor = await db.collection('professores').findOne({ id_professor });

        if (!professor) {
            console.log(`Professor com ID ${id_professor} não encontrado.`);
            return;
        }

        // Buscando disciplinas ministradas pelo professor
        const disciplinas = await db.collection('disciplinas').find({
            "professor.id_professor": id_professor
        }).toArray();

        if (disciplinas.length > 0) {
            console.log(`Disciplinas ministradas pelo Professor ${professor.nome} (ID ${id_professor}):`);
            disciplinas.forEach(disciplina => {
                console.log(`Disciplina: ${disciplina.id_disciplina} - ${disciplina.nome}`);
                // Aqui você pode adicionar lógica para buscar o histórico escolar dos alunos relacionados a essa disciplina
                // Exemplo: buscar alunos que cursaram essa disciplina e seus semestres/anos
            });
        } else {
            console.log(`Nenhuma disciplina encontrada para o Professor ${professor.nome} (ID ${id_professor}).`);
        }
    } finally {
        await client.close();
    }
}

// Executa a função para um professor específico (substitua pelo ID do professor desejado)
getDisciplinasPorProfessor(1).catch(console.error); // Exemplo: ID do professor 1
