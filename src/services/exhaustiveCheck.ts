export const exhaustiveCheck = (arg: never) => {
  throw new Error(`ExhaustiveCheckError: receveid ${arg}`)
}
