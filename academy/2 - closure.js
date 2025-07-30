////////////////////////////////////////////////////////////////
///////////// CLOSURE
////////////////////////////////////////////////////////////////

/////////////////////
/// create a logger

// const errorLogger = createLogger("ERROR");
// errorLogger("Qualcosa è andato storto");

function createlogger(input) {
  const prefix = input.toUpperCase()
  let call = 0

  return function (message) {
    call++
    return `${prefix}: ${message}`
  }
}
