const faker = require('faker');

function addTags () {
  const arr = []
  arr.push(faker.lorem.word())
  arr.push(faker.lorem.word())
  arr.push(faker.lorem.word())
  arr.push(faker.lorem.word())
  arr.push(faker.lorem.word())
  return arr
}

module.exports = function makeseeds() {
  const arr = [];
  let n = 0;
  while (n < 20) {
    n++;
    const adprofile = {
      streetName: faker.address.streetAddress(),
      streetNumber: '100',
      postalCode: faker.address.zipCode(),
      city: faker.address.city(),
      country: faker.address.country(),
      phoneNumber: faker.phone.phoneNumber(),
      picUrl: faker.image.avatar(),
      publicAdvisor: true,
      tags: addTags()
    };
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      advisorProfile: adprofile,
    };
    arr.push(user);
  }
  return arr;
};
