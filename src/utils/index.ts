export async function makeFetch(url: string) {
  let response = await fetch(url)

  let result = await response.json()

  return result
}
