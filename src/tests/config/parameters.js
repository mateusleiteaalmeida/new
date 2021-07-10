const contentType = "Content-Type";
const applicationJson = "application/json";

const doctorObject = {
  fullName: "Rob Doe",
  CRM: "123456",
  address: {
    streetAddress: "Rua Sao Paulo",
    streetNumber: "30",
    complement: "Apto 2",
    zipCode: "30160040"
  },
  phone: [
    {
      type: "Telefone",
      ddd: "34",
      number: "32323232"
    },
    {
      type: "Celular",
      ddd: "34",
      number: "98989898"
    }
  ],
  specialty: [
    "ORTOPEDIA", "PEDIATRIA"
  ]
}

module.exports = {
  contentType,
  applicationJson,
  doctorObject
};
