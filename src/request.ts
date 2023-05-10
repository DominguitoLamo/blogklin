const BASE_PATH = window.location.origin + '/'

export function getRainRequestPath(api: string) {
  return BASE_PATH + 'rainMaterial/' + api
}