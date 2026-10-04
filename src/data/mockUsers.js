const FIRST_NAMES = ['Ava', 'Liam', 'Noah', 'Emma', 'Olivia', 'Mia', 'Lucas', 'Sofia', 'Ethan', 'Zoe', 'Arjun', 'Priya', 'Wei', 'Hana', 'Omar', 'Diego']
const LAST_NAMES = ['Garcia', 'Smith', 'Johnson', 'Patel', 'Kim', 'Nguyen', 'Khan', 'Rossi', 'Mueller', 'Dubois', 'Silva', 'Kowalski']
const ROLES = ['Admin', 'Editor', 'Viewer', 'Owner']
const STATUSES = ['active', 'invited', 'suspended']

function seededRandom(seed) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function buildUsers(count) {
  const rand = seededRandom(42)
  const users = []
  for (let i = 0; i < count; i += 1) {
    const first = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
    const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
    const role = ROLES[Math.floor(rand() * ROLES.length)]
    const status = STATUSES[Math.floor(rand() * STATUSES.length)]
    const day = Math.floor(rand() * 28) + 1
    const month = Math.floor(rand() * 12) + 1
    const year = 2021 + Math.floor(rand() * 5)
    users.push({
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      role,
      status,
      joined: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    })
  }
  return users
}

export const MOCK_USERS = buildUsers(47)
