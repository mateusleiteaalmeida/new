const DoctorsSpecialty = (sequelize, DataTypes) => {
  const DoctorsSpecialty = sequelize.define("DoctorsSpecialty", {
    doctorId: { type: DataTypes.INTEGER, primaryKey: true },
    specialtyId: { type: DataTypes.INTEGER, primaryKey: true }
  },
  {
    timestamps: false
  });

  DoctorsSpecialty.associate = (models) => {
    models.Doctor.belongsToMany(models.Specialty, {
      as: 'specialty',
      through: DoctorsSpecialty,
      foreignKey: 'doctorId',
      otherKey: 'specialtyId'
    });

    models.Specialty.belongsToMany(models.Doctor, {
      as: 'doctors',
      through: DoctorsSpecialty,
      foreignKey: 'specialtyId',
      otherKey: 'doctorId'
    });
  }
  return DoctorsSpecialty;
}

module.exports = DoctorsSpecialty;