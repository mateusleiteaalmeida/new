const Phone = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    type: DataTypes.STRING,
    ddd: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    doctorId: { type: DataTypes.INTEGER, foreignKey: true }
  },
  {
    timestamps: false
  });

  Phone.associate = (models) => {
    Phone.belongsTo(models.Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  };

  return Phone;
}

module.exports = Phone;