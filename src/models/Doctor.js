const Doctor = (sequelize, DataTypes) => {
  const Doctor = sequelize.define("Doctor", {
    fullName: DataTypes.STRING,
    CRM: DataTypes.INTEGER,
  },
  {
    timestamps: false
  });

  Doctor.associate = (models) => {
    Doctor.hasOne(models.Address, { as: 'address', foreignKey: 'doctorId' });
    Doctor.hasMany(models.Phone, { as: 'phone', foreignKey: 'doctorId' });
  };

  return Doctor;
}

module.exports = Doctor;