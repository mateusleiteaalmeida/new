const Specialty = (sequelize, DataTypes) => {
  const Specialty = sequelize.define('Specialty', {
    name: DataTypes.STRING
  },
  {
    timestamps: false
  })
  return Specialty;
}

module.exports = Specialty;