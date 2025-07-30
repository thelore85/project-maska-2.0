///////////////////////////////////////////////////
///////// RECURSION ///////////////////////////////
///////////////////////////////////////////////////

// count to zero
const countToZero = (n) => {
  if (n < 0) return
  console.log(n)
  countToZero(n - 1)
}

// sum all array numbers
const array = [1, 2, 3, 4, 5]

function sum(arr) {
  if (arr.length === 0) return 0

  // recursion
  const current = arr[0]
  const newArr = arr.shift()

  return current + sum(newArr)
}

/// element array count
const arr2 = [1, [2, 3], [4, [5, 6]], 7]

function countElements(arr) {
  if (arr.length === 0) return 0

  const [first, ...rest] = arr

  if (Array.isArray(first)) {
    return countElements(first) + countElements(rest)
  } else {
    return 1 + countElements(rest)
  }
}

// find value
const arr3 = [1, [2, 3], [4, [5, 6]], 7]
// containsValue(arr, 5) === true
// containsValue(arr, 8) === false

function containsValue(arr, n) {
  // base case
  arr.length === 0 && false

  // recursive case
  const [current, ...rest] = arr
  current === n && true

  if (Array.isArray(current) && containsValue(current, n)) {
    return true
  }

  return containsValue(rest, n)
}

////////////////////////////////
// Flattent array

const arr = [1, [2, 3], [4, [5, 6]], 7]
// flatten(arr) === [1, 2, 3, 4, 5, 6, 7]

function flatten(arr) {
  if (arr.length === 0) {
    return []
  }

  const [current, ...rest] = arr

  if (!Array.isArray(current)) {
    return [current, ...flatten(rest)]
  } else {
    return [...flatten(current), ...flatten(rest)]
  }
}

///////////////////////////////////
// Count Keys

const data = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
  f: 4,
}

function countKeys(data) {
  // base case
  if (data === null) return 0
  let count = 0

  // recursion
  for (key in data) {
    count += 1
    count += countKeys(obj[key])
  }

  return count
}

///////////////////////////////////////
// count booleans

const data2 = {
  a: true,
  b: {
    c: false,
    d: {
      e: 'hello',
      f: true,
    },
    g: 123,
  },
  h: 'nope',
}

function countBoolean(obj) {
  if (obj === null || typeof obj !== 'object') return 0

  let count = 0
  for (let key in obj) {
    typeof obj[key] === 'boolean' ? (count += 1) : (count += countBoolean(obj[key]))
  }

  return count
}

/////////////////////////////////////////////
/// count boolean in real obj

const user = {
  id: 123,
  name: 'Lorenzo',
  active: true,
  profile: {
    age: 30,
    verified: false,
    contacts: {
      email: 'lorenzo@example.com',
      phone: null,
    },
  },
  preferences: {
    theme: 'dark',
    newsletter: true,
    privacy: {
      tracking: false,
      adPersonalization: true,
    },
  },
  stats: {
    logins: 42,
    lastLogin: '2025-07-01',
  },
  notifications: [
    { read: true, message: 'Benvenuto!' },
    { read: false, message: 'Hai un nuovo messaggio' },
  ],
}

function counting(data) {
  if (data === null || typeof data !== 'object') return 0
  let count = 0

  if (typeof data === 'object') {
    for (let key in data) {
      if (typeof data[key] === 'boolean') {
        count += 1
        console.log('/// boolean value: ', data[key])
      } else {
        count += counting(data[key])
      }
    }
  }

  if (Array.isArray(data)) {
    for (const el of data) {
      if (typeof el === 'boolean') {
        count += 1
      } else {
        console.log('/// Array boolean value: ', data)
        count += counting(el)
      }
    }
  }

  return count
}

///// extract required field

const form = {
  name: { type: 'string', required: true },
  email: { type: 'string', required: false },
  address: {
    street: { type: 'string', required: true },
    city: { type: 'string', required: false },
    country: { type: 'string', required: true },
  },
  preferences: [{ newsletter: { type: 'boolean', required: true } }, { updates: { type: 'boolean', required: false } }],
}

function extractRequired(data) {
  if (data === null || typeof data !== 'object') return []

  let requiredFieldList = []

  if (Array.isArray(data)) {
    for (const el of data) {
      requiredFieldList = [...requiredFieldList, ...extractRequired(el)]
    }
    return requiredFieldList
  }

  for (const key in data) {
    if (data[key].required === true) {
      requiredFieldList = [...requiredFieldList, key]
    }
    requiredFieldList = [...requiredFieldList, ...extractRequired(data[key])]
  }

  return requiredFieldList
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////

const schema = {
  name: { type: 'string', default: 'Anonimo' },
  age: { type: 'number' },
  address: {
    city: { type: 'string', default: 'Roma' },
    zip: { type: 'string' },
  },
  preferences: [
    {
      theme: { type: 'string', default: 'dark' },
      notifications: { type: 'boolean' },
    },
  ],
}

function extraction(data) {
  // base case
  if (data === null || typeof data !== 'object') return {}
  let map = {}

  if (Array.isArray(data)) {
    for (let el of data) {
      map = { ...map, ...extraction(el) }
    }
    return map
  }

  for (let key in data) {
    if ('default' in data[key]) {
      map[key] = data[key].default
    } else {
      map = { ...map, ...extraction(data[key]) }
    }
  }

  return map
}

//////////////////////////////////////////////////////////
//

let object = {
  firstName: { type: 'string' },
  age: { type: 'number' },
  address: {
    street: { type: 'string' },
    zip: { type: 'number' },
  },
  tags: [{ type: 'string' }, { type: 'string' }],
}

function flatter(data) {
  if (data === null || typeof data !== 'object') return {}
  let flatMap = {}

  if (Array.isArray(data)) {
    for (let el of data) {
      flatMap = { ...flatMap, ...flatter(el) }
    }
    return flatMap
  }

  for (let key in data) {
    let el = data[key]
    if ('type' in el) {
      flatMap[key] = el.type
    } else {
      flatMap = { ...flatMap, ...flatter(el) }
    }
  }

  return flatMap
}

//////////////////////////////////////////////////
/// find true

const set = {
  a: true,
  b: {
    c: false,
    d: true,
    e: {
      f: true,
    },
  },
  g: [{ h: true }, { i: false }],
}

function finder(data) {
  if (data === null || typeof data !== 'object') return []

  let array = []

  if (Array.isArray(data)) {
    for (let el of data) {
      array = [...array, ...finder(el)]
    }

    return array
  }

  for (let key in data) {
    if (typeof data[key] === 'object') {
      array = [...array, ...finder(data[key])]
    }
    if (data[key] === true) {
      array.push(key)
    }
  }

  return array
}

//////////////////////////////////////////////
// extract default

const config = {
  username: { type: 'string', default: 'guest' },
  password: { type: 'string' },
  preferences: {
    theme: { type: 'string', default: 'dark' },
    notifications: {
      email: { type: 'boolean', default: true },
      sms: { type: 'boolean' },
    },
  },
  metadata: {
    createdAt: { type: 'date' },
  },
}

function extract(data) {
  //base case
  if (data === null || typeof data !== 'object') return {}

  let map = {}

  for (let key in data) {
    if (data[key].default !== null) {
      map[key] = data[key].default
    } else {
      map = { ...map, ...extract(data[key]) }
    }
  }

  return map
}

// casco
// monitor
