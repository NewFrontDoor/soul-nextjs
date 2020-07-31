function hostUrl(request) {
  const host = request
    ? request.headers['x-forwarded-host'] || request.headers.host
    : window.location.host;
  const proto = request
    ? request.headers['x-forwarded-proto'] || 'http'
    : window.location.protocol.slice(0, -1);

  return `${proto}://${host}`;
}

export default hostUrl;
