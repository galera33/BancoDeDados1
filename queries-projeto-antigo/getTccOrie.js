const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getAlunosComTCC() {
  try {
    await client.connect();
    const db = client.db('universidade');
    const estudantes = db.collection('estudantes');

    // Busca estudantes que tenham campo 'projeto_final' definido e não nulo
    const alunosComTCC = await estudantes.find({
      projeto_final: { $exists: true, $ne: null }
    }).toArray();

    if (alunosComTCC.length === 0) {
      console.log("Nenhum aluno com TCC encontrado.");
      return [];
    }

    return alunosComTCC.map(aluno => ({
      id_estudante: aluno.id_estudante,
      nome_completo: aluno.nome_completo,
      projeto_final: aluno.projeto_final
    }));

  } finally {
    await client.close();
  }
}

// Exemplo de execução
getAlunosComTCC()
  .then(alunos => {
    if (alunos.length) {
      console.log("Alunos com TCC:");
      alunos.forEach(a => {
        console.log(`ID: ${a.id_estudante} - Nome: ${a.nome_completo}`);
        console.log(`  Projeto Final: ${a.projeto_final.titulo}`);
        console.log(`  Orientador ID: ${a.projeto_final.orientador.id_docente}`);
        console.log(`  Código do Projeto: ${a.projeto_final.codigo_projeto}`);
        console.log('----------------------');
      });
    }
  })
  .catch(console.error);
