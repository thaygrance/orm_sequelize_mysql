'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type:DataTypes.STRING,
      validate: {
        valida:function(dado) {
          if(dado.length < 3) throw new Error('o campo nome deve ter mais de três caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {type: DataTypes.STRING,
      validate: {
        isEmail:{
          args:true,
          msg: 'dado do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    paranoid:true,
    defaultScope:{
      where: { ativo:true }
    },
    scopes:{
      todos:{ where: {} }
    }
  })
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    }) 
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
//      scope:{ status: 'confirmado' },
      as: 'aulasMatriculadas'
    })

  }
  return Pessoas
}