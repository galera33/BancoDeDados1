const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getProfessorPorId(professorId) {
  try {
    await client.connect();
    const db = client.db('universidade');
    const professores = db.collection('professores');

    const resultado = await professores.aggregate([
      {
        $match: { codigo_professor: professorId }
      },
      {
        $lookup: {
          from: 'disciplinas',
          localField: 'disciplinas_ministradas.codigo_disciplina',
          foreignField: 'codigo_disciplina',
          as: 'disciplinas_info'
        }
      },
      {
        $project: {
          codigo_professor: 1,
          nome_professor: 1,
          disciplinas_ministradas: 1,
          disciplinas_info: 1
        }
      }
    ]).toArray();

    if (resultado.length === 0) {
      console.log(`Professor com id ${professorId} não encontrado.`);
      return null;
    }

    // Monta um retorno com as disciplinas mesclando as infos detalhadas
    const professor = resultado[0];

    // Mapear as disciplinas_ministradas para incluir as infos detalhadas (ano, semestre, etc)
    const disciplinasDetalhadas = professor.disciplinas_ministradas.map(dm => {
      const info = professor.disciplinas_info.find(di => di.codigo_disciplina === dm.codigo_disciplina) || {};
      return {
        codigo_disciplina: dm.codigo_disciplina,
        nome_disciplina: info.nome_disciplina || 'Desconhecido',
        ano: dm.ano,
        semestre: dm.semestre
      };
    });

    return {
      codigo_professor: professor.codigo_professor,
      nome_professor: professor.nome_professor,
      disciplinas: disciplinasDetalhadas
    };

  } finally {
    await client.close();
  }
}

// Exemplo de uso:
getProfessorPorId(1)
  .then(professor => {
    if (professor) {
      console.log('Professor encontrado:', professor);
    }
  })
  .catch(console.error);
