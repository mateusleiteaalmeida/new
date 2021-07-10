const messages = {
  fullNameRequired: { message: '"fullName" is required' },
  CRMRequired: { message: '"CRM" is required' },
  addressRequired: { message: '"address" is required' },
  phoneRequired: { message: '"phone" is required' },
  specialtyRequired: { message: '"specialty" is required' },
  fullNameInvalid: { message: '"fullName\" length must be less than or equal to 120 characters long' },
  CRMInvalid: { message: '"CRM" length must be less than or equal to 7 characters long' },
  zipCodeInvalid: { message: 'Invalid zip code'},
  phoneInvalid: { message: '"phone" must contain 2 items' },
  specialtyInvalid: { message: '"specialty" must contain at least 2 items' },
  doctorNotFound: { message: "No doctors were found" },
  doctorCreated: { message: "Doctors data sucessfully created" },
  doctorUpdated: { message: "Doctors data sucessfully updated" },
  doctorDeleted: { message: "Doctors data sucessfully deleted" }
};

module.exports = messages;
