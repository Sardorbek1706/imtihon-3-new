function success(message, data) {
  return { status: 'success', message, data };
}
function error(message, details) {
  return { status: 'error', message, details };
}
module.exports = { success, error };
