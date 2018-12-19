// Response form
class ResponseForm {
  constructor({ session_id, user_id }) {
    this.session_id = session_id;
    this.user_id = user_id;
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
