const Sequelize = require("sequelize");

const database = new Sequelize(process.env.DATABASE_URL);

const Usuario = database.define("usuario", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datanasc: {
    type: Sequelize.STRING,
  },
  telefone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  genero: {
    type: Sequelize.STRING,
  },
  endereco: {
    type: Sequelize.STRING,
  },
  senha: {
    type: Sequelize.STRING,
  },
});

const Evento = database.define("evento", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bairro: {
    type: Sequelize.STRING,

  },
  cidade: {
    type: Sequelize.STRING,

  },
  data: {
    type: Sequelize.DATE,

  },
  preco: {
    type: Sequelize.DECIMAL(10,2),

  },
  horario: {
    type: Sequelize.STRING,

  },
  endereco: {
    type: Sequelize.STRING,

  },
  telefone: {
    type: Sequelize.STRING,

  },
});

const Empresa = database.define("empresa", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },

  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  
});

module.exports = {
  database,
  Usuario,
  Evento,
  Empresa
};
