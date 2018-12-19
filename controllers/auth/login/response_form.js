// Response form
class ResponseForm {
  constructor({ session_id, user_id }) {
    this.session_id = session_id;
    this.user_id = user_id;
  }

  getDefaultPresentation() {
    return this;
  }

  getWebBrowserPresentation() {
    return this.getDefaultPresentation();
  }

  getIOSPresentation() {
    return this.getDefaultPresentation();
  }

  getPresentationForDevice(device = '') {
    switch (device.toLowerCase()) {
      case 'web_browser':
        return this.getWebBrowserPresentation();
      case 'ios':
        return this.getIOSPresentation();
      default:
        return this.getDefaultPresentation();
    }
  }
}

// Exports
module.exports = ResponseForm;
