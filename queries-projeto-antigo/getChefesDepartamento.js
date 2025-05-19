const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function getChefesDepartamentos() {
  try {
    await client.connect();
    const db = client.db('universidade'); // db correto
    const unidades = db.collection('unidades_academicas'); // coleção certa

    // Buscar todos os chefes dentro de unidades acadêmicas
    const chefes = await unidades.find(
      { chefe: { $exists: true } },
      { projection: { _id: 0, chefe: 1 } }
    ).toArray();

    if (chefes.length === 0) {
      console.log("Nenhum chefe de departamento encontrado.");
      return;
    }

    console.log("Chefes de departamento:");
    chefes.forEach((unidade, i) => {
      const chefe = unidade.chefe;
      console.log(`${i + 1}: ID: ${chefe.id_docente} - Nome: ${chefe.nome}`);
    });

  } finally {
    await client.close();
  }
}

getChefesDepartamentos().catch(console.error);
