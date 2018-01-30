const faker = require('faker')

module.exports =  function makeseeds() {
  var arr = []
  var n = 0
  while (n < 21) {
    n++
    const adprofile = {
      streetName: faker.address.streetAddress(),
      streetNumber: '100',
      postalCode: faker.address.zipCode(),
      city: faker.address.city(),
      country: faker.address.country(),
      phoneNumber: faker.phone.phoneNumber()
    }
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      advisorProfile: adprofile
    }
    arr.push(user)
  }
  return arr
}
