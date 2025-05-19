const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getEstudantesFormados(ano_letivo, semestre) {
  try {
    await client.connect();
    const db = client.db('universidade');
    const estudantes = db.collection('estudantes');
    const matrizes = db.collection('matrizes_curriculares');

    const formados = [];

    // Buscar todos estudantes
    const cursor = estudantes.find({});

    while (await cursor.hasNext()) {
      const estudante = await cursor.next();

      if (!estudante.programa_academico || !estudante.programa_academico.codigo_programa) {
        // Sem programa, não consegue verificar matriz
        continue;
      }

      // Pega matriz curricular do programa do aluno
      const matriz = await matrizes.findOne({
        "programa_academico.codigo_programa": estudante.programa_academico.codigo_programa
      });

      if (!matriz) continue;

      // Lista das disciplinas obrigatórias
      const disciplinasObrigatorias = matriz.disciplinas_obrigatorias.map(d => d.codigo_disciplina);

      // Filtra disciplinas do aluno aprovadas (nota_final >= 7) até o semestre e ano dados
      const aprovadas = estudante.historico_academico.filter(h => {
        const antesDoSemestre = (h.ano_letivo < ano_letivo) ||
                               (h.ano_letivo === ano_letivo && h.semestre <= semestre);
        return antesDoSemestre && h.nota_final >= 7;
      }).map(h => h.disciplina.codigo_disciplina);

      // Verifica se o conjunto de disciplinas obrigatórias está contido nas aprovadas
      const todasAprovadas = disciplinasObrigatorias.every(disc => aprovadas.includes(disc));

      if (todasAprovadas) {
        formados.push(estudante);
      }
    }

    if (formados.length > 0) {
      console.log(`Estudantes formados até o ano letivo ${ano_letivo}, semestre ${semestre}:`);
      formados.forEach(e => {
        console.log(`ID: ${e.id_estudante} - Nome: ${e.nome_completo}`);
      });
    } else {
      console.log(`Nenhum estudante formado encontrado até o ano letivo ${ano_letivo}, semestre ${semestre}.`);
    }

  } finally {
    await client.close();
  }
}

// Exemplo de execução
getEstudantesFormados(2024, 1).catch(console.error);
