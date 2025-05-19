const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getHistoricoEscolar(idEstudante) {
  try {
    await client.connect();
    const db = client.db('universidade');
    const estudantes = db.collection('estudantes');

    // Buscar o estudante pelo ID
    const estudante = await estudantes.findOne({ id_estudante: idEstudante });

    if (!estudante) {
      console.log(`Estudante com ID ${idEstudante} não encontrado.`);
      return;
    }

    console.log(`Histórico escolar de ${estudante.nome_completo}:`);
    estudante.historico_academico.forEach(h => {
      console.log(`- Ano: ${h.ano_letivo}, Semestre: ${h.semestre}`);
      console.log(`  Disciplina: [${h.disciplina.codigo_disciplina}] ${h.disciplina.nome_disciplina}`);
      console.log(`  Nota final: ${h.nota_final}`);
    });

  } finally {
    await client.close();
  }
}

// Exemplo de uso:
getHistoricoEscolar(101).catch(console.error);
