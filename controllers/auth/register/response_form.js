// Response form
class ResponseForm {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getDefaultPresentation() {
    return this;
  }

  getPresentationForDevice(device) {
    switch (device) {
      default:
        return this.getDefaultPresentation();
    }
  }
}

// Exports
module.exports = ResponseForm;
