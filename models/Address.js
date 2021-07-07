const Address = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    zipCode: DataTypes.INTEGER,
    streetAddress: DataTypes.STRING,
    streetNumber: DataTypes.INTEGER,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    doctorId: { type: DataTypes.INTEGER, foreignKey: true }
  },
  {
    timestamps: false
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Doctor, { as: 'doctor', foreignKey: 'doctorId' });
  };

  return Address;
}

module.exports = Address;